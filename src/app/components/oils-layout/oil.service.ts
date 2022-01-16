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

  getDomains(): Observable<QuerySnapshot<any>> {
    return this.firestore.collection(OilPaths.oilDomains()).get();
  }

  getOilById(id: string): Observable<firebase.firestore.DocumentSnapshot<any>> {
    return this.firestore.collection(
      OilPaths.oils()).doc(`${id}`).get();
  }

  getDomainsByOilId(oilId: string): Observable<QuerySnapshot<any>> {
    return this.firestore.collection(
      OilPaths.oilDomains(), (ref) => ref.where('oilId', '==', `${oilId}`))
      .get();
  }

  async createOil(oil: Oil): Promise<firebase.firestore.DocumentReference<unknown>> {
    return await this.firestore.collection(OilPaths.oils()).add({...oil});
  }

  async createDomain(oilDomain: Domain, oilId: string): Promise<DocumentReference<any>> {
    oilDomain.oilId = oilId;
    return await this.firestore.collection(OilPaths.oilDomains()).add({...oilDomain});
  }

  async createOilAndDomains(oil: Oil, oilDomains: Domain[]): Promise<void> {
    return await this.firestore.collection(OilPaths.oils()).add({...oil}).then(addResult => {
      const oilsDomains = oilDomains.map((obj) => {
        return Object.assign({}, obj)
      });
      for (let oilDomain of oilsDomains) {
        this.createDomain(oilDomain, addResult.id)
      }
    });
  }

  async updateOilById( oilId: string, oil: Oil): Promise<void> {
    return await this.firestore.doc(OilPaths.oil(oilId)).update({...oil});
  }

  async updateDomainById(domainId: string, domain: Domain): Promise<void> {
    return await this.firestore.doc(OilPaths.oilDomain(domainId)).update({...domain});
  }

  async updateOilAndDomains(oilId: string, oil: Oil, oilDomains: Domain[]): Promise<void> {
    await this.updateOilById(oilId, oil);
    for (let oilDomain of oilDomains) {
      await this.updateDomainById(oilDomain.id!, oilDomain); //TODO:: clean
    }
  }

  async deleteOilById(id: string): Promise<void> {
    return await this.firestore.doc(OilPaths.oil(id)).delete();
  }

  async deleteDomainById(id: string): Promise<void> {
    return await this.firestore.doc(OilPaths.oilDomain(id)).delete();
  }

  async deleteOilAndDomain(id: string): Promise<void> {
    await this.deleteOilById(id);
    this.firestore.collection(
      OilPaths.oilDomains(), (ref) => ref.where('oilId', '==', `${id}`))
      .get().subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        })
      });
  }

  /*importOilsArray(oils: Array<Map<string, string>>): void {
    this.getOils().subscribe(data => {
      let oilsNames: string[] = [];
      data.forEach(oil => {
        oilsNames.push(oil.data().name)
      })
      for (let oil of oils) {
        let oilTmp: Oil = this.dataToOil(oil);
        let oilDomains: Domain[] = this.dataToOilDomain(oil);
        if (!oilsNames.includes(oilTmp.name)) {
          this.createOilAndDomains(oilTmp, oilDomains).then(data => {
          })
        }
      }

    })
    this.detailsChanged.next();

  }
  */
  /*dataToOil(data: any): Oil {
    return new Oil(
      null,
      data['name'].trim()!,
      data['sciName'].trim() ?? null,
      data['otherNames'].trim() ?? null,
      data['distilledOrgan'].trim() ?? null,
      data['extractionProcess'].trim() ?? null,
      data['allergies'].trim() ?? null,

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

  dataToOilDomain(data: any): Domain[] {
    let oilDomains: Domain[] = [];
    oilDomains.push(
      new Domain(
        null,
        DomainType.beauty,
        data['oilDomain.beauty.properties'].trim() ?? null,
        data['oilDomain.beauty.precautionOfUse'].trim() ?? null,
        data['oilDomain.beauty.areaOfUse'].trim() ?? null,
        data['oilDomain.beauty.practicalUse'].trim() ?? null,
        data['oilDomain.beauty.synergy'].trim() ?? null,
        null
      ),
      new Domain(
        null,
        DomainType.wellBeing,
        data['oilDomain.wellBeing.properties'].trim() ?? null,
        data['oilDomain.wellBeing.precautionOfUse'].trim() ?? null,
        data['oilDomain.wellBeing.areaOfUse'].trim() ?? null,
        data['oilDomain.wellBeing.practicalUse'].trim() ?? null,
        data['oilDomain.wellBeing.synergy'].trim() ?? null,
        null
      ),
      new Domain(
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
*/
  /*convertToCSV(objArray: Object, headerList: string[]) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in headerList) {
        let head = headerList[index];
        line += (array[i][head] ?? '').toString().replace(/,/g, '-').replace(/(\r\n|\n|\r)/gm, ' ') + ',';
      }
      str += line + '\r\n';
    }
    return str;
  }

  downloadCsvFile(data: any, filename: string = 'data') {
    let csvData = this.convertToCSV(data, this.headerList);

    let blob = new Blob(['\ufeff' + csvData], {type: 'text/csv;charset=utf-8;'});
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  async getOilAndDomainsToJson(): Promise<void> {
    let oilsDomains: any[] = [];

    const oilRef = collection(this.firestore.firestore, "oils");
    const oilSnap = await getDocs(oilRef);

    const oilDomainRef = collection(this.firestore.firestore, "oilsDomains");
    const oilDomainSnap = await getDocs(oilDomainRef);


    oilSnap.forEach((oil) => {
        let tmp: any;
        tmp = {
          'name': oil.data()['name'] ?? '',
          'sciName': oil.data()['sciName'] ?? '',
          'otherNames': oil.data()['otherNames'] ?? '',
          'distilledOrgan': oil.data()['distilledOrgan'] ?? '',
          'extractionProcess': oil.data()['extractionProcess'] ?? '',
          'allergies': oil.data()['allergies'] ?? '',
          'organoleptics.aspect': oil.data()['organoleptics.aspect'] ?? '',
          'organoleptics.smell': oil.data()['organoleptics.smell'] ?? '',
          'organoleptics.color': oil.data()['organoleptics.color'] ?? '',
        };
        oilDomainSnap.forEach((oilDomain) => {
          if (oilDomain.data()['oilId'] == oil.id) {
            if (oilDomain.data()['type'] == 'health') {
              Object.assign(tmp, {
                'oilDomain.health.properties': oilDomain.data()['properties'] ?? '',
                'oilDomain.health.precautionOfUse': oilDomain.data()['precautionOfUse'] ?? '',
                'oilDomain.health.areaOfUse': oilDomain.data()['areaOfUse'] ?? '',
                'oilDomain.health.practicalUse': oilDomain.data()['practicalUse'] ?? '',
                'oilDomain.health.synergy': oilDomain.data()['synergy'] ?? '',
              })
            } else if (oilDomain.data()['type'] == 'beauty') {
              Object.assign(tmp, {
                'oilDomain.beauty.properties': oilDomain.data()['properties'] ?? '',
                'oilDomain.beauty.precautionOfUse': oilDomain.data()['precautionOfUse'] ?? '',
                'oilDomain.beauty.areaOfUse': oilDomain.data()['areaOfUse'] ?? '',
                'oilDomain.beauty.practicalUse': oilDomain.data()['practicalUse'] ?? '',
                'oilDomain.beauty.synergy': oilDomain.data()['synergy'] ?? '',
              })
            } else if (oilDomain.data()['type'] == 'wellBeing') {
              Object.assign(tmp, {
                'oilDomain.wellBeing.properties': oilDomain.data()['properties'] ?? '',
                'oilDomain.wellBeing.precautionOfUse': oilDomain.data()['precautionOfUse'] ?? '',
                'oilDomain.wellBeing.areaOfUse': oilDomain.data()['areaOfUse'] ?? '',
                'oilDomain.wellBeing.practicalUse': oilDomain.data()['practicalUse'] ?? '',
                'oilDomain.wellBeing.synergy': oilDomain.data()['synergy'] ?? '',
              })
            }
          }
        });
        oilsDomains.push(tmp)
      }
    )
    this.downloadCsvFile(oilsDomains);
  }
*/

}
