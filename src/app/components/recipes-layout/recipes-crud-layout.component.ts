import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-oils-layout',
  templateUrl: './recipes-crud-layout.component.html',
  styleUrls: ['./recipes-crud-layout.component.scss']
})
export class RecipesCrudLayoutComponent implements OnInit, OnDestroy {

  public isDetailsExpaded: boolean | undefined;
  public isDetailsExpadedSubscription: Subscription | undefined;
  constructor() { }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.isDetailsExpadedSubscription?.unsubscribe();
  }

}
