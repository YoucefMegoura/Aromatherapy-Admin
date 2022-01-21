import {Component, OnDestroy, OnInit} from '@angular/core';
import {OilService} from '../oil.service';
import * as moment from "moment";
import {Oil} from "../../../models/oil.model";
import {Subscription} from "rxjs";
import {ModalService} from "../../../shared/modal.service";
import {ImportJsonModalComponent} from "../../../shared/import-csv-modal/import-json-modal.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Functions} from "../../../shared/functions";




@Component({
  selector: 'app-oils-grid-layout',
  templateUrl: './oils-grid-layout.component.html',
  styleUrls: ['./oils-grid-layout.component.scss'],
})
export class OilsGridLayoutComponent implements OnInit, OnDestroy {


  public isExpanded: boolean = false;
  public oilsList: Object[] = [];

  private isExpandedSubscription: Subscription | undefined;
  private refreshSubscription: Subscription | undefined;

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
  }


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private oilService: OilService,
    private modalService: ModalService<ImportJsonModalComponent>
  ) {
    this.columnDefs = [
      {
        field: 'id',
        hide: true,
        suppressColumnsToolPanel: true
      },
      {
        field: 'name',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Scientific Name',
        field: 'sciName',
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        field: 'otherNames',
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        field: 'distilledOrgan',
        filter: 'agTextColumnFilter',
        sortable: true
      },

      {
        field: 'allergies',
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        headerName: 'Extraction Process',
        field: 'extractionProcess',
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        headerName: 'Created At',
        field: 'createdAt',
        filter: 'agDateColumnFilter',
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
        sortable: true,
        valueFormatter: (data: any) => {
          return moment.unix(data.value.seconds).format('MM/DD/YYYY HH:mm')
        }
      },

    ];
    this.defaultColDef = {
      flex: 1,
      filter: true,
      pagination: true
    };
    this.gridOptions = {
      pagination: true,
      paginationAutoPageSize: true,
    };
  }

  ngOnInit(): void {
    this.isExpandedSubscription = this.oilService.isExpandedSubject.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    })
    this.refreshSubscription = this.oilService.refreshSubject.subscribe(() => {
      this.onRefresh();
    })

  }

  ngOnDestroy(): void {
    this.isExpandedSubscription?.unsubscribe();
    this.refreshSubscription?.unsubscribe();
  }


  getData(params: any): void {
    this.oilsList = [];
    this.oilService.getOils().subscribe(querySnapshot => {
      querySnapshot.forEach((doc) => {
        let data: any = doc.data();
        data.id = doc.id;
        this.oilsList.push(data);
      });
      params.api.setRowData(this.oilsList);
    });
  }

  onGridReady(params: any) {
    this.gridParams = params;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getData(params);

  };

  //onClick Button
  onAdd(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  //onClick Button
  onRefresh(): void {
    this.gridOptions.api.deselectAll();
    this.getData(this.gridParams);
  }

  //onClick Button
  onSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  onSelectionChanged(params: any) {
    const selectedRows: any = this.gridApi.getSelectedRows()[0];
    if (selectedRows != null) {
      this.router.navigate(['edit', selectedRows.id!], {relativeTo: this.route});
    }
  }

  //onClick Export Button
  onExport(): void {
    if (confirm('Do you want to export all recipes ?')) {
      let oilsModelList: any[] = [];
      /*this.oilsList.forEach((oil: Oil) => {
        const oilModel: any = oil;
        delete oilModel['id'];
        delete oilModel['updatedAt'];
        delete oilModel['createdAt'];
        oilsModelList.push(oilModel);
      });*/

      Functions.exportJsonFile(oilsModelList, 'oils');
    }


  }

  //onClick Import Button
  async onImport(e: any): Promise<void> {
    const {ImportJsonModalComponent} = await import(
      '../../../shared/import-csv-modal/import-json-modal.component'
      );
    await this.modalService.open(ImportJsonModalComponent);
  }



}
