import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CrudService} from "./crud.service";

@Component({
  selector: 'app-oils-layout',
  templateUrl: './crud-layout.component.html',
  styleUrls: ['./crud-layout.component.scss']
})
export class CrudLayoutComponent implements OnInit, OnDestroy {

  public isDetailsExpaded: boolean | undefined;
  public isDetailsExpadedSubscription: Subscription | undefined;
  constructor(private crudService : CrudService) { }


  ngOnInit(): void {
    this.isDetailsExpadedSubscription = this.crudService.isDetailsExpandedSubject.subscribe(
      (isDetailsExpaded: boolean) => {
        this.isDetailsExpaded = isDetailsExpaded;
    }
    );
  }

  ngOnDestroy(): void {
    this.isDetailsExpadedSubscription?.unsubscribe();
  }

}
