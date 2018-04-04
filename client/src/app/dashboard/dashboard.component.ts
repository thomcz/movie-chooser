import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from '../model/movie';
import { MovieDb } from '../model/moviedb';
import { MovieService } from "../services/movie.service";
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { VoteService } from '../services/vote.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {

  private movies: MovieDb[]
  private username: string
  private roomId: string
  private isHost: boolean
  private votedMovie: MovieDb
  private hasVoted: boolean

  constructor(
    private movieService: MovieService,
    private authenticationData: AuthenticationService,
    private voteService: VoteService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { 
    this.movies = []
  }

  ngOnInit() {
    this.authenticationData.currentUsername.subscribe(username => this.username = username)
    this.authenticationData.currentRoomId.subscribe(roomId => this.roomId = roomId)
    this.authenticationData.currentHost.subscribe(isHost => this.isHost = isHost)

    this.voteService.currentHasVoted.subscribe(hasVoted => this.hasVoted = hasVoted)
    this.voteService.currentVote.subscribe(votedMovie => this.votedMovie = votedMovie)

    this.movieService.getMovies(this.roomId).subscribe(movies => this.movies = movies)
  }

  refresh() {
    this.movieService.getMovies(this.roomId).subscribe(movies => this.movies = movies)
  }

  searchClick(search: string): void {
    var formatted = this.formatSearch(search);
    if (formatted == "") {
      this.openDialog('Information', 'Enter Movie Name');
      return;
    }
    var imdbId = this.extractImdbId(formatted)
    console.log("imdbid: " + imdbId)
    if (imdbId != "") {
      this.router.navigateByUrl(`/movie/id/${imdbId}`);
    } else {
      this.router.navigateByUrl(`/movie/${formatted}`);
    }
  }

  onSelect(movie: MovieDb) {
    this.router.navigateByUrl(`/movie/id/${movie.imdbId}`);
  }

  voteOnSelected(movie: MovieDb) {
    console.log('voted for:' + movie.title)
    this.voteService.changeVote(movie)
  }

  chooseRandomMovie() {
    var index = Math.floor(Math.random() * this.movies.length) + 0  
    
    this.openDialog('Choosen Movie', this.movies[index].title)
  }

  chooseMovieByVotes() {
    this.voteService.getMovieVotes(this.roomId).subscribe(
      res => {
        this.router.navigateByUrl(`/votingresult`);
      },
      err => {
        console.log("Error occured");
      }
    )
  }

  submitVote() {
    this.voteService.submitVote(this.votedMovie).subscribe(
      res => {
        this.openDialog('You Voted for', this.votedMovie.title);
        this.voteService.changeHasVoted(true);
        this.router.navigateByUrl(`/votingresult`);
      },
      err => {
        console.log(err);
      }
    );
  }

  votedFor(movie: MovieDb): boolean {
    return this.votedMovie != null && this.votedMovie.imdbId == movie.imdbId
  }

  private formatVotes(movies: MovieDb[]): string {
    var result = ""
    
    for (let movie of movies) {
      result += `${movie.title} got ${movie.votes} votes\n`
    }

    return result
  }

  private formatSearch(search: string): string {
    return search.trim();
  }

  private extractImdbId(search: string): string {
    var res = search.match("tt\\d{7}");
    if (res == null) {
      return ""
    }
    if (res.length > 0) {
      return res[0]
    }
    return ""
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

