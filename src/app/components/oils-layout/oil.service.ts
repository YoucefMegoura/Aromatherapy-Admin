import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Oil} from "../../models/oil.model";
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";
import {Domain} from "../../models/domain.model";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import {OilPaths} from "./oil.paths";

@Injectable({
  providedIn: 'root'
})
export class OilService {
  public refreshSubject: Subject<any> = new Subject<any>();
  public isExpandedSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private firestore: AngularFirestore) {
  }


  getOils(): Observable<QuerySnapshot<any>> {
    return this.firestore.collection(OilPaths.oils()).get();
  }

  getOilById(id: string): Observable<firebase.firestore.DocumentSnapshot<any>> {
    return this.firestore.collection(
      OilPaths.oils()).doc(`${id}`).get();
  }

  async createOil(oil: Oil): Promise<firebase.firestore.DocumentReference<unknown>> {
    return await this.firestore.collection(OilPaths.oils()).add({...oil.toMap()});
  }


  async updateOilById( oilId: string, oil: Oil): Promise<void> {
    return await this.firestore.doc(OilPaths.oil(oilId)).update({...oil.toMap()});
  }


  async deleteOilById(id: string): Promise<void> {
    return await this.firestore.doc(OilPaths.oil(id)).delete();
  }


}
