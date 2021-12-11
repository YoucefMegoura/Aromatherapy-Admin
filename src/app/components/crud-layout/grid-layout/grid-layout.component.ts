import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DatabaseService} from '../database.service';
import {CrudService} from "../crud.service";
import * as moment from "moment";
import {Oil} from "../../../models/oil.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss'],
})
export class GridLayoutComponent implements OnInit, OnDestroy {

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
    private databaseService: DatabaseService,
    private crudService: CrudService
  ) {
    this.columnDefs = [
      {
        field: 'name',
        filter: 'agTextColumnFilter',
        maxWidth: 200,
      },
      {
        headerName: 'Scientific Name',
        field: 'sciName',
        filter: 'agTextColumnFilter',
        maxWidth: 200,
      },
      {
        field: 'otherNames',
        filter: 'agTextColumnFilter',
        maxWidth: 200,
      },
      {
        field: 'distilledOrgan',
        filter: 'agTextColumnFilter',
        maxWidth: 200,
      },

      {
        field: 'allergies',
        filter: 'agTextColumnFilter',
        maxWidth: 200,
      },
      {
        headerName: 'Created At',
        field: 'createdAt',
        filter: 'agDateColumnFilter',
        filterParams: this.filterParams,
        valueFormatter: (data: any) => {
          return moment(data.createdAt).format('MM/DD/YYYY HH:mm')
        }
      },
      {
        headerName: 'Updated At',
        field: 'updatedAt',
        filter: 'agDateColumnFilter',
        filterParams: this.filterParams,
        valueFormatter: (data: any) => {
          return moment(data.createdAt).format('MM/DD/YYYY HH:mm')
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


  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.databaseService
      .getData()
      .subscribe((data) => params.api.setRowData(data));
  }


  private filterParams = {
    comparator: function (filterLocalDateAtMidnight: any, cellValue: any): any {
      const
        dateAsString = cellValue;
      if (dateAsString == null) return -1;
      const
        dateParts = dateAsString.split('/');
      const
        cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0])
        );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    },
    browserDatePicker: true,
  };

  //onClick Export Button
  onAdd(): void {
    this.crudService.expandDetail();
  }

  //onClick Export Button
  onRefresh(): void {
    console.log('Refresh');
  }

  //onClick Export Button
  onSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  //onClick Export Button
  onExport(): void {
    console.log('Export');
  }

  //onClick Export Button
  onImport(): void {
    console.log('Import');
  }

  //onClick Export Button
  onDelete(): void {
    console.log('Delete');
  }

  onSelectionChanged(params: any) {
    const selectedRows: Oil = this.gridApi.getSelectedRows();
    console.log(selectedRows);
  }

}
