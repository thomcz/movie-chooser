import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Movie } from './movie'
import { OmdbApiKey } from "./apikey";
import { MOVIES } from "./mock-movies";

@Injectable()
export class MovieService {

  //private omdbUrl ='http://www.omdbapi.com/?t=&apikey=${apiKey}'
  private apiKey

  constructor(
    private http: HttpClient
  )  { 
    this.apiKey = OmdbApiKey.getApiKey()
  }

  getMovie(name : string) : Observable<Movie> {
    return  this.http.get<Movie>(`http://www.omdbapi.com/?t=${name}&apikey=${this.apiKey}`)
  }

  getMovies() : Observable<Movie[]> {
    return of(MOVIES);
  }

}
