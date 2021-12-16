import {Component, OnInit} from '@angular/core';
import {CrudService} from "../crud.service";
import {OilService} from "../oil.service";
import {Oil} from "../../../models/oil.model";
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
    private databaseService: OilService
  ) {
    //TODO:: implements form Validation
    //TODO:: Implements FormArray (211)
    this.oilDetailForm = new FormGroup({
      'name': new FormControl(null),
      'sciName': new FormControl(null),
      'otherNames': new FormControl(null),
      'distilledOrgan': new FormControl(null),
      'extractionProcess': new FormControl(null),
      'allergies': new FormControl(null),

      'organoleptics': new FormGroup({
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
      //TODO:: check if id exists
      /*this.databaseService.getOilDetailById(id!).subscribe((oil: Oil) => {
        this.oilDetailForm.patchValue({

          'name': oil.name,
          'sciName': oil.sciName,
          'otherNames': oil.otherNames,
          'distilledOrgan': oil.distilledOrgan,
          'extractionProcess': oil.extractionProcess,
          'allergies': oil.allergies,

          'organoleptics': {
            'color': oil.organoleptics.color,
            'aspect': oil.organoleptics.aspect,
            'smell': oil.organoleptics.smell,
          },
          // 'domains': {
          //   'health': {
          //     'areaOfUse': oil.domains.filter(domain => domain.type == DomainType.health)[0].areaOfUse,
          //     'practicalUse': oil.domains.filter(domain => domain.type == DomainType.health)[0].practicalUse,
          //     'precautionOfUse': oil.domains.filter(domain => domain.type == DomainType.health)[0].precautionOfUse,
          //     'properties': oil.domains.filter(domain => domain.type == DomainType.health)[0].properties,
          //     'synergy': oil.domains.filter(domain => domain.type == DomainType.health)[0].synergy,
          //   },
          //   'beauty': {
          //     'areaOfUse': oil.domains.filter(domain => domain.type == DomainType.beauty)[0].areaOfUse,
          //     'practicalUse': oil.domains.filter(domain => domain.type == DomainType.beauty)[0].practicalUse,
          //     'precautionOfUse': oil.domains.filter(domain => domain.type == DomainType.beauty)[0].precautionOfUse,
          //     'properties': oil.domains.filter(domain => domain.type == DomainType.beauty)[0].properties,
          //     'synergy': oil.domains.filter(domain => domain.type == DomainType.beauty)[0].synergy,
          //   },
          //   'wellBeing': {
          //     'areaOfUse': oil.domains.filter(domain => domain.type == DomainType.wellBeing)[0].areaOfUse,
          //     'practicalUse': oil.domains.filter(domain => domain.type == DomainType.wellBeing)[0].practicalUse,
          //     'precautionOfUse': oil.domains.filter(domain => domain.type == DomainType.wellBeing)[0].precautionOfUse,
          //     'properties': oil.domains.filter(domain => domain.type == DomainType.wellBeing)[0].properties,
          //     'synergy': oil.domains.filter(domain => domain.type == DomainType.wellBeing)[0].synergy,
          //   },
          //
          // }
        });
      });*/

    }

  }

  //onClick Export Button
  onAdd(): void {
    //TODO:: add mapping methods
    console.log(this.oilDetailForm.value);
    let oil = this.formToOil();
    this.databaseService.createOil({...oil}).then((data) => {
      console.log(data);
    }, (error => {
      console.log(error);
    }))
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

  formToOil (): Oil {
    return new Oil(
      null,
      this.oilDetailForm.value.name,
      this.oilDetailForm.value.sciName,
      this.oilDetailForm.value.otherNames,
      this.oilDetailForm.value.distilledOrgan,
      this.oilDetailForm.value.extractionProcess,
      this.oilDetailForm.value.allergies,
      this.oilDetailForm.value.organoleptics,
      // [
      //   new Domain(
      //     null,
      //     DomainType.health,
      //     this.oilDetailForm.value.domains.health.properties,
      //     this.oilDetailForm.value.domains.health.precautionOfUse,
      //     this.oilDetailForm.value.domains.health.areaOfUse,
      //     this.oilDetailForm.value.domains.health.practicalUse,
      //     this.oilDetailForm.value.domains.health.synergy,
      //     null
      //   ),
      //   new Domain(
      //     null,
      //     DomainType.beauty,
      //     this.oilDetailForm.value.domains.beauty.properties,
      //     this.oilDetailForm.value.domains.beauty.precautionOfUse,
      //     this.oilDetailForm.value.domains.beauty.areaOfUse,
      //     this.oilDetailForm.value.domains.beauty.practicalUse,
      //     this.oilDetailForm.value.domains.beauty.synergy,
      //     null
      //   ),
      //   new Domain(
      //     null,
      //     DomainType.wellBeing,
      //     this.oilDetailForm.value.domains.wellBeing.properties,
      //     this.oilDetailForm.value.domains.wellBeing.precautionOfUse,
      //     this.oilDetailForm.value.domains.wellBeing.areaOfUse,
      //     this.oilDetailForm.value.domains.wellBeing.practicalUse,
      //     this.oilDetailForm.value.domains.wellBeing.synergy,
      //     null
      //   )
      // ],
      new Date(),
      new Date()
    );
  }
}
