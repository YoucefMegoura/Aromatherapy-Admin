import { Component, OnInit } from '@angular/core';
import packageInfo from '../../../../package.json';


@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {
  public appVersion: string = packageInfo.version;

  constructor() { }

  ngOnInit(): void {
  }

}
