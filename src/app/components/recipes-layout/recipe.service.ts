import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import {RecipePaths} from "./recipe.paths";
import {Recipe} from "../../models/recipe/recipes.model";
import {Functions} from "../../utils/functions";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public refreshSubject: Subject<any> = new Subject<any>();
  public isExpandedSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private firestore: AngularFirestore) {
  }


  getRecipes(): Observable<QuerySnapshot<any>> {
    return this.firestore.collection(RecipePaths.recipes()).get();
  }


  getRecipeById(id: string): Observable<firebase.firestore.DocumentSnapshot<any>> {
    return this.firestore.collection(
      RecipePaths.recipes()).doc(`${id}`)
      .get();
  }


  async createRecipe(recipe: Recipe): Promise<firebase.firestore.DocumentReference<unknown>> {
    recipe.createdAt = new Date();
    recipe.updatedAt = new Date();
    return await this.firestore.collection(RecipePaths.recipes()).add({...recipe.toMap()});
  }


  async updateRecipeById(id: string, recipe: Recipe): Promise<void> {
    recipe.updatedAt = new Date();
    return await this.firestore.doc(RecipePaths.recipe(id)).update({...recipe.toMap()});
  }

  async deleteRecipeById(id: string): Promise<void> {
    return await this.firestore.doc(RecipePaths.recipe(id)).delete();
  }

  exportData(recipesList: Recipe[]): void {
    let recipesModelList: Object[] = [];
    recipesList.forEach((data: Recipe) => {
      let recipe: Recipe = this.formToRecipe(data);
      recipesModelList.push(recipe.toExport());
    });

    Functions.exportJsonFile(recipesModelList, 'recipes');
  }

  async importData(recipes: Recipe[]): Promise<void> {
    let recipesName: string[] = [];
    let importedLineCounter: number = 0;
    this.getRecipes().subscribe(async (recipesSnapshot) => {
      recipesSnapshot.forEach((recipeData: any) => {
        const recipe: Recipe = Recipe.fromMap(recipeData.data());
        recipesName.push(recipe.name);
      });
      for (let recipe of recipes) {
        let recipeTmp: Recipe = Recipe.fromMap(recipe);
        if (!recipesName.includes(recipeTmp.name)) {
          await this.createRecipe(recipeTmp).then(() => {
            importedLineCounter++;
          });
        }
      }
      alert(`${importedLineCounter} : Recipes successfully imported.`)
    });

  }

  formToRecipe(obj: any): Recipe {
    return new Recipe(
      null,
      obj['name'],
      obj['reference'],
      obj['ingredients'],
      obj['description'],
      obj['notes'],
      obj['usage'],
      obj['createdAt'],
      obj['updatedAt'],
    );
  }

}
