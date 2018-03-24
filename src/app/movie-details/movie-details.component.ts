import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '../movie';
import { MovieService } from "../movie.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent implements OnInit {

  movie: Movie;

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.getMovie();
  }

  getMovie(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.movieService.getMovie(name).subscribe(movie => this.movie = movie);
  }

}
