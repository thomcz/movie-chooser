import { Component, OnInit } from '@angular/core';
import { VoteService } from '../services/vote.service';
import { AuthenticationService } from '../services/authentication.service';
import { MovieDb } from '../model/moviedb';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voting-result',
  templateUrl: './voting-result.component.html',
  styleUrls: ['./voting-result.component.css']
})
export class VotingResultComponent implements OnInit {

  private roomId: string
  private movies: MovieDb[]

  constructor(
    private authenticationData: AuthenticationService,
    private voteService: VoteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authenticationData.currentRoomId.subscribe(roomId => this.roomId = roomId)
    this.voteService.getMovieVotes(this.roomId).subscribe(movies => this.movies = movies)
  }

  onSelect(movie: MovieDb) {
    this.router.navigateByUrl(`/movie/id/${movie.imdbId}`);
  }
}
