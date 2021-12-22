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
  public currentOilDomains: OilDomain[] = [];
  public currentOil: Oil | undefined;
  constructor(
    private crudService: CrudService,
    private oilService: OilService
  ) {
    //TODO:: implements form Validation
    //TODO:: Implements FormArray (211)
    this.oilDetailForm = new FormGroup({
      'oilId': new FormControl(null),
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
          'healthId': new FormControl(null),
          'properties': new FormControl(null),
          'precautionOfUse': new FormControl(null),
          'areaOfUse': new FormControl(null),
          'practicalUse': new FormControl(null),
          'synergy': new FormControl(null),

        }),
        'beauty': new FormGroup({
          'beautyId': new FormControl(null),
          'properties': new FormControl(null),
          'precautionOfUse': new FormControl(null),
          'areaOfUse': new FormControl(null),
          'practicalUse': new FormControl(null),
          'synergy': new FormControl(null),

        }),
        'wellBeing': new FormGroup({
          'wellBeingId': new FormControl(null),
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

      this.oilService.getOilById(id!).subscribe(data => {
        this.currentOil = data.data();
        this.currentOil!.id = data.id;
      });
      this.oilService.getOilDetailByID(id!).subscribe((data) => {
        data.forEach(result => {
          let s = result.data();
          s.id = result.id;
          this.currentOilDomains.push(s);
        })
        this.oilDetailForm.patchValue({
          'oilId': this.currentOil?.id,
          'name': this.currentOil!.name,
          'sciName': this.currentOil!.sciName,
          'otherNames': this.currentOil!.otherNames,
          'distilledOrgan': this.currentOil!.distilledOrgan,
          'extractionProcess': this.currentOil!.extractionProcess,
          'allergies': this.currentOil!.allergies,

          'organoleptics': {
            'color': this.currentOil!.organoleptics.color,
            'aspect': this.currentOil!.organoleptics.aspect,
            'smell': this.currentOil!.organoleptics.smell,
          },
          'domains': {
            'health': {
              'healthId': this.currentOilDomains.filter(domain => domain.type == DomainType.health)[0].id,
              'areaOfUse': this.currentOilDomains.filter(domain => domain.type == DomainType.health)[0].areaOfUse,
              'practicalUse': this.currentOilDomains.filter(domain => domain.type == DomainType.health)[0].practicalUse,
              'precautionOfUse': this.currentOilDomains.filter(domain => domain.type == DomainType.health)[0].precautionOfUse,
              'properties': this.currentOilDomains.filter(domain => domain.type == DomainType.health)[0].properties,
              'synergy': this.currentOilDomains.filter(domain => domain.type == DomainType.health)[0].synergy,
            },
            'beauty': {
              'beautyId': this.currentOilDomains.filter(domain => domain.type == DomainType.beauty)[0].id,
              'areaOfUse': this.currentOilDomains.filter(domain => domain.type == DomainType.beauty)[0].areaOfUse,
              'practicalUse': this.currentOilDomains.filter(domain => domain.type == DomainType.beauty)[0].practicalUse,
              'precautionOfUse': this.currentOilDomains.filter(domain => domain.type == DomainType.beauty)[0].precautionOfUse,
              'properties': this.currentOilDomains.filter(domain => domain.type == DomainType.beauty)[0].properties,
              'synergy': this.currentOilDomains.filter(domain => domain.type == DomainType.beauty)[0].synergy,
            },
            'wellBeing': {
              'wellBeingId': this.currentOilDomains.filter(domain => domain.type == DomainType.wellBeing)[0].id,
              'areaOfUse': this.currentOilDomains.filter(domain => domain.type == DomainType.wellBeing)[0].areaOfUse,
              'practicalUse': this.currentOilDomains.filter(domain => domain.type == DomainType.wellBeing)[0].practicalUse,
              'precautionOfUse': this.currentOilDomains.filter(domain => domain.type == DomainType.wellBeing)[0].precautionOfUse,
              'properties': this.currentOilDomains.filter(domain => domain.type == DomainType.wellBeing)[0].properties,
              'synergy': this.currentOilDomains.filter(domain => domain.type == DomainType.wellBeing)[0].synergy,
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
      let currentOil: Oil = this.formToOil();
      let currentOilDomains: OilDomain[] = []
      currentOilDomains.push(...this.formToOilDomain());
      this.oilService.updateOilAndDomains(currentOil, currentOilDomains).then(r =>
        console.log(r)
      )


    } else if (this.crudService.detailMethod == DetailsMethod.Add) {
      let currentOil: Oil = this.formToOil();
      let currentOilDomains: OilDomain[] = []
      currentOilDomains.push(...this.formToOilDomain());
      this.oilService.createOil(currentOil, currentOilDomains).then(r =>
      console.log(r));
    }
  }

  //onClick Export Button
  onClose() {
    this.crudService.closeDetail();
  }

  formToOil(): Oil {
    return new Oil(
      this.currentOil?.id == null ? null : this.currentOil?.id,
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
        (this.crudService.detailMethod == DetailsMethod.Edit) ? this.currentOilDomains.filter(domain => domain.type == DomainType.beauty)[0].id : null,
        DomainType.beauty,
        this.oilDetailForm.value.domains.beauty.properties,
        this.oilDetailForm.value.domains.beauty.precautionOfUse,
        this.oilDetailForm.value.domains.beauty.areaOfUse,
        this.oilDetailForm.value.domains.beauty.practicalUse,
        this.oilDetailForm.value.domains.beauty.synergy,
        this.crudService.selectedModelID == null ? null : this.crudService.selectedModelID
      ),
      new OilDomain(
        (this.crudService.detailMethod == DetailsMethod.Edit) ? this.currentOilDomains.filter(domain => domain.type == DomainType.health)[0].id : null,
        DomainType.health,
        this.oilDetailForm.value.domains.health.properties,
        this.oilDetailForm.value.domains.health.precautionOfUse,
        this.oilDetailForm.value.domains.health.areaOfUse,
        this.oilDetailForm.value.domains.health.practicalUse,
        this.oilDetailForm.value.domains.health.synergy,
        this.crudService.selectedModelID == null ? null : this.crudService.selectedModelID
      ),
      new OilDomain(
        (this.crudService.detailMethod == DetailsMethod.Edit) ? this.currentOilDomains.filter(domain => domain.type == DomainType.wellBeing)[0].id : null,
        DomainType.wellBeing,
        this.oilDetailForm.value.domains.wellBeing.properties,
        this.oilDetailForm.value.domains.wellBeing.precautionOfUse,
        this.oilDetailForm.value.domains.wellBeing.areaOfUse,
        this.oilDetailForm.value.domains.wellBeing.practicalUse,
        this.oilDetailForm.value.domains.wellBeing.synergy,
        this.crudService.selectedModelID == null ? null : this.crudService.selectedModelID
      ),
    );
    return oilDomains;
  }
}
