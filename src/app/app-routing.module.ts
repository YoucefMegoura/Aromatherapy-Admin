import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CrudLayoutComponent } from './crud-layout/crud-layout.component';
import { GridLayoutComponent } from './grid-layout/grid-layout.component';
import { StatsLayoutComponent } from './stats-layout/stats-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'stats',
    component: StatsLayoutComponent,
  },
  {
    path: 'oils',
    component: CrudLayoutComponent,
  },
  //TODO:: oilID path
  {
    path: 'recipes',
    component: CrudLayoutComponent,
  },
  //TODO:: recipeID path
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
