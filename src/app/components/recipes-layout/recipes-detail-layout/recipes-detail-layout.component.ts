import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from "../recipe.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../../../models/recipes.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

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

  private detailMethod : DetailsMethod = DetailsMethod.Add;
  private currentRecipeId : string | undefined;

  public recipeDetailForm!: FormGroup;
  public currentRecipe: Recipe | undefined;

  private recipeSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentRecipeId = params['id'];
      this.detailMethod  = params['id'] != null ? DetailsMethod.Edit : DetailsMethod.Add;
      this.initForm();
    });
  }

  private initForm() {
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
        this.recipeDetailForm = new FormGroup({
          'recipeId': new FormControl(recipeId),
          'name': new FormControl(recipeName),
          'reference': new FormControl(recipeReference),
          'description': new FormControl(recipeDescription),
          'notes': new FormControl(recipeNotes),
          'usage': new FormControl(recipeUsage),
          'ingredients': recipeIngredients,
        });
        return;
      }, error => {
        console.log(error)
      });


    }
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


  get ingredientsControls() {
    return (this.recipeDetailForm.get('ingredients') as FormArray).controls;
  }


  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }


  //onClick Export Button
  onAdd(): void {
    if (this.detailMethod == DetailsMethod.Add) {
      let recipe: Recipe = this.recipeDetailForm.value;
      console.log(recipe);
      this.recipeService.createRecipe(recipe).then((data) => {
        console.log(data);
      }, (error => {
        console.log(error);
      }))
    }

  }

  //onClick Button
  onDelete(): void {
    if (this.detailMethod == DetailsMethod.Edit) {
      const currentRecipe: string = this.currentRecipeId!;
      this.recipeService.deleteRecipeById(currentRecipe).then(r => {
          console.log(r)
          //TODO:: dialog to confirm
          this.router.navigate(['recipes']);
        }
      ).catch(error => {
        console.log(error)
      })
    } else if (this.detailMethod == DetailsMethod.Add) {
      this.recipeDetailForm.reset();
    }

  }

  //onClick Export Button
  onSave(): void {
    if (this.detailMethod == DetailsMethod.Edit) {
      let updatedRecipe: Recipe = this.recipeDetailForm.value;
      updatedRecipe.id = this.currentRecipeId!;
      updatedRecipe.updatedAt = new Date();
      this.recipeService.updateRecipeById(updatedRecipe).then(() =>
        console.log('Successfully updated')
      ).catch(error => {
        console.log(error);
      })
    } else if (this.detailMethod == DetailsMethod.Add) {
      let newRecipe: Recipe = this.recipeDetailForm.value;
      newRecipe.createdAt = new Date();
      newRecipe.updatedAt = new Date();
      console.log(newRecipe);
      this.recipeService.createRecipe(newRecipe).then(() => {
        console.log('Successfully created');
      }).catch(error => {
        console.log(error);
      });
    }
  }

  //onClick Export Button
  onClose() {
    this.router.navigate(['recipes'],);
    this.ngOnDestroy();
  }

  onAddIngredient() {
    (<FormArray>this.recipeDetailForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteIngredient(i: number) {
    (<FormArray>this.recipeDetailForm.get('ingredients')).removeAt(i);

  }
}
