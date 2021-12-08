import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-layout',
  templateUrl: './detail-layout.component.html',
  styleUrls: ['./detail-layout.component.scss']
})
export class DetailLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   //onClick Export Button
   onAdd(): void {
    console.log('Export');
  }

  //onClick Export Button
  onDelete(): void {
    console.log('Import');
  }

  //onClick Export Button
  onSave(): void {
    console.log('Delete');
  }

}
