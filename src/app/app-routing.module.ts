import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MovieDetailsComponent } from './movie-details/movie-details.component'
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'movie/:name', component: MovieDetailsComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
