import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../../../services/database.service';

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss'],
})
export class GridLayoutComponent implements OnInit {

  public searchValue: string | undefined;
  public gridApi: any;
  public gridColumnApi: any;

  public columnDefs: any;
  public defaultColDef: any;
  public rowData: any;

  public gridOptions: any;

  constructor(private databaseService: DatabaseService) {
    this.columnDefs = [
      {field: 'athlete'},
      {
        field: 'age',
        filter: 'agNumberColumnFilter',
        maxWidth: 100,
      },
      {field: 'country'},
      {
        field: 'year',
        maxWidth: 100,
      },
      {
        field: 'date',
        filter: 'agDateColumnFilter',
        filterParams: this.filterParams,
      },
      {field: 'sport'},
      {
        field: 'gold',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'silver',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'bronze',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'total',
        filter: false,
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

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.databaseService
      .getData()
      .subscribe((data) => params.api.setRowData(data));
  }


  private filterParams = {
    comparator: function (filterLocalDateAtMidnight: any, cellValue: any): any {
      var dateAsString = cellValue;
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split('/');
      var cellDate = new Date(
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

  ngOnInit(): void {
  }

  //onClick Export Button
  onAdd(): void {
    console.log('Add');
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
    const selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
  }

}
