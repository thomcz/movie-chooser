import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Movie } from '../model/movie';
import { MovieService } from "../services/movie.service";
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent implements OnInit {

  movie: Movie;
  private username: string
  private roomId: string
  private imdbId: string

  constructor(
    private route: ActivatedRoute, 
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
    this.imdbId = this.route.snapshot.paramMap.get('imdbId');
    this.movieService.getMovie(this.formatSearch(name)).subscribe(movie => this.movie = movie);
  }

  goBack(): void {
    this.location.back();
  }

  addMovie(): void {
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
    return this.imdbId == null
  }

  showDeleteButton(): boolean {
    return this.imdbId != null
  }


  private formatSearch(search: string): string {
    return search.trim().split('-').join(' ');
  }

}
