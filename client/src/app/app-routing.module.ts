import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MovieDetailsComponent } from './movie-details/movie-details.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'movie/:name', component: MovieDetailsComponent },
  { path: 'movie/id/:imdbId', component: MovieDetailsComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
