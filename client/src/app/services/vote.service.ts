import { Injectable } from '@angular/core';
import { MovieDb } from '../model/moviedb';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class VoteService {
  private votedSource = new BehaviorSubject<MovieDb>(null);
  currentVote = this.votedSource.asObservable();

  constructor() { }

  changeVote(movie: MovieDb) {
    this.votedSource.next(movie)
  }

}
