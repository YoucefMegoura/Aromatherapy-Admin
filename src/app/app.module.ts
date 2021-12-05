import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderLayoutComponent } from './header-layout/header-layout.component';
import { CrudLayoutComponent } from './crud-layout/crud-layout.component';
import { GridLayoutComponent } from './grid-layout/grid-layout.component';
import { DetailLayoutComponent } from './detail-layout/detail-layout.component';
import { StatsLayoutComponent } from './stats-layout/stats-layout.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'stats', component: StatsLayoutComponent },
  { path: 'oils', component: GridLayoutComponent },
  //TODO:: oilID path
  { path: 'recipes', component: GridLayoutComponent },
  //TODO:: recipeID path
  { path: '', redirectTo: 'stats', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderLayoutComponent,
    CrudLayoutComponent,
    GridLayoutComponent,
    DetailLayoutComponent,
    StatsLayoutComponent,
    AuthComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
