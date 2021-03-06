import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Movie } from '../model/movie';
import { MovieService } from "../services/movie.service";
import { AuthenticationService } from '../services/authentication.service';
import { OmdbService } from '../services/omdb.service';
import { MovieDb } from '../model/moviedb';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent implements OnInit {

  private movie: Movie;
  private movieDb: MovieDb
  private username: string
  private roomId: string

  constructor(
    private route: ActivatedRoute, 
    private omdbService: OmdbService,
    private movieService: MovieService,
    private authenticationData: AuthenticationService,
    private location: Location
  ) { }

  ngOnInit() {
    this.authenticationData.currentUsername.subscribe(username => this.username = username)
    this.authenticationData.currentRoomId.subscribe(roomId => this.roomId = roomId)
    this.getMovie();    
  }

  getMovie(): void {
    const name = this.route.snapshot.paramMap.get('name');
    const imdbId = this.route.snapshot.paramMap.get('imdbId');
    this.movieService.getMovie(this.roomId, imdbId).subscribe(movieDb => this.movieDb = movieDb)
    if (imdbId != null) {
      this.omdbService.getMovieById(imdbId).subscribe(movie => this.movie = movie);
    } else {
      this.omdbService.getMovieByName(name).subscribe(movie => {
        this.movie = movie
      },
      err => {
        console.log("error");
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  addMovie(): void {
    console.log("add");
    console.log(this.movie.Title);

    if (this.movie.Title == undefined) {
      console.log("no movie found");
      this.location.back();
      return
    }
    this.movieService.addMovie(this.movie, this.username, this.roomId).subscribe(
      res => {
        console.log(res);
        this.location.back();
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  deleteMovie(): void {
    this.movieService.deleteMovie(this.movie, this.username, this.roomId).subscribe(
      res => {
        console.log(res);
        this.location.back();
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  showAddButton(): boolean {
    console.log(this.movie)
    return this.movieDb == null && this.movie != null && this.movie.Title != undefined
  }

  showDeleteButton(): boolean {
    return this.movieDb != null && this.movieDb.user == this.username
  }
}
