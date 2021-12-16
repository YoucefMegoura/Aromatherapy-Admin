import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Oil} from "../../models/oil.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {DocumentChangeAction, DocumentReference} from "@angular/fire/compat/firestore/interfaces";

@Injectable({
  providedIn: 'root'
})
export class OilService {

  constructor(private firestore: AngularFirestore) { }


  getOils() : Observable<DocumentChangeAction<any>[]>{
    return this.firestore.collection('oils').snapshotChanges();
  }

  async createOil(oil: Oil): Promise<DocumentReference<any>>{
    return await this.firestore.collection('oils').add(oil);
  }


  async updateOil(oil: Oil): Promise<void>{
    delete oil.id;
    return await this.firestore.doc('oils/' + oil.id).update(oil);
  }

  async deleteOil(oilId: string) : Promise<void>{
    return await this.firestore.doc('oils/' + oilId).delete();
  }

}
