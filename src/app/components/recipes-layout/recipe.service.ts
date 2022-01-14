import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Oil} from "../../models/oil.model";
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";
import {DomainType, OilDomain} from "../../models/domain.model";
import firebase from "firebase/compat";
import {Organoleptics} from "../../models/organoleptic.model";
import {collection, getDocs} from "@angular/fire/firestore";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import {Recipe} from "../../models/recipes.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {



  constructor(private firestore: AngularFirestore) {
  }


  getRecipes(): Observable<QuerySnapshot<any>> {
    return this.firestore.collection('recipes').get();
  }


  getRecipeById(recipeId: string): Observable<firebase.firestore.DocumentSnapshot<any>> {
    return this.firestore.collection(
      'recipes').doc(`${recipeId}`)
      .get();
  }



  async createRecipe(recipe: Recipe): Promise<firebase.firestore.DocumentReference<unknown>> {
    return await this.firestore.collection('recipes').add({...recipe});
  }



  async updateRecipeById(recipe: Recipe): Promise<void> {
    return await this.firestore.doc('recipes/' + recipe.id).update({...recipe});
  }

  async deleteRecipeById(recipeId: string): Promise<void> {
    return await this.firestore.doc('recipes/' + recipeId).delete();
  }


}
