import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MovieDetailsComponent } from './movie-details/movie-details.component'

const routes: Routes = [
  { path: 'movie/:name', component: MovieDetailsComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
