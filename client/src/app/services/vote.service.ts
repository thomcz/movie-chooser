import { Injectable } from '@angular/core';
import { MovieDb } from '../model/moviedb';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { MovieChooserConfiguration } from '../configuration/movieChooserConfig';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VoteService {

  private moviesUrl: string

  private votedSource = new BehaviorSubject<MovieDb>(null);
  currentVote = this.votedSource.asObservable();

  private hasVotedSource = new BehaviorSubject<boolean>(false);
  currentHasVoted = this.hasVotedSource.asObservable();

  constructor(
    private http: HttpClient
  ) { 
    this.moviesUrl = MovieChooserConfiguration.getMovieChooserEndpointUrl()
  }

  changeVote(movie: MovieDb) {
    this.votedSource.next(movie)
  }

  changeHasVoted(hasVoted: boolean) {
    this.hasVotedSource.next(hasVoted)
  }

  submitVote(votedMovie: MovieDb): Observable<any> {
    return this.http.post(`${this.moviesUrl}/votes`, votedMovie)
  }
  getMovieVotes(roomId: string): Observable<MovieDb[]> {
    return this.http.get<MovieDb[]>(`${this.moviesUrl}/movies/${roomId}`)
  }

  


}
