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
  public currentDomains: Domain[] = [];
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
      oilId = this.currentOil?.id ?? '';
      oilName = this.currentOil!.name ?? '';
      oilSciName = this.currentOil!.sciName ?? '';

      if (this.currentOil!['otherNames']) {
        for (let name of this.currentOil!.otherNames) {
          oilOtherNames.push(
            new FormGroup({
              otherNames: new FormControl(name, Validators.required),
            })
          );
        }
      }
      oilDistilledOrgan = this.currentOil!.distilledOrgan ?? '';
      oilExtractionProcess = this.currentOil!.extractionProcess ?? '';
    }
  }


  private getData(
    oilId: string,
    oilName: string,
    oilSciName: string,
    oilOtherNames: FormArray,
    oilDistilledOrgan: string,
    oilExtractionProcess: string,
    //TODO:: complete

  ): void {
    this.oilDetailForm = new FormGroup({
      'id': new FormControl(oilId),
      'name': new FormControl(oilName),
      'sciName': new FormControl(oilSciName),
      'otherNames': oilOtherNames,
      'distilledOrgan': new FormControl(oilDistilledOrgan),
      'extractionProcess': new FormControl(oilExtractionProcess),
      //TODO:: complete
    });
  }

  ngOnDestroy(): void {
    this.oilService.isExpandedSubject.next(false);
    this.oilSubscription.unsubscribe();

  }

  ngOnInit(): void {
    this.oilService.isExpandedSubject.next(true);
    this.route.params.subscribe((params: Params) => {
      this.currentOilId = params['id'];
      this.detailMethod = params['id'] != null ? DetailsMethod.Edit : DetailsMethod.Add;
      this.initForm();
    });

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
    if (confirm('Do you want to remove this row ?')){
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
    if(this.oilDetailForm.dirty && this.oilDetailForm.touched) {
      this.spinner.show();
      if (this.detailMethod == DetailsMethod.Edit) {
        let updatedOil: Oil = this.oilDetailForm.value;
        updatedOil.id = this.currentOilId!;
        updatedOil.updatedAt = new Date();
        this.oilService.updateOilAndDomains(this.currentOilId!, updatedOil, []).then(() => {
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
        this.oilService.createOilAndDomains(newOil, []).then(() => {
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
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );
  }

  //onClick Button
  onDeleteIngredient(i: number, attribute: string) {
    (<FormArray>this.oilDetailForm.get(attribute)).removeAt(i);
  }

  get ingredientsControls() {
    return (this.oilDetailForm.get('ingredients') as FormArray).controls;
  }


  /*formToOil(): Oil {
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
  }*/

  /*formToOilDomain(): Domain[] {
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
  }*/
}
