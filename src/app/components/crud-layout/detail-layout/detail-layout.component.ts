import {Component, Input, OnInit} from '@angular/core';
import {CrudService} from "../crud.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-detail-layout',
  templateUrl: './detail-layout.component.html',
  styleUrls: ['./detail-layout.component.scss']
})
export class DetailLayoutComponent implements OnInit {

  constructor(private crudService: CrudService) {
  }

  ngOnInit(): void {

  }

  //onClick Export Button
  onAdd(): void {
    this.crudService.expandDetail();
  }

  //onClick Export Button
  onDelete(): void {
    console.log('Delete');
  }

  //onClick Export Button
  onSave(): void {
    console.log('Save');
  }

  //onClick Export Button
  onClose() {
    this.crudService.closeDetail();
  }
}
