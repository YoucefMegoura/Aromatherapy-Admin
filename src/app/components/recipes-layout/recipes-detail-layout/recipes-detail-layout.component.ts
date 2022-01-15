import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from "../recipe.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../../../models/recipes.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

export enum DetailsMethod {//TODO:: find a other name
  Add = 'add',
  Edit = 'edit'
}

@Component({
  selector: 'app-recipes-detail-layout',
  templateUrl: './recipes-detail-layout.component.html',
  styleUrls: ['./recipes-detail-layout.component.scss']
})

export class RecipesDetailLayoutComponent implements OnInit, OnDestroy {

  private detailMethod: DetailsMethod = DetailsMethod.Add;
  private currentRecipeId: string | undefined;

  public recipeDetailForm!: FormGroup;
  public currentRecipe: Recipe | undefined;

  private recipeSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private spinner: NgxSpinnerService,
  ) {
  }

  private initForm() {
    this.spinner.show();
    let recipeId = '';
    let recipeName = '';
    let recipeReference = '';
    let recipeDescription = '';
    let recipeNotes = '';
    let recipeUsage = '';
    let recipeIngredients = new FormArray([]);

    if (this.detailMethod == DetailsMethod.Edit) {
      let idRecipe = this.currentRecipeId;
      this.recipeSubscription = this.recipeService.getRecipeById(idRecipe!).subscribe(data => {
        this.currentRecipe = data.data();
        this.currentRecipe!.id = data.id;


        recipeId = this.currentRecipe?.id ?? '';
        recipeName = this.currentRecipe!.name ?? '';
        recipeReference = this.currentRecipe!.reference ?? '';
        recipeDescription = this.currentRecipe!.description ?? '';
        recipeNotes = this.currentRecipe!.notes ?? '';
        recipeUsage = this.currentRecipe!.usage ?? '';

        if (this.currentRecipe!['ingredients']) {
          for (let ingredient of this.currentRecipe!.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
              })
            );
          }
        }
        this.getData(recipeId, recipeName, recipeReference, recipeDescription, recipeNotes, recipeUsage, recipeIngredients);
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log(error)
      });
      this.getData(recipeId, recipeName, recipeReference, recipeDescription, recipeNotes, recipeUsage, recipeIngredients);
    } else if (this.detailMethod == DetailsMethod.Add) {
      this.getData(recipeId, recipeName, recipeReference, recipeDescription, recipeNotes, recipeUsage, recipeIngredients);
      this.spinner.hide();
    }

  }

  private getData(recipeId: string, recipeName: string, recipeReference: string, recipeDescription: string, recipeNotes: string, recipeUsage: string, recipeIngredients: FormArray): void {
    this.recipeDetailForm = new FormGroup({
      'recipeId': new FormControl(recipeId),
      'name': new FormControl(recipeName),
      'reference': new FormControl(recipeReference),
      'description': new FormControl(recipeDescription),
      'notes': new FormControl(recipeNotes),
      'usage': new FormControl(recipeUsage),
      'ingredients': recipeIngredients,
    });
  }

  ngOnInit(): void {
    this.recipeService.isExpandedSubject.next(true);
    this.route.params.subscribe((params: Params) => {
      this.currentRecipeId = params['id'];
      this.detailMethod = params['id'] != null ? DetailsMethod.Edit : DetailsMethod.Add;
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    this.recipeService.isExpandedSubject.next(false);
    this.recipeSubscription.unsubscribe();
  }

  //onClick Button
  onAdd(): void {
    if (this.detailMethod == DetailsMethod.Add) {

    } else if (this.detailMethod == DetailsMethod.Edit) {
      this.recipeDetailForm.reset()
      this.detailMethod = DetailsMethod.Add;
    }
  }

  //onClick Button
  onDelete(): void {
    if (confirm('Do you want to remove this row ?')){
      this.spinner.show();
      if (this.detailMethod == DetailsMethod.Edit) {
        const currentRecipeId: string = this.currentRecipeId!;
        this.recipeService.deleteRecipeById(currentRecipeId).then(r => {
            console.log(r)
            //TODO:: dialog to confirm
            this.recipeService.refreshSubject.next(currentRecipeId);

            this.router.navigate(['recipes']);
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
        this.recipeDetailForm.reset();
        this.spinner.hide();
      }
    }


  }

  //onClick Button
  onSave(): void {
    if(this.recipeDetailForm.dirty && this.recipeDetailForm.touched) {
      this.spinner.show();
      if (this.detailMethod == DetailsMethod.Edit) {
        let updatedRecipe: Recipe = this.recipeDetailForm.value;
        updatedRecipe.id = this.currentRecipeId!;
        updatedRecipe.updatedAt = new Date();
        this.recipeService.updateRecipeById(this.currentRecipeId!, updatedRecipe).then(() => {
          alert(`${updatedRecipe.name} : Successfully updated`);
          this.recipeService.refreshSubject.next();
            this.spinner.hide();
          }
        ).catch(error => {
          alert(`Error with saving data`);
          console.log(`Error with saving data : ${error}`);
          this.spinner.hide();
        })
      } else if (this.detailMethod == DetailsMethod.Add) {
        let newRecipe: Recipe = this.recipeDetailForm.value;
        newRecipe.createdAt = new Date();
        newRecipe.updatedAt = new Date();
        console.log(newRecipe);
        this.recipeService.createRecipe(newRecipe).then(() => {
          alert(`${newRecipe.name} : Successfully created`);
          this.recipeService.refreshSubject.next();
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

  }

  //onClick Button
  onClose() {
    if (confirm('Do you want to exit without saving your data ?')) {
      this.router.navigate(['recipes'],);
      this.ngOnDestroy();
    }
  }

  //onClick Button
  onAddIngredient() {
    (<FormArray>this.recipeDetailForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );
  }

  //onClick Button
  onDeleteIngredient(i: number) {
    (<FormArray>this.recipeDetailForm.get('ingredients')).removeAt(i);
  }

  get ingredientsControls() {
    return (this.recipeDetailForm.get('ingredients') as FormArray).controls;
  }
}
