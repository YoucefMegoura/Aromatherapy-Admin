import { Component, OnInit } from '@angular/core';
import packageInfo from '../../../../package.json';


@Component({
  selector: 'app-mobile-layout',
  templateUrl: './mobile-layout.component.html',
  styleUrls: ['./mobile-layout.component.scss']
})
export class MobileLayoutComponent implements OnInit {
  public appVersion: string = packageInfo.version;

  constructor() { }

  ngOnInit(): void {
  }

}
