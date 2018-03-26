import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from '../model/movie';
import { MovieDb } from '../model/moviedb';
import { MovieService } from "../services/movie.service";
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {

  private movies: MovieDb[]
  private username: string
  private roomId: string

  constructor(
    private movieService: MovieService,
    private authenticationData: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.authenticationData.currentUsername.subscribe(username => this.username = username)
    this.authenticationData.currentRoomId.subscribe(roomId => this.roomId = roomId)

    this.movieService.getMovies(this.roomId).subscribe(movies => this.movies = movies)
  }

  searchClick(search: string): void {
    var formatted = this.formatSearch(search);
    if (formatted == "") {
      this.openDialog('Information', 'Enter Movie Name');
      return;
    }
    this.router.navigateByUrl(`/movie/${formatted}`);
  }

  onSelect(movie: MovieDb) {
    this.router.navigateByUrl(`/movie/${movie.title}/${movie.imdbId}`);
  }

  chooseRandomMovie() {
    var index = Math.floor(Math.random() * this.movies.length) + 0  
    
    this.openDialog('Choosen Movie', this.movies[index].title)
  }

  private formatSearch(search: string): string {
    return search.trim().split(' ').join('-');
  }

  private openDialog(title: string, message: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { title: title, message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

