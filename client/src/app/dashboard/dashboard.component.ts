import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from '../movie';
import { MovieService } from "../movie.service";
import { MovieDb } from '../moviedb';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {

  private movies
  private username
  private roomId

  constructor(
    private movieService: MovieService,
    private authenticationData: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.authenticationData.currentUsername.subscribe(username => this.username = username)
    this.authenticationData.currentRoomId.subscribe(roomId => this.roomId = roomId)

    //console.log('dash user:' + this.username)
    //console.log('dash room:' + this.roomId)
    this.movieService.getMovies(this.roomId).subscribe(movies => this.movies = movies);
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
    console.log(index);
    console.log(this.movies[index]);
  }

  private formatSearch(search: string): string {
    return search.trim().split(' ').join('-');
  }

}

