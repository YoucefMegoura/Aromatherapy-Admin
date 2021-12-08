import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderLayoutComponent } from './header-layout/header-layout.component';
import { CrudLayoutComponent } from './crud-layout/crud-layout.component';
import { GridLayoutComponent } from './grid-layout/grid-layout.component';
import { DetailLayoutComponent } from './detail-layout/detail-layout.component';
import { StatsLayoutComponent } from './stats-layout/stats-layout.component';
import { AuthComponent } from './auth/auth.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderLayoutComponent,
    CrudLayoutComponent,
    GridLayoutComponent,
    DetailLayoutComponent,
    StatsLayoutComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    AppRoutingModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
