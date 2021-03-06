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
import {MatSidenavModule} from '@angular/material/sidenav';
import { VoteService } from './services/vote.service';
import { VotingResultComponent } from './voting-result/voting-result.component';
import {MatStepperModule} from '@angular/material/stepper';
import { StateService } from './services/state.service';
import { RoomService } from './services/room.service';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HelpComponent } from './help/help.component';
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieDetailsComponent,
    DashboardComponent,
    MainComponent,
    DialogComponent,
    VotingResultComponent,
    HelpComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatStepperModule, 
    MatMenuModule,
    MatSidenavModule,
    
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    ClipboardModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [MovieService, OmdbService, AuthenticationService, VoteService, StateService, RoomService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
