import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieService } from './services/movie.service';
import { OmdbService } from "./services/omdb.service";
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { MainComponent } from './main/main.component';
import { AuthenticationService } from './services/authentication.service';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import { VoteService } from './services/vote.service';


@NgModule({
  declarations: [
    AppComponent,
    MovieDetailsComponent,
    DashboardComponent,
    MainComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MovieService, OmdbService, AuthenticationService, VoteService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
