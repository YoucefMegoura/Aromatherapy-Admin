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


  getRecipeById(id: string): Observable<firebase.firestore.DocumentSnapshot<any>> {
    return this.firestore.collection(
      RecipePaths.recipes()).doc(`${id}`)
      .get();
  }


  async createRecipe(recipe: Recipe): Promise<firebase.firestore.DocumentReference<unknown>> {
    return await this.firestore.collection(RecipePaths.recipes()).add({...recipe});
  }


  async updateRecipeById(id: string, recipe: Recipe): Promise<void> {
    return await this.firestore.doc(RecipePaths.recipe(id)).update({...recipe});
  }

  async deleteRecipeById(id: string): Promise<void> {
    return await this.firestore.doc(RecipePaths.recipe(id)).delete();
  }

}
