import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from '../model/movie';
import { MovieDb } from '../model/moviedb';
import { MovieService } from "../services/movie.service";
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { VoteService } from '../services/vote.service';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { State } from '../model/states';
import { StateService } from '../services/state.service';
import { MovieChooserConfiguration } from '../configuration/movieChooserConfig';


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
  private interval: number
  private state: State
  private randomMovie: MovieDb

  constructor(
    private movieService: MovieService,
    private authenticationData: AuthenticationService,
    private voteService: VoteService,
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { 
    this.movies = []
    this.interval = 5000
  }

  ngOnInit() {
    this.authenticationData.currentUsername.subscribe(username => this.username = username)
    this.authenticationData.currentRoomId.subscribe(roomId => this.roomId = roomId)
    this.authenticationData.currentHost.subscribe(isHost => this.isHost = isHost)

    this.voteService.currentHasVoted.subscribe(hasVoted => this.hasVoted = hasVoted)
    this.voteService.currentVote.subscribe(votedMovie => this.votedMovie = votedMovie)

    TimerObservable.create(0, this.interval).subscribe(() => {
      this.stateService.getState(this.roomId).subscribe(state => this.state = state)
    });

    TimerObservable.create(0, this.interval).subscribe(() => {
      this.movieService.getMovies(this.roomId).subscribe(movies => this.movies = movies)
    });
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
    if (this.movies.length < 1) {
      this.openDialog("Information", "There are no movie suggestions!")
      return;
    }
    this.movieService.getMovies(this.roomId).subscribe(movies => {
      this.movies = movies
      var index = Math.floor(Math.random() * this.movies.length) + 0  
      this.randomMovie = movies[index]
      this.movieService.setRandomMovie(this.randomMovie).subscribe(res => {
        this.stateService.setState(this.roomId, State.RANDOM).subscribe(
          res => {
            this.state = State.RANDOM
          }
        )
      })
    });
  }

  getListHeader(): string {
    if (this.isVotingResultState()) {
      return "Voting Result";
    }
    if (this.isRandomState()) {
      return "Choosen Movie";
    }
    return "Suggested Movies";
  }

  startVoting() {
    if (this.movies.length < 1) {
      this.openDialog("Information", "There are no movie suggestions!")
      return;
    }
    this.stateService.setState(this.roomId, State.VOTING).subscribe(
      res => {
        this.state = State.VOTING
      }
    )
  }

  chooseMovieByVotes() {
    this.stateService.setState(this.roomId, State.RESULT).subscribe(
      res => {
        this.state = State.RESULT
      }
    )
  }

  submitVote() {
    this.voteService.submitVote(this.votedMovie).subscribe(
      res => {
        this.openDialog('You Voted for', this.votedMovie.title);
        this.voteService.changeHasVoted(true);
      },
      err => {
        console.log(err);
      }
    );
  }

  showMovie(movie: MovieDb): boolean {
    if (this.state == State.RANDOM) {
      return movie.isChoosen;
    }
    return true;
  }

  votedFor(movie: MovieDb): boolean {
    return this.votedMovie != null && this.votedMovie.imdbId == movie.imdbId
  }

  isAddingState(): boolean {
    return this.state == State.ADDING;
  }

  isVotingState(): boolean {
    return this.state == State.VOTING;
  }

  isRandomState(): boolean {
    return this.state == State.RANDOM;
  }

  isVotingResultState(): boolean {
    return this.state == State.RESULT;
  }

  getRoomLink(): string {
    return `${MovieChooserConfiguration.getMovieChooserClientUrl()}/login/${this.roomId}`
  }

  share() {
    this.snackBar.open("link copyed into clipboard", "ok", {
      duration: 2000,
    });
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

