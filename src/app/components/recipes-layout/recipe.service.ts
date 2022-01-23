import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import {RecipePaths} from "./recipe.paths";
import {Recipe} from "../../models/recipe/recipes.model";

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

  async importData(recipes: Recipe[]): Promise<void> {
    let recipesName: string[] = [];
    let importedLineCounter: number = 0;
    this.getRecipes().subscribe(data => {
      data.forEach((data: any) => {
        const recipe: Recipe = Recipe.fromMap(data.data());
        recipesName.push(recipe.name);
      });
      for (let recipe of recipes) {
        let recipeTmp: Recipe = Recipe.fromMap(recipe);
        if (!recipesName.includes(recipeTmp.name)) {
          importedLineCounter++;
          this.createRecipe(recipeTmp).then(() => {
            alert(`${importedLineCounter} : Recipes successfully imported.`)
          });
        }
      }
    });

  }

}
