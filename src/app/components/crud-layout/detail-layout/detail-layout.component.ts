import {Component, OnInit} from '@angular/core';
import {CrudService} from "../crud.service";
import {DatabaseService} from "../database.service";
import {Oil} from "../../../models/oil.model";
import {Organoleptic} from "../../../models/organoleptic.model";
import {Domain, DomainType} from "../../../models/domain.model";
import {FormControl, FormGroup} from "@angular/forms";

export enum DetailsMethod {//TODO:: find a other name
  Add = 'add',
  Edit = 'edit'
}

@Component({
  selector: 'app-detail-layout',
  templateUrl: './detail-layout.component.html',
  styleUrls: ['./detail-layout.component.scss']
})

export class DetailLayoutComponent implements OnInit {

  public oilDetailForm: FormGroup;
  public saveInfos: string = '';

  constructor(
    private crudService: CrudService,
    private databaseService: DatabaseService
  ) {
    //TODO:: implements form Validation
    //TODO:: Implements FormArray (211)
    this.oilDetailForm = new FormGroup({
      'globalData': new FormGroup({
        'name': new FormControl(null),
        'sciName': new FormControl(null),
        'otherNames': new FormControl(null),
        'distilledOrgan': new FormControl(null),
        'extractionProcess': new FormControl(null),
        'allergies': new FormControl(null),
      }),
      'organolepticProperties': new FormGroup({
        'color': new FormControl(null),
        'smell': new FormControl(null),
        'aspect': new FormControl(null),
      }),
      'domains': new FormGroup({
        'health': new FormGroup({
          'properties': new FormControl(null),
          'precautionOfUse': new FormControl(null),
          'areaOfUse': new FormControl(null),
          'practicalUse': new FormControl(null),
          'synergy': new FormControl(null),

        }),
        'beauty': new FormGroup({
          'properties': new FormControl(null),
          'precautionOfUse': new FormControl(null),
          'areaOfUse': new FormControl(null),
          'practicalUse': new FormControl(null),
          'synergy': new FormControl(null),

        }),
        'wellBeing': new FormGroup({
          'properties': new FormControl(null),
          'precautionOfUse': new FormControl(null),
          'areaOfUse': new FormControl(null),
          'practicalUse': new FormControl(null),
          'synergy': new FormControl(null),

        }),
      }),
    });
  }

  ngOnInit(): void {
    if (this.crudService.detailMethod == DetailsMethod.Edit) {
      let id = this.crudService.selectedModelID;
      console.log('ZERTYUIO = ' + id);
      //TODO:: check if id exists
      this.databaseService.getOilByID(id!).subscribe((oil: Oil) => {
        this.oilDetailForm.patchValue({
          'globalData': {
            'name': oil.name,
            'sciName': oil.sciName,
            'otherNames': oil.otherNames,
            'distilledOrgan': oil.distilledOrgan,
            'extractionProcess': oil.extractionProcess,
            'allergies': oil.allergies,
          }
        });
      });

    }

  }

  //onClick Export Button
  onAdd(): void {

    // this.databaseService.addOil(oil).subscribe((data) => {
    //   console.log(data)
    // }, (error) => {
    //   console.log(error)
    // });
  }

  //onClick Export Button
  onDelete(): void {
    console.log('Delete');
  }

  //onClick Export Button
  onSave(): void {
    console.log('Save');
    console.log(this.oilDetailForm.value)
  }

  //onClick Export Button
  onClose() {
    this.crudService.closeDetail();
  }
}
