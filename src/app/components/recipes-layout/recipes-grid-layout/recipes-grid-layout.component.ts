import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../recipe.service';
import * as moment from "moment";
import {ModalService} from "../../../shared/modal.service";
import {ImportCsvModalComponent} from "../../../shared/import-csv-modal/import-csv-modal.component";
import {Recipe} from "../../../models/recipes.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Functions} from "../../../shared/functions";

@Component({
  selector: 'app-recipes-grid-layout',
  templateUrl: './recipes-grid-layout.component.html',
  styleUrls: ['./recipes-grid-layout.component.scss'],
})
export class RecipesGridLayoutComponent implements OnInit, OnDestroy {

  public recipesList: Recipe[] = [];
  public isExpanded: boolean = false;


  // Grid vars
  public searchValue: string | undefined;
  public gridApi: any;
  public gridColumnApi: any;
  public columnDefs: any;
  public defaultColDef: any;
  public rowData: any;
  public gridOptions: any;
  public gridParams: any;
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
    this.recipeService.isExpandedSubject.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    })
    this.recipeService.refreshSubject.subscribe(() => {
      this.onRefresh();
    })
  }

  ngOnDestroy(): void {
    this.recipeService.isExpandedSubject.unsubscribe();
    this.recipeService.refreshSubject.unsubscribe();
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

  onGridReady(params: any) {
    this.gridParams = params;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getData(params);
  }


  //onClick Export Button
  onAdd(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  //onClick Export Button
  onRefresh(): void {
    this.gridOptions.api.deselectAll();
    this.getData(this.gridParams);
  }

  //onClick Export Button
  onSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  onSelectionChanged(params: any) {
    const selectedRows: Recipe = this.gridApi.getSelectedRows()[0];
    if (selectedRows != null) {
      this.router.navigate(['edit', selectedRows.id!], {relativeTo: this.route});
    }
  }

  //onClick Export Button
  onExport(): void {
    if (confirm('Do you want to export all recipes ?')) {
      let recipesModelList: any[] = [];
      this.recipesList.forEach(recipe => {
        const recipeModel: any = recipe;
        delete recipeModel['id'];
        delete recipeModel['updatedAt'];
        delete recipeModel['createdAt'];
        recipesModelList.push(recipeModel);
      });

      Functions.exportJsonFile(recipesModelList, 'recipes');
    }


  }

  //onClick Import Button
  async onImport(e: any): Promise<void> {
    const {ImportCsvModalComponent} = await import(
      '../../../shared/import-csv-modal/import-csv-modal.component'
      );
    await this.modalService.open(ImportCsvModalComponent);
  }


}
