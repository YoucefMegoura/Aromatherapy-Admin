import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderLayoutComponent} from './components/header-layout/header-layout.component';
import {OilsCrudLayoutComponent} from './components/oils-layout/oils-crud-layout.component';
import {OilsGridLayoutComponent} from './components/oils-layout/oils-grid-layout/oils-grid-layout.component';
import {OilsDetailLayoutComponent} from './components/oils-layout/oils-detail-layout/oils-detail-layout.component';
import {StatsLayoutComponent} from './components/stats-layout/stats-layout.component';
import {SigninComponent} from './auth/signin.component';
import {AgGridModule} from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownDirective} from './shared/dropdown.directive';
import {environment} from '../environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {ModalComponent} from './shared/modal/modal.component';
import {ImportJsonModalComponent} from './shared/import-csv-modal/import-json-modal.component';
import {RecipesCrudLayoutComponent} from "./components/recipes-layout/recipes-crud-layout.component";
import {
  RecipesGridLayoutComponent
} from "./components/recipes-layout/recipes-grid-layout/recipes-grid-layout.component";
import {
  RecipesDetailLayoutComponent
} from "./components/recipes-layout/recipes-detail-layout/recipes-detail-layout.component";
import {NgxSpinnerModule} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./auth/auth.service";
import { MobileComponent } from './components/mobile/mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderLayoutComponent,
    OilsCrudLayoutComponent,
    OilsGridLayoutComponent,
    OilsDetailLayoutComponent,

    RecipesCrudLayoutComponent,
    RecipesGridLayoutComponent,
    RecipesDetailLayoutComponent,


    StatsLayoutComponent,
    SigninComponent,
    DropdownDirective,
    ModalComponent,
    ImportJsonModalComponent,
    MobileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule.withComponents([]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
