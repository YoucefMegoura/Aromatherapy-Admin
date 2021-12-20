import {Component, OnInit} from '@angular/core';
import {CrudService} from "../crud.service";
import {OilService} from "../oil.service";
import {Oil} from "../../../models/oil.model";
import {OilDomain, DomainType} from "../../../models/domain.model";
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
    private oilService: OilService
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

      let currentOilDomains: OilDomain[] = [];
      let currentOil: Oil;
      this.oilService.getOilById(id!).subscribe(data => {
        currentOil = data.data();
      });
      console.log("=================")
      console.log('id === ', id!)
      this.oilService.getOilDetailByID(id!).subscribe((data) => {
        console.log(data)
        data.forEach(result => {
          console.log("=================")
          currentOilDomains.push(result.data());
        })
        this.oilDetailForm.patchValue({
          'name': currentOil.name,
          'sciName': currentOil.sciName,
          'otherNames': currentOil.otherNames,
          'distilledOrgan': currentOil.distilledOrgan,
          'extractionProcess': currentOil.extractionProcess,
          'allergies': currentOil.allergies,

          'organoleptics': {
            'color': currentOil.organoleptics.color,
            'aspect': currentOil.organoleptics.aspect,
            'smell': currentOil.organoleptics.smell,
          },
          'domains': {
            'health': {
              'areaOfUse': currentOilDomains.filter(domain => domain.type == DomainType.health)[0].areaOfUse,
              'practicalUse': currentOilDomains.filter(domain => domain.type == DomainType.health)[0].practicalUse,
              'precautionOfUse': currentOilDomains.filter(domain => domain.type == DomainType.health)[0].precautionOfUse,
              'properties': currentOilDomains.filter(domain => domain.type == DomainType.health)[0].properties,
              'synergy': currentOilDomains.filter(domain => domain.type == DomainType.health)[0].synergy,
            },
            'beauty': {
              'areaOfUse': currentOilDomains.filter(domain => domain.type == DomainType.beauty)[0].areaOfUse,
              'practicalUse': currentOilDomains.filter(domain => domain.type == DomainType.beauty)[0].practicalUse,
              'precautionOfUse': currentOilDomains.filter(domain => domain.type == DomainType.beauty)[0].precautionOfUse,
              'properties': currentOilDomains.filter(domain => domain.type == DomainType.beauty)[0].properties,
              'synergy': currentOilDomains.filter(domain => domain.type == DomainType.beauty)[0].synergy,
            },
            'wellBeing': {
              'areaOfUse': currentOilDomains.filter(domain => domain.type == DomainType.wellBeing)[0].areaOfUse,
              'practicalUse': currentOilDomains.filter(domain => domain.type == DomainType.wellBeing)[0].practicalUse,
              'precautionOfUse': currentOilDomains.filter(domain => domain.type == DomainType.wellBeing)[0].precautionOfUse,
              'properties': currentOilDomains.filter(domain => domain.type == DomainType.wellBeing)[0].properties,
              'synergy': currentOilDomains.filter(domain => domain.type == DomainType.wellBeing)[0].synergy,
            },

          }
        });
      });


    }

  }

  //onClick Export Button
  onAdd(): void {
    //TODO:: add mapping methods
    let oil: Oil = this.formToOil();
    let oilDomains: OilDomain[] = this.formToOilDomain();
    console.log(oilDomains);
    debugger;
    this.oilService.createOil(oil, oilDomains).then((data) => {
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
    if (this.crudService.detailMethod == DetailsMethod.Edit) {
      //update
      console.log('edit')
    } else if (this.crudService.detailMethod == DetailsMethod.Add) {
      //add
      console.log('add')
      let currentOil: Oil = this.formToOil();
      let currentOilDomains: OilDomain[] = []
      currentOilDomains.push(...this.formToOilDomain());
      this.oilService.createOil(currentOil, currentOilDomains).then(r =>
      console.log(r));
    }
    console.log(this.oilDetailForm.value)
  }

  //onClick Export Button
  onClose() {
    this.crudService.closeDetail();
  }

  formToOil(): Oil {
    return new Oil(
      null,
      this.oilDetailForm.value.name,
      this.oilDetailForm.value.sciName,
      this.oilDetailForm.value.otherNames,
      this.oilDetailForm.value.distilledOrgan,
      this.oilDetailForm.value.extractionProcess,
      this.oilDetailForm.value.allergies,
      this.oilDetailForm.value.organoleptics,
      new Date(),
      new Date()
    );
  }

  formToOilDomain(): OilDomain[] {
    let oilDomains: OilDomain[] = [];
    oilDomains.push(
      new OilDomain(
        null,
        DomainType.beauty,
        this.oilDetailForm.value.domains.beauty.properties,
        this.oilDetailForm.value.domains.beauty.precautionOfUse,
        this.oilDetailForm.value.domains.beauty.areaOfUse,
        this.oilDetailForm.value.domains.beauty.practicalUse,
        this.oilDetailForm.value.domains.beauty.synergy,
        null
      ),
      new OilDomain(
        null,
        DomainType.health,
        this.oilDetailForm.value.domains.health.properties,
        this.oilDetailForm.value.domains.health.precautionOfUse,
        this.oilDetailForm.value.domains.health.areaOfUse,
        this.oilDetailForm.value.domains.health.practicalUse,
        this.oilDetailForm.value.domains.health.synergy,
        null
      ),
      new OilDomain(
        null,
        DomainType.wellBeing,
        this.oilDetailForm.value.domains.wellBeing.properties,
        this.oilDetailForm.value.domains.wellBeing.precautionOfUse,
        this.oilDetailForm.value.domains.wellBeing.areaOfUse,
        this.oilDetailForm.value.domains.wellBeing.practicalUse,
        this.oilDetailForm.value.domains.wellBeing.synergy,
        null
      ),
    );
    return oilDomains;
  }
}
