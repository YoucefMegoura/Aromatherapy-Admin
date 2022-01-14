import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import {Recipe} from "../../models/recipes.model";
import {RecipePaths} from "./recipe.paths";

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


  getRecipeById(recipeId: string): Observable<firebase.firestore.DocumentSnapshot<any>> {
    return this.firestore.collection(
      RecipePaths.recipes()).doc(`${recipeId}`)
      .get();
  }


  async createRecipe(recipe: Recipe): Promise<firebase.firestore.DocumentReference<unknown>> {
    return await this.firestore.collection(RecipePaths.recipes()).add({...recipe});
  }


  async updateRecipeById(recipeId: string, recipe: Recipe): Promise<void> {
    return await this.firestore.doc(RecipePaths.recipe(recipeId)).update({...recipe});
  }

  async deleteRecipeById(recipeId: string): Promise<void> {
    return await this.firestore.doc(RecipePaths.recipe(recipeId)).delete();
  }


}
