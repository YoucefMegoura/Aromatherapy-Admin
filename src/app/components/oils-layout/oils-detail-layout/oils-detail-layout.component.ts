import {Component, OnDestroy, OnInit} from '@angular/core';
import {OilService} from "../oil.service";
import {Oil} from "../../../models/oil.model";
import {Domain, DomainType} from "../../../models/domain.model";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

export enum DetailsMethod {//TODO:: find a other name
  Add = 'add',
  Edit = 'edit'
}

@Component({
  selector: 'app-oils-detail-layout',
  templateUrl: './oils-detail-layout.component.html',
  styleUrls: ['./oils-detail-layout.component.scss']
})

export class OilsDetailLayoutComponent implements OnInit, OnDestroy {

  public oilDetailForm!: FormGroup;

  private detailMethod: DetailsMethod = DetailsMethod.Add;
  private currentOilId: string | undefined;
  private currentHealthId: string | undefined;
  private currentBeautyId: string | undefined;
  private currentWellBeingId: string | undefined;


  public currentOil: Oil | undefined;

  private oilSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private oilService: OilService
  ) {
  }

  private initForm() {
    this.spinner.show();
    let oilId = '';
    let oilName = '';
    let oilSciName = '';
    let oilOtherNames = new FormArray([]);
    let oilDistilledOrgan = '';
    let oilExtractionProcess = '';
    let oilAllergies = new FormArray([]);
    let oilColor = new FormArray([]);
    let oilAspect = new FormArray([]);
    let oilSmell = new FormArray([]);

    let healthId = '';
    let healthProperties = '';
    let healthPrecautionOfUse = '';
    let healthAreaOfUse = '';
    let healthPracticalUse = '';
    let healthSynergy = '';

    let beautyId = '';
    let beautyProperties = '';
    let beautyPrecautionOfUse = '';
    let beautyAreaOfUse = '';
    let beautyPracticalUse = '';
    let beautySynergy = '';

    let wellBeingId = '';
    let wellBeingProperties = '';
    let wellBeingPrecautionOfUse = '';
    let wellBeingAreaOfUse = '';
    let wellBeingPracticalUse = '';
    let wellBeingSynergy = '';


    if (this.detailMethod == DetailsMethod.Edit) {
      if (this.currentOilId == null)
        return;

      let currentOilId: string = this.currentOilId!;

      this.oilService.getOilById(currentOilId).subscribe(async (oilData) => {
        this.currentOil = oilData.data();
        if (this.currentOil == null)
          return;
        this.currentOil.id = currentOilId!;

        oilId = this.currentOil?.id ?? '';
        oilName = this.currentOil?.name ?? '';
        oilSciName = this.currentOil?.sciName ?? '';

        if (this.currentOil?.otherNames) {
          for (let name of this.currentOil.otherNames) {
            oilOtherNames.push(
              new FormControl(name, Validators.required),
            );
          }
        }

        oilDistilledOrgan = this.currentOil?.distilledOrgan ?? '';
        oilExtractionProcess = this.currentOil?.extractionProcess ?? '';
        if (this.currentOil?.allergies) {
          for (let name of this.currentOil.allergies) {
            oilOtherNames.push(
              new FormControl(name, Validators.required),
            );
          }
        }

        if (this.currentOil?.color) {
          for (let name of this.currentOil.color) {
            oilOtherNames.push(
              new FormControl(name, Validators.required),
            );
          }
        }

        if (this.currentOil?.smell) {
          for (let name of this.currentOil.smell) {
            oilOtherNames.push(
              new FormControl(name, Validators.required),
            );
          }
        }

        if (this.currentOil?.aspect) {
          for (let name of this.currentOil.aspect) {
            oilOtherNames.push(
              new FormControl(name, Validators.required),
            );
          }
        }

        this.oilService.getDomainsByOilId(currentOilId).subscribe((domainsListSnapshot) => {
          domainsListSnapshot.forEach(domainSnapshot => {
            let domain: Domain = domainSnapshot.data();
            if (domain.type == DomainType.beauty) {
                this.currentBeautyId = domainSnapshot.id;
                beautyId = domain.id!;
                beautyProperties = domain.properties!;
                beautyPrecautionOfUse = domain.precautionOfUse!;
                beautyAreaOfUse = domain.areaOfUse!;
                beautyPracticalUse = domain.practicalUse!;
                beautySynergy = domain.synergy!;
              }
            if (domain.type == DomainType.health) {
              this.currentHealthId = domainSnapshot.id;

              healthId = domain.id!;
                healthProperties = domain.properties!;
                healthPrecautionOfUse = domain.precautionOfUse!;
                healthAreaOfUse = domain.areaOfUse!;
                healthPracticalUse = domain.practicalUse!;
                healthSynergy = domain.synergy!;
              }
            if (domain.type == DomainType.wellBeing) {
              this.currentWellBeingId = domainSnapshot.id;

              wellBeingId = domain.id!;
                wellBeingProperties = domain.properties!;
                wellBeingPrecautionOfUse = domain.precautionOfUse!;
                wellBeingAreaOfUse = domain.areaOfUse!;
                wellBeingPracticalUse = domain.practicalUse!;
                wellBeingSynergy = domain.synergy!;
              }



          })

          this.getData( //TODO::fix repeeat
            oilId, oilName, oilSciName, oilOtherNames, oilDistilledOrgan,
            oilExtractionProcess, oilAllergies, oilColor, oilSmell, oilAspect,
            healthId, healthProperties, healthPrecautionOfUse, healthAreaOfUse, healthPracticalUse, healthSynergy,
            beautyId, beautyProperties, beautyPrecautionOfUse, beautyAreaOfUse, beautyPracticalUse, beautySynergy,
            wellBeingId, wellBeingProperties, wellBeingPrecautionOfUse, wellBeingAreaOfUse, wellBeingPracticalUse, wellBeingSynergy
          );
          this.spinner.hide();
        });
      }, error => {
        this.spinner.hide();
        console.log(error)
      })





      this.getData(
        oilId, oilName, oilSciName, oilOtherNames, oilDistilledOrgan,
        oilExtractionProcess, oilAllergies, oilColor, oilSmell, oilAspect,
        healthId, healthProperties, healthPrecautionOfUse, healthAreaOfUse, healthPracticalUse, healthSynergy,
        beautyId, beautyProperties, beautyPrecautionOfUse, beautyAreaOfUse, beautyPracticalUse, beautySynergy,
        wellBeingId, wellBeingProperties, wellBeingPrecautionOfUse, wellBeingAreaOfUse, wellBeingPracticalUse, wellBeingSynergy
      );
    } else if (this.detailMethod == DetailsMethod.Add) {
      this.getData(
        oilId, oilName, oilSciName, oilOtherNames, oilDistilledOrgan,
        oilExtractionProcess, oilAllergies, oilColor, oilSmell, oilAspect,
        healthId, healthProperties, healthPrecautionOfUse, healthAreaOfUse, healthPracticalUse, healthSynergy,
        beautyId, beautyProperties, beautyPrecautionOfUse, beautyAreaOfUse, beautyPracticalUse, beautySynergy,
        wellBeingId, wellBeingProperties, wellBeingPrecautionOfUse, wellBeingAreaOfUse, wellBeingPracticalUse, wellBeingSynergy
      );
      this.spinner.hide();
    }


  }


  private getData(
    oilId: string,
    oilName: string,
    oilSciName: string,
    oilOtherNames: FormArray,
    oilDistilledOrgan: string,
    oilExtractionProcess: string,
    oilAllergies: FormArray,
    oilColor: FormArray,
    oilSmell: FormArray,
    oilAspect: FormArray,
    healthId: string,
    healthProperties: string,
    healthPrecautionOfUse: string,
    healthAreaOfUse: string,
    healthPracticalUse: string,
    healthSynergy: string,
    beautyId: string,
    beautyProperties: string,
    beautyPrecautionOfUse: string,
    beautyAreaOfUse: string,
    beautyPracticalUse: string,
    beautySynergy: string,
    wellBeingId: string,
    wellBeingProperties: string,
    wellBeingPrecautionOfUse: string,
    wellBeingAreaOfUse: string,
    wellBeingPracticalUse: string,
    wellBeingSynergy: string,
  ): void {
    this.oilDetailForm = new FormGroup({
      'id': new FormControl(oilId),
      'name': new FormControl(oilName),
      'sciName': new FormControl(oilSciName),
      'otherNames': oilOtherNames,
      'distilledOrgan': new FormControl(oilDistilledOrgan),
      'extractionProcess': new FormControl(oilExtractionProcess),
      'allergies': oilAllergies,
      'color': oilColor,
      'smell': oilSmell,
      'aspect': oilAspect,

      //TODO:: complete

      'domains': new FormGroup({
        'health': new FormGroup({
          'healthId': new FormControl(healthId),
          'properties': new FormControl(healthProperties),
          'precautionOfUse': new FormControl(healthPrecautionOfUse),
          'areaOfUse': new FormControl(healthAreaOfUse),
          'practicalUse': new FormControl(healthPracticalUse),
          'synergy': new FormControl(healthSynergy),

        }),
        'beauty': new FormGroup({
          'beautyId': new FormControl(beautyId),
          'properties': new FormControl(beautyProperties),
          'precautionOfUse': new FormControl(beautyPrecautionOfUse),
          'areaOfUse': new FormControl(beautyAreaOfUse),
          'practicalUse': new FormControl(beautyPracticalUse),
          'synergy': new FormControl(beautySynergy),

        }),
        'wellBeing': new FormGroup({
          'wellBeingId': new FormControl(wellBeingId),
          'properties': new FormControl(wellBeingProperties),
          'precautionOfUse': new FormControl(wellBeingPrecautionOfUse),
          'areaOfUse': new FormControl(wellBeingAreaOfUse),
          'practicalUse': new FormControl(wellBeingPracticalUse),
          'synergy': new FormControl(wellBeingSynergy),

        }),
      }),

    });
  }

  ngOnInit(): void {
    this.oilService.isExpandedSubject.next(true);
    this.route.params.subscribe((params: Params) => {
      this.currentOilId = params['id'];
      this.detailMethod = params['id'] != null ? DetailsMethod.Edit : DetailsMethod.Add;
      this.initForm();
    });

  }

  ngOnDestroy(): void {
    this.oilService.isExpandedSubject.next(false);

  }


  //onClick Export Button
  onAdd(): void {
    if (this.detailMethod == DetailsMethod.Add) {

    } else if (this.detailMethod == DetailsMethod.Edit) {
      this.oilDetailForm.reset()
      this.detailMethod = DetailsMethod.Add;
    }
  }

  //onClick Export Button
  onDelete(): void {
    if (confirm('Do you want to remove this row ?')) {
      this.spinner.show();
      if (this.detailMethod == DetailsMethod.Edit) {
        const currentOilId: string = this.currentOilId!;
        this.oilService.deleteOilAndDomain(currentOilId).then(() => {
            //TODO:: dialog to confirm
            this.oilService.refreshSubject.next(currentOilId);
            this.router.navigate(['oils']);
            this.spinner.hide();
            alert(`Successfully removed`);
          }
        ).catch(error => {
          console.log(error);
          alert(`Error with removing data`);
          this.spinner.hide();
        })
      } else if (this.detailMethod == DetailsMethod.Add) {
        this.spinner.show();
        this.oilDetailForm.reset();
        this.spinner.hide();
      }
    }

  }

  //onClick Export Button
  onSave(): void {
    if (this.oilDetailForm.dirty && this.oilDetailForm.touched) {
      this.spinner.show();
      if (this.detailMethod == DetailsMethod.Edit) {
        let updatedOil: Oil = this.formToOil(this.oilDetailForm.value);
        updatedOil.id = this.currentOilId!;
        updatedOil.updatedAt = new Date();

        let updatedHealth: Domain = this.formToDomain(this.currentHealthId, this.oilDetailForm.value, DomainType.health, this.currentOilId!);
        let updatedBeauty: Domain = this.formToDomain(this.currentBeautyId, this.oilDetailForm.value, DomainType.beauty, this.currentOilId!);
        let updatedWellBeing: Domain = this.formToDomain(this.currentWellBeingId, this.oilDetailForm.value, DomainType.wellBeing, this.currentOilId!);



        this.oilService.updateOilAndDomains(this.currentOilId!, Oil.fromMap(updatedOil, this.currentOilId), [updatedBeauty, updatedHealth, updatedWellBeing]).then(() => {
            alert(`${updatedOil.name} : Successfully updated`);
            this.oilService.refreshSubject.next();
            this.spinner.hide();
          }
        ).catch(error => {
          alert(`Error with saving data`);
          console.log(`Error with saving data : ${error}`);
          this.spinner.hide();
        })
      } else if (this.detailMethod == DetailsMethod.Add) {
        let newOil: Oil = this.oilDetailForm.value;
        newOil.createdAt = new Date();
        newOil.updatedAt = new Date();
        console.log(newOil);
        let newHealth: Domain = this.formToDomain(null, this.oilDetailForm.value, DomainType.health, this.currentOilId!);
        let newBeauty: Domain = this.formToDomain(null, this.oilDetailForm.value, DomainType.beauty, this.currentOilId!);
        let newWellBeing: Domain = this.formToDomain(null, this.oilDetailForm.value, DomainType.wellBeing, this.currentOilId!);

        this.oilService.createOilAndDomains(this.formToOil(newOil), [newHealth, newBeauty, newWellBeing]).then(() => {
          alert(`${newOil.name} : Successfully created`);
          this.oilService.refreshSubject.next();
          this.spinner.hide();
        }).catch(error => {
          alert(`Error with saving data`);
          console.log(`Error with saving data : ${error}`);
          this.spinner.hide();
        });
      }
    } else {
      alert('There is nothing to save');
    }
  } //TODO:: complete

  //onClick Export Button
  //onClick Button
  onClose() {
    if (confirm('Do you want to exit without saving your data ?')) {
      this.router.navigate(['oils'],);
      this.ngOnDestroy();
    }
  }

  //onClick Button
  onAddFormArrayItem(attribute: string) {
    (<FormArray>this.oilDetailForm.get(attribute)).push(
      new FormControl(name, Validators.required),
    );
  }

  //onClick Button
  onDeleteItem(i: number, attribute: string) {
    (<FormArray>this.oilDetailForm.get(attribute)).removeAt(i);
  }

  get otherNamesControls() {
    return (this.oilDetailForm.get('otherNames') as FormArray).controls;
  }

  get allergiesControls() {
    return (this.oilDetailForm.get('allergies') as FormArray).controls;
  }

  get colorControls() {
    return (this.oilDetailForm.get('color') as FormArray).controls;
  }

  get aspectControls() {
    return (this.oilDetailForm.get('aspect') as FormArray).controls;
  }

  get smellControls() {
    return (this.oilDetailForm.get('smell') as FormArray).controls;
  }


  formToOil(obj :any): Oil {
    return new Oil(
      obj.id,
      obj.name,
      obj.sciName,
      obj.otherNames,
      obj.distilledOrgan,
      obj.extractionProcess,
      obj.allergies,
      obj.color,
      obj.smell,
      obj.aspect,
      obj.createdAt,
      obj.updatedAt
    );
  }

  formToDomain(domainId : string | any, obj: any, domainType: DomainType, oilId: string): Domain {
    return new Domain(
      domainId ?? null,
      domainType,
      obj['domains'][domainType]['properties'],
      obj['domains'][domainType]['precautionOfUse'],
      obj['domains'][domainType]['areaOfUse'],
      obj['domains'][domainType]['practicalUse'],
      obj['domains'][domainType]['synergy'],
      oilId,
    )
  }

 /* formToOilDomain(): Domain[] {
    let oilDomains: Domain[] = [];
    oilDomains.push(
      new Domain(
        (this.crudService.detailMethod == DetailsMethod.Edit) ? this.currentOilDomains.filter(domain => domain.type == DomainType.beauty)[0].id : null,
        DomainType.beauty,
        this.oilDetailForm.value.domains.beauty.properties,
        this.oilDetailForm.value.domains.beauty.precautionOfUse,
        this.oilDetailForm.value.domains.beauty.areaOfUse,
        this.oilDetailForm.value.domains.beauty.practicalUse,
        this.oilDetailForm.value.domains.beauty.synergy,
        this.crudService.selectedModelID == null ? null : this.crudService.selectedModelID
      ),
      new Domain(
        (this.crudService.detailMethod == DetailsMethod.Edit) ? this.currentOilDomains.filter(domain => domain.type == DomainType.health)[0].id : null,
        DomainType.health,
        this.oilDetailForm.value.domains.health.properties,
        this.oilDetailForm.value.domains.health.precautionOfUse,
        this.oilDetailForm.value.domains.health.areaOfUse,
        this.oilDetailForm.value.domains.health.practicalUse,
        this.oilDetailForm.value.domains.health.synergy,
        this.crudService.selectedModelID == null ? null : this.crudService.selectedModelID
      ),
      new Domain(
        (this.detailMethod == DetailsMethod.Edit) ? this.currentOilDomains.filter(domain => domain.type == DomainType.wellBeing)[0].id : null,
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
  }*/
}
