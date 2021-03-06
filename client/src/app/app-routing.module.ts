import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MovieDetailsComponent } from './movie-details/movie-details.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { VotingResultComponent } from './voting-result/voting-result.component';
import { HelpComponent } from './help/help.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: MainComponent },
  { path: 'login/:roomId', component: MainComponent },
  { path: 'help', component: HelpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'overview/:roomId', component: OverviewComponent },
  { path: 'movie/:name', component: MovieDetailsComponent },
  { path: 'movie/id/:imdbId', component: MovieDetailsComponent },
  { path: 'votingresult', component: VotingResultComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
