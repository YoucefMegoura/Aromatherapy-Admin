import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Oil} from "../../models/oil.model";
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";
import {DomainType, OilDomain} from "../../models/domain.model";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import {Organoleptics} from "../../models/organoleptic.model";

@Injectable({
  providedIn: 'root'
})
export class OilService {

  constructor(private firestore: AngularFirestore) {
  }


  getOils(): Observable<QuerySnapshot<any>> {
    return this.firestore.collection('oils').get();
  }

  getOilById(oilId: string): Observable<firebase.firestore.DocumentSnapshot<any>> {
    return this.firestore.collection(
      'oils').doc(`${oilId}`)
      .get();
  }

  getOilDetailByID(oilId: string): Observable<QuerySnapshot<any>> {
    return this.firestore.collection(
      'oilsDomains', (ref) => ref.where('oilId', '==', `${oilId}`))
      .get();
  }

  async createOilAndDomains(oil: Oil, oilDomains: OilDomain[]): Promise<void> {
    //TODO:: rebase with await only
    //TODO:: separate creation of oil in a method
    return await this.firestore.collection('oils').add({...oil}).then(data => {
      const oilsDomains = oilDomains.map((obj) => {
        return Object.assign({}, obj)
      });
      for (let oilDomain of oilsDomains) {
        this.createOilDetail(oilDomain, data.id).then(data2 => {
          console.log(data2)
        })
      }
    });
  }

  async createOilDetail(oilDetail: OilDomain, oilId: string): Promise<DocumentReference<any>> {
    oilDetail.oilId = oilId;
    return await this.firestore.collection('oilsDomains').add(oilDetail);
  }


  async updateOilById(oil: Oil): Promise<void> {
    return await this.firestore.doc('oils/' + oil.id).update({...oil});
  }

  async updateOilDomainById(oilDomain: OilDomain): Promise<void> {
    return await this.firestore.doc('oilsDomains/' + oilDomain.id).update({...oilDomain});
  }

  async updateOilAndDomains(oil: Oil, oilDomains: OilDomain[]): Promise<void> {
    await this.updateOilById(oil);
    for (let oilDomain of oilDomains) {
      this.updateOilDomainById(oilDomain).then(data => {
        console.log(data)
      })
    }
    for (let oilDomain of oilDomains) {
      await this.updateOilDomainById(oilDomain);
    }
  }


  async deleteOilById(oil: Oil): Promise<void> {
    return await this.firestore.doc('oils/' + oil.id).delete();
  }

  async deleteOilDomainById(oilDomain: OilDomain): Promise<void> {
    return await this.firestore.doc('oilsDomains/' + oilDomain.id).delete();
  }

  async deleteOilAndDomain(oil: Oil, oilDomains: OilDomain[]): Promise<void> {
    await this.deleteOilById(oil);
    for (let oilDomain of oilDomains) {
      this.deleteOilDomainById(oilDomain).then(data => {
        console.log(data)
      })
    }
  }

  importOilsArray(oils: Array<Map<string, string>>): void {
    this.getOils().subscribe(data => {
      let oilsNames: string[] = [];
      data.forEach(oil => {
        oilsNames.push(oil.data().name)
      })
      for (let oil of oils) {
        let oilTmp: Oil = this.dataToOil(oil);
        let oilDomains: OilDomain[] = this.dataToOilDomain(oil);
        if (!oilsNames.includes(oilTmp.name)) {
          this.createOilAndDomains(oilTmp, oilDomains).then(data => {
            console.log(data)
          })
        }
      }

    })

  }

  dataToOil(data: any): Oil {
    return new Oil(
      null,
      data['name'].trim()!,
      data['sciName'].trim() ?? null,
      [data['otherNames'].trim()!] ?? null,
      data['distilledOrgan'].trim() ?? null,
      data['extractionProcess'].trim() ?? null,
      [data['allergies'].trim()!] ?? null,

      {
        ...new Organoleptics(
          data['organoleptics.aspect'].trim() ?? null,
          data['organoleptics.aspect'].trim() ?? null,
          data['organoleptics.aspect'].trim() ?? null
        )
      },
      new Date(),
      new Date()
    );
  }

  dataToOilDomain(data: any): OilDomain[] {
    let oilDomains: OilDomain[] = [];
    oilDomains.push(
      new OilDomain(
        null,
        DomainType.beauty,
        data['oilDomain.beauty.properties'].trim() ?? null,
        data['oilDomain.beauty.precautionOfUse'].trim() ?? null,
        data['oilDomain.beauty.areaOfUse'].trim() ?? null,
        data['oilDomain.beauty.practicalUse'].trim() ?? null,
        data['oilDomain.beauty.synergy'].trim() ?? null,
        null
      ),
      new OilDomain(
        null,
        DomainType.wellBeing,
        data['oilDomain.wellBeing.properties'].trim() ?? null,
        data['oilDomain.wellBeing.precautionOfUse'].trim() ?? null,
        data['oilDomain.wellBeing.areaOfUse'].trim() ?? null,
        data['oilDomain.wellBeing.practicalUse'].trim() ?? null,
        data['oilDomain.wellBeing.synergy'].trim() ?? null,
        null
      ),
      new OilDomain(
        null,
        DomainType.health,
        data['oilDomain.health.properties'] ?? null,
        data['oilDomain.health.precautionOfUse'] ?? null,
        data['oilDomain.health.areaOfUse'] ?? null,
        data['oilDomain.health.practicalUse'] ?? null,
        data['oilDomain.health.synergy'] ?? null,
        null
      ),
    );
    return oilDomains;
  }


}
