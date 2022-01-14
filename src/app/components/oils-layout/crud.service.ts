import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DetailsMethod} from "./detail-layout/detail-layout.component";

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  public detailMethod: DetailsMethod | undefined;
  public selectedModelID: string | undefined;
  public isDetailsExpanded: boolean = false;
  public isDetailsExpandedSubject = new Subject<boolean>();

  constructor() {
  }

  emiDetailsExpandedSubject(): void {
    this.isDetailsExpandedSubject.next(this.isDetailsExpanded);
  }

  expandDetailAdding(): void {
    this.detailMethod = DetailsMethod.Add;
    this.isDetailsExpanded = true;
    this.emiDetailsExpandedSubject();
  }

  expandDetailEdition(selectedModelID: string): void {
    this.detailMethod = DetailsMethod.Edit;
    this.selectedModelID = selectedModelID;
    this.isDetailsExpanded = true;
    this.emiDetailsExpandedSubject();
  }



  closeDetail(): void {
    //TODO:: gridApi.deselectAll()
    this.isDetailsExpanded = false;
    this.emiDetailsExpandedSubject();
  }


}
