import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Oil} from "../../models/oil/oil.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Domain} from "../../models/oil/domain.model";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import {OilPaths} from "./oil.paths";
import {Functions} from "../../utils/functions";
import {Recipe} from "../../models/recipe/recipes.model";

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
    oil.createdAt = new Date();
    oil.updatedAt = new Date();
    return await this.firestore.collection(OilPaths.oils()).add({...oil.toMap()});
  }


  async updateOilById( oilId: string, oil: Oil): Promise<void> {
    oil.updatedAt = new Date();
    return await this.firestore.doc(OilPaths.oil(oilId)).update({...oil.toMap()});
  }


  async deleteOilById(id: string): Promise<void> {
    return await this.firestore.doc(OilPaths.oil(id)).delete();
  }

  exportData(oilList: Oil[]): void {
    let oilModelList: Object[] = [];
    oilList.forEach((data: Oil) => {
      let oil: Oil = this.formToOil(data);
      oilModelList.push(oil.toExport());
    });
    Functions.exportJsonFile(oilModelList, 'oils');
  }

  async importData(oils: Oil[]): Promise<void> {
    let oilsName: string[] = [];
    let importedLineCounter: number = 0;
    this.getOils().subscribe(async (oilsSnapshot) => {
      oilsSnapshot.forEach((oilData: any) => {
        const oil: Oil = Oil.fromMap(oilData.data());
        oilsName.push(oil.name);
      });
      for (let oil of oils) {
        let oilTmp: Oil = Oil.fromMap(oil);
        if (!oilsName.includes(oilTmp.name)) {
          await this.createOil(oilTmp).then(() => {
            importedLineCounter++;
          });
        }
      }
      alert(`${importedLineCounter} : Oils successfully imported.`)
    });

  }

  formToOil(obj: any): Oil {
    return new Oil(
      null,
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
        obj['health'] == null || obj['health']['properties'] == null ? '' : obj['health']['properties'],
        obj['health'] == null || obj['health']['precautionOfUse'] == null ? '' : obj['health']['precautionOfUse'],
        obj['health'] == null || obj['health']['areaOfUse'] == null ? '' : obj['health']['areaOfUse'],
        obj['health'] == null || obj['health']['practicalUse'] == null ? '' : obj['health']['practicalUse'],
        obj['health'] == null || obj['health']['synergy'] == null ? '' : obj['health']['synergy'],
      ),
      new Domain(
        obj['beauty'] == null || obj['beauty']['properties'] == null ? '' : obj['beauty']['properties'],
        obj['beauty'] == null || obj['beauty']['precautionOfUse'] == null ? '' : obj['beauty']['precautionOfUse'],
        obj['beauty'] == null || obj['beauty']['areaOfUse'] == null ? '' : obj['beauty']['areaOfUse'],
        obj['beauty'] == null || obj['beauty']['practicalUse'] == null ? '' : obj['beauty']['practicalUse'],
        obj['beauty'] == null || obj['beauty']['synergy'] == null ? '' : obj['beauty']['synergy'],
      ),
      new Domain(
        obj['wellBeing'] == null || obj['wellBeing']['properties'] == null ? '' : obj['wellBeing']['properties'],
        obj['wellBeing'] == null || obj['wellBeing']['precautionOfUse'] == null ? '' : obj['wellBeing']['precautionOfUse'],
        obj['wellBeing'] == null || obj['wellBeing']['areaOfUse'] == null ? '' : obj['wellBeing']['areaOfUse'],
        obj['wellBeing'] == null || obj['wellBeing']['practicalUse'] == null ? '' : obj['wellBeing']['practicalUse'],
        obj['wellBeing'] == null || obj['wellBeing']['synergy'] == null ? '' : obj['wellBeing']['synergy'],
      ),
    );
  }


}
