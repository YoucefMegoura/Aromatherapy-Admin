import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './auth/auth-guard.service';
import {SigninComponent} from './auth/signin.component';
import {CrudLayoutComponent} from './components/oils-layout/crud-layout.component';
import {StatsLayoutComponent} from './components/stats-layout/stats-layout.component';
import {RecipesCrudLayoutComponent} from "./components/recipes-layout/recipes-crud-layout.component";
import {
  RecipesDetailLayoutComponent
} from "./components/recipes-layout/recipes-detail-layout/recipes-detail-layout.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'stats', //TODO :: stats
  },
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
    children: [
      {path: 'edit/:id', component: RecipesDetailLayoutComponent, pathMatch: 'full',},
      {path: 'new', component: RecipesDetailLayoutComponent, pathMatch: 'full',},
    ]
  },
  {
    path: 'auth',
    component: SigninComponent,
  },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
