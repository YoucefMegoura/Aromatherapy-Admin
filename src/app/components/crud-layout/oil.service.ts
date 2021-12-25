import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Oil} from "../../models/oil.model";
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";
import {DomainType, OilDomain} from "../../models/domain.model";
import firebase from "firebase/compat";
import {Organoleptics} from "../../models/organoleptic.model";
import {collection, doc, getDoc, getDocs} from "@angular/fire/firestore";
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
  providedIn: 'root'
})
export class OilService {


  private headerList: string[] = [
    'name',
    'sciName',
    'otherNames',
    'distilledOrgan',
    'extractionProcess',
    'allergies',
    'organoleptics.aspect',
    'organoleptics.color',
    'organoleptics.smell',

    'oilDomain.health.properties',
    'oilDomain.health.precautionOfUse',
    'oilDomain.health.areaOfUse',
    'oilDomain.health.practicalUse',
    'oilDomain.health.synergy',

    'oilDomain.beauty.properties',
    'oilDomain.beauty.precautionOfUse',
    'oilDomain.beauty.areaOfUse',
    'oilDomain.beauty.practicalUse',
    'oilDomain.beauty.synergy',

    'oilDomain.wellBeing.properties',
    'oilDomain.wellBeing.precautionOfUse',
    'oilDomain.wellBeing.areaOfUse',
    'oilDomain.wellBeing.practicalUse',
    'oilDomain.wellBeing.synergy',

  ]

  constructor(private firestore: AngularFirestore) {
  }


  getOils(): Observable<QuerySnapshot<any>> {
    return this.firestore.collection('oils').get();
  }

  getDomains(): Observable<QuerySnapshot<any>> {
    return this.firestore.collection('oilsDomains').get();
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


  convertToCSV(objArray: Object, headerList: string[]) {
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

}
