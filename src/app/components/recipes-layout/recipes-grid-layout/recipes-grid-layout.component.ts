import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../recipe.service';
import * as moment from "moment";
import {Subscription} from "rxjs";
import {ModalService} from "../../../shared/modal.service";
import {ImportCsvModalComponent} from "../../../shared/import-csv-modal/import-csv-modal.component";
import {Recipe} from "../../../models/recipes.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipes-grid-layout',
  templateUrl: './recipes-grid-layout.component.html',
  styleUrls: ['./recipes-grid-layout.component.scss'],
})
export class RecipesGridLayoutComponent implements OnInit, OnDestroy {

  public recipesList: Recipe[] = [];
  public isExpanded: boolean | undefined;
  private isExpandedSubscription: Subscription | undefined;

  public searchValue: string | undefined;
  public gridApi: any;
  public gridColumnApi: any;

  public columnDefs: any;
  public defaultColDef: any;
  public rowData: any;

  public gridOptions: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private modalService: ModalService<ImportCsvModalComponent>
  ) {
    this.columnDefs = [
      {
        field: 'name',
        filter: 'agTextColumnFilter',
        maxWidth: 300,
      },
      {
        field: 'reference',
        filter: 'agTextColumnFilter',
        maxWidth: 300,
        sortable: true
      },
      {
        headerName: 'Created At',
        field: 'createdAt',
        filter: 'agDateColumnFilter',
        maxWidth: 200,
        sortable: true,
        filterParams: this.filterParams,
        valueFormatter: (data: any) => {
          return moment.unix(data.value.seconds).format('MM/DD/YYYY HH:mm')
        }
      },
      {
        headerName: 'Updated At',
        field: 'updatedAt',
        filter: 'agDateColumnFilter',
        filterParams: this.filterParams,
        maxWidth: 200,
        sortable: true,
        valueFormatter: (data: any) => {
          return moment.unix(data.value.seconds).format('MM/DD/YYYY HH:mm')
        }
      },

    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      filter: true,
      pagination: true
    };
    this.gridOptions = {
      pagination: true,
      paginationAutoPageSize: true,
    };
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.isExpandedSubscription?.unsubscribe();
  }


  getData(params: any): void {
    this.recipesList = [];
    this.recipeService.getRecipes().subscribe(querySnapshot => {
      querySnapshot.forEach((doc) => {
        let data: Recipe = doc.data();
        data.id = doc.id;
        this.recipesList.push(data);
      });
      params.api.setRowData(this.recipesList);
    });
  }
  public params: any;
  onGridReady(params: any) {
    this.params = params;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getData(params);

  }

  private filterParams = {
    comparator: function (filterLocalDateAtMidnight: any, cellValue: any): any {
      //TODO:: Extract this method
      const filterDate = moment(moment(filterLocalDateAtMidnight).format('L'))
      const
        date = moment(moment.unix(cellValue.seconds).format('L'));
      if (date == null) return -1;

      if (filterDate.isSame(date)) {
        return 0;
      }
      if (date.isBefore(filterDate)) {
        return -1;
      }
      if (date.isAfter(filterDate)) {
        return 1;
      }
    },
    browserDatePicker: true,
  };

  //onClick Export Button
  onAdd(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  //onClick Export Button
  onRefresh(): void {
    this.gridOptions.api.deselectAll();
    this.getData(this.params);

  }

  //onClick Export Button
  onSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  //onClick Export Button
  onExport(): void {

  }

  file:any;
  //onClick Export Button
  async onImport(e: any): Promise<void> {

  }

  onSelectionChanged(params: any) {
    const selectedRows: Recipe = this.gridApi.getSelectedRows()[0];
    if (selectedRows != null) {
      this.router.navigate(['edit', selectedRows.id!], {relativeTo: this.route});
      // this.crudService.expandDetailEdition(selectedRows.id!);
    }

  }

}
