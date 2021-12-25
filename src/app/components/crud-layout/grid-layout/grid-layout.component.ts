import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OilService} from '../oil.service';
import {CrudService} from "../crud.service";
import * as moment from "moment";
import {Oil} from "../../../models/oil.model";
import {Subscription} from "rxjs";
import {ModalService} from "../../../shared/modal.service";
import {ImportCsvModalComponent} from "../../../shared/import-csv-modal/import-csv-modal.component";

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss'],
})
export class GridLayoutComponent implements OnInit, OnDestroy {

  public oilList: Oil[] = [];
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
    private oilService: OilService,
    private crudService: CrudService,
    private modalService: ModalService<ImportCsvModalComponent>
  ) {
    this.columnDefs = [
      {
        field: 'name',
        filter: 'agTextColumnFilter',
        maxWidth: 300,
      },
      {
        headerName: 'Scientific Name',
        field: 'sciName',
        filter: 'agTextColumnFilter',
        maxWidth: 300,
        sortable: true
      },
      {
        field: 'otherNames',
        filter: 'agTextColumnFilter',
        maxWidth: 300,
        sortable: true
      },
      {
        field: 'distilledOrgan',
        filter: 'agTextColumnFilter',
        maxWidth: 300,
        sortable: true
      },

      {
        field: 'allergies',
        filter: 'agTextColumnFilter',
        maxWidth: 200,
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
    this.isExpandedSubscription = this.crudService.isDetailsExpandedSubject.subscribe((isExpanded: boolean) => {
      this.isExpanded = isExpanded;
    })
  }

  ngOnDestroy(): void {
    this.isExpandedSubscription?.unsubscribe();
  }


  getData(params: any): void {
    this.oilList = [];
    this.oilService.getOils().subscribe(querySnapshot => {
      querySnapshot.forEach((doc) => {
        let data: Oil = doc.data();
        data.id = doc.id;
        this.oilList.push(data);
      });
      params.api.setRowData(this.oilList);
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
    this.crudService.expandDetailAdding();
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
    this.oilService.getOilAndDomainsToJson().then(data => {
      console.log(data)
    })
  }

  file:any;
  //onClick Export Button
  async onImport(e: any): Promise<void> {
    const {ImportCsvModalComponent} = await import(
      '../../../shared/import-csv-modal/import-csv-modal.component'
      );
    await this.modalService.open(ImportCsvModalComponent);
  }

  onSelectionChanged(params: any) {

    const selectedRows: Oil = this.gridApi.getSelectedRows()[0];
    if (selectedRows != null) {
      this.crudService.expandDetailEdition(selectedRows.id!);
      console.log(selectedRows);
    }

  }

}
