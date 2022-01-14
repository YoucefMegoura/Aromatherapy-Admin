import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderLayoutComponent} from './components/header-layout/header-layout.component';
import {CrudLayoutComponent} from './components/oils-layout/crud-layout.component';
import {GridLayoutComponent} from './components/oils-layout/grid-layout/grid-layout.component';
import {DetailLayoutComponent} from './components/oils-layout/detail-layout/detail-layout.component';
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
import {ImportCsvModalComponent} from './shared/import-csv-modal/import-csv-modal.component';
import {NgxCsvParserModule} from "ngx-csv-parser";
import {RecipesCrudLayoutComponent} from "./components/recipes-layout/recipes-crud-layout.component";
import {
  RecipesGridLayoutComponent
} from "./components/recipes-layout/recipes-grid-layout/recipes-grid-layout.component";
import {
  RecipesDetailLayoutComponent
} from "./components/recipes-layout/recipes-detail-layout/recipes-detail-layout.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderLayoutComponent,
    CrudLayoutComponent,
    GridLayoutComponent,
    DetailLayoutComponent,

    RecipesCrudLayoutComponent,
    RecipesGridLayoutComponent,
    RecipesDetailLayoutComponent,


    StatsLayoutComponent,
    SigninComponent,
    DropdownDirective,
    ModalComponent,
    ImportCsvModalComponent,
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
    NgxCsvParserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
