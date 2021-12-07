import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss']
})
export class GridLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  //onClick Export Button
  onSearch(): void {
    console.log('Search');
  }

  //onClick Export Button
  onExport(): void {
    console.log('Export');
  }

  //onClick Export Button
  onImport(): void {
    console.log('Import');
  }

  

}
