import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {RecipesCrudService} from "./recipes-crud.service";

@Component({
  selector: 'app-oils-layout',
  templateUrl: './recipes-crud-layout.component.html',
  styleUrls: ['./recipes-crud-layout.component.scss']
})
export class RecipesCrudLayoutComponent implements OnInit, OnDestroy {

  public isDetailsExpaded: boolean | undefined;
  public isDetailsExpadedSubscription: Subscription | undefined;
  constructor(private crudService : RecipesCrudService) { }


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
