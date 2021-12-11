import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public isDetailsExpanded: boolean = false;
  public isDetailsExpandedSubject = new Subject<boolean>() ;

  constructor() { }

  emiAuthSubject() : void {
    this.isDetailsExpandedSubject.next(this.isDetailsExpanded);
  }

  expandDetail() : void {
    this.isDetailsExpanded = true;
    this.emiAuthSubject();
  }

  closeDetail() : void {
    this.isDetailsExpanded = false;
    this.emiAuthSubject();
  }





}
