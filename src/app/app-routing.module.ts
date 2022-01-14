import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { SigninComponent } from './auth/signin.component';
import { CrudLayoutComponent } from './components/oils-layout/crud-layout.component';
import { StatsLayoutComponent } from './components/stats-layout/stats-layout.component';
import {RecipesCrudLayoutComponent} from "./components/recipes-layout/recipes-crud-layout.component";

const routes: Routes = [

  {
    path: 'stats',
    canActivate: [AuthGuardService],
    component: StatsLayoutComponent,
  },
  {
    path: 'oils',
    canActivate: [AuthGuardService],
    component: CrudLayoutComponent,
  },
  //TODO:: oilID path
  {
    path: 'recipes',
    canActivate: [AuthGuardService],
    component: RecipesCrudLayoutComponent,
  },
  //TODO:: recipeID path

  {
    path: 'auth',
    component: SigninComponent,
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'oils', //TODO :: stats
  },
  {
    path: '**',
    component: StatsLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
