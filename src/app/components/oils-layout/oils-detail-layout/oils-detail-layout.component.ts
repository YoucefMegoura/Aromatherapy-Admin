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

  public currentOil: Oil | undefined;

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

    let healthProperties = '';
    let healthPrecautionOfUse = '';
    let healthAreaOfUse = '';
    let healthPracticalUse = '';
    let healthSynergy = '';

    let beautyProperties = '';
    let beautyPrecautionOfUse = '';
    let beautyAreaOfUse = '';
    let beautyPracticalUse = '';
    let beautySynergy = '';

    let wellBeingProperties = '';
    let wellBeingPrecautionOfUse = '';
    let wellBeingAreaOfUse = '';
    let wellBeingPracticalUse = '';
    let wellBeingSynergy = '';


    if (this.detailMethod == DetailsMethod.Edit) {
      if (this.currentOilId == null)
        return;

      let currentOilId: string = this.currentOilId!;

      this.oilService.getOilById(currentOilId).subscribe( (oilData) => {
        this.currentOil = Oil.fromMap(oilData.data());
        if (this.currentOil == null)
          return;

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
            oilAllergies.push(
              new FormControl(name, Validators.required),
            );
          }
        }

        if (this.currentOil?.color) {
          for (let name of this.currentOil.color) {
            oilColor.push(
              new FormControl(name, Validators.required),
            );
          }
        }

        if (this.currentOil?.smell) {
          for (let name of this.currentOil.smell) {
            oilSmell.push(
              new FormControl(name, Validators.required),
            );
          }
        }

        if (this.currentOil?.aspect) {
          for (let name of this.currentOil.aspect) {
            oilAspect.push(
              new FormControl(name, Validators.required),
            );
          }
        }
        beautyProperties = this.currentOil.beauty?.properties!;
        beautyPrecautionOfUse = this.currentOil.beauty?.precautionOfUse!;
        beautyAreaOfUse = this.currentOil.beauty?.areaOfUse!;
        beautyPracticalUse = this.currentOil.beauty?.practicalUse!;
        beautySynergy = this.currentOil.beauty?.synergy!;

        healthProperties = this.currentOil.beauty?.properties!;
        healthPrecautionOfUse = this.currentOil.beauty?.precautionOfUse!;
        healthAreaOfUse = this.currentOil.beauty?.areaOfUse!;
        healthPracticalUse = this.currentOil.beauty?.practicalUse!;
        healthSynergy = this.currentOil.beauty?.synergy!;

        wellBeingProperties = this.currentOil.beauty?.properties!;
        wellBeingPrecautionOfUse = this.currentOil.beauty?.precautionOfUse!;
        wellBeingAreaOfUse = this.currentOil.beauty?.areaOfUse!;
        wellBeingPracticalUse = this.currentOil.beauty?.practicalUse!;
        wellBeingSynergy = this.currentOil.beauty?.synergy!;


        this.getData(
          oilId, oilName, oilSciName, oilOtherNames, oilDistilledOrgan,
          oilExtractionProcess, oilAllergies, oilColor, oilSmell, oilAspect,
          healthProperties, healthPrecautionOfUse, healthAreaOfUse, healthPracticalUse, healthSynergy,
          beautyProperties, beautyPrecautionOfUse, beautyAreaOfUse, beautyPracticalUse, beautySynergy,
          wellBeingProperties, wellBeingPrecautionOfUse, wellBeingAreaOfUse, wellBeingPracticalUse, wellBeingSynergy
        );
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log(error)
      });
      this.getData(
        oilId, oilName, oilSciName, oilOtherNames, oilDistilledOrgan,
        oilExtractionProcess, oilAllergies, oilColor, oilSmell, oilAspect,
        healthProperties, healthPrecautionOfUse, healthAreaOfUse, healthPracticalUse, healthSynergy,
        beautyProperties, beautyPrecautionOfUse, beautyAreaOfUse, beautyPracticalUse, beautySynergy,
        wellBeingProperties, wellBeingPrecautionOfUse, wellBeingAreaOfUse, wellBeingPracticalUse, wellBeingSynergy
      );
    } else if (this.detailMethod == DetailsMethod.Add) {
      this.getData(
        oilId, oilName, oilSciName, oilOtherNames, oilDistilledOrgan,
        oilExtractionProcess, oilAllergies, oilColor, oilSmell, oilAspect,
        healthProperties, healthPrecautionOfUse, healthAreaOfUse, healthPracticalUse, healthSynergy,
        beautyProperties, beautyPrecautionOfUse, beautyAreaOfUse, beautyPracticalUse, beautySynergy,
        wellBeingProperties, wellBeingPrecautionOfUse, wellBeingAreaOfUse, wellBeingPracticalUse, wellBeingSynergy
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
    healthProperties: string,
    healthPrecautionOfUse: string,
    healthAreaOfUse: string,
    healthPracticalUse: string,
    healthSynergy: string,
    beautyProperties: string,
    beautyPrecautionOfUse: string,
    beautyAreaOfUse: string,
    beautyPracticalUse: string,
    beautySynergy: string,
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

      'domains': new FormGroup({
        'health': new FormGroup({
          'properties': new FormControl(healthProperties),
          'precautionOfUse': new FormControl(healthPrecautionOfUse),
          'areaOfUse': new FormControl(healthAreaOfUse),
          'practicalUse': new FormControl(healthPracticalUse),
          'synergy': new FormControl(healthSynergy),

        }),
        'beauty': new FormGroup({
          'properties': new FormControl(beautyProperties),
          'precautionOfUse': new FormControl(beautyPrecautionOfUse),
          'areaOfUse': new FormControl(beautyAreaOfUse),
          'practicalUse': new FormControl(beautyPracticalUse),
          'synergy': new FormControl(beautySynergy),

        }),
        'wellBeing': new FormGroup({
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


  //onClick Button
  onAdd(): void {
    if (this.detailMethod == DetailsMethod.Add) {

    } else if (this.detailMethod == DetailsMethod.Edit) {
      this.oilDetailForm.reset()
      this.detailMethod = DetailsMethod.Add;
    }
  }

  //onClick Button
  onDelete(): void {
    if (confirm('Do you want to remove this row ?')) {
      this.spinner.show();
      if (this.detailMethod == DetailsMethod.Edit) {
        const currentOilId: string = this.currentOilId!;
        this.oilService.deleteOilById(currentOilId).then(() => {
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
        updatedOil.updatedAt = new Date();
        updatedOil.createdAt = this.currentOil?.createdAt!;
        this.oilService.updateOilById(this.currentOilId!, updatedOil).then(() => {
            alert(`${updatedOil.name} : Successfully updated`);
            this.spinner.hide();
            this.oilService.refreshSubject.next();
          }
        ).catch(error => {
          alert(`Error with saving data`);
          console.log(`Error with saving data : ${error}`);
          this.spinner.hide();
        })
      } else if (this.detailMethod == DetailsMethod.Add) {
        let newOil: Oil = this.formToOil(this.oilDetailForm.value);
        newOil.createdAt = new Date();
        newOil.updatedAt = new Date();
        this.oilService.createOil(newOil).then((data) => {
          this.router.navigate([`/oils/edit/${data.id}`]);
          alert(`${newOil.name} : Successfully created`);
          this.spinner.hide();
          this.oilService.refreshSubject.next();
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


  formToOil(obj: any): Oil {
    return new Oil(
      obj['name'],
      obj['sciName'],
      obj['otherNames'],
      obj['distilledOrgan'],
      obj['extractionProcess'],
      obj['allergies'],
      obj['color'],
      obj['smell'],
      obj['aspect'],
      obj['createdAt'],
      obj['updatedAt'],

      new Domain(
        obj['domains']['health']['properties'] ?? '',
        obj['domains']['health']['precautionOfUse'] ?? '',
        obj['domains']['health']['areaOfUse'] ?? '',
        obj['domains']['health']['practicalUse'] ?? '',
        obj['domains']['health']['synergy'] ?? ''
      ),
      new Domain(
        obj['domains']['beauty']['properties'] ?? '',
        obj['domains']['beauty']['precautionOfUse'] ?? '',
        obj['domains']['beauty']['areaOfUse'] ?? '',
        obj['domains']['beauty']['practicalUse'] ?? '',
        obj['domains']['beauty']['synergy'] ?? ''
      ),
      new Domain(
        obj['domains']['wellBeing']['properties'] ?? '',
        obj['domains']['wellBeing']['precautionOfUse'] ?? '',
        obj['domains']['wellBeing']['areaOfUse'] ?? '',
        obj['domains']['wellBeing']['practicalUse'] ?? '',
        obj['domains']['wellBeing']['synergy'] ?? ''
      ),
    );
  }
}
