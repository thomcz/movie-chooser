import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from '../movie';
import { MovieService } from "../movie.service";
import { MovieDb } from '../moviedb';
import { AuthenticationService } from '../authentication.service';
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
    this.router.navigateByUrl(`/movie/${formatted}`);
  }

  onSelect(movie: MovieDb) {
    this.router.navigateByUrl(`/movie/${movie.title}`);
  }

  chooseRandomMovie() {
    var index = Math.floor(Math.random() * this.movies.length) + 0  
    
    this.openDialog(index)
  }

  private formatSearch(search: string): string {
    return search.trim().split(' ').join('-');
  }

  private openDialog(index: number) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { title: 'Choosen Movie', message: this.movies[index].title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

