import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie } from './movie'
import { MovieDb } from './moviedb'
import { OmdbApiKey } from "./apikey";
import { MOVIES } from "./mock-movies";

@Injectable()
export class MovieService {

  private apiKey
  private moviesUrl = 'http://localhost:3000/movies'
  
  constructor(
    private http: HttpClient
  )  { 
    this.apiKey = OmdbApiKey.getApiKey()
  }

  getMovie(name : string) : Observable<Movie> {
    return this.http.get<Movie>(`http://www.omdbapi.com/?t=${name}&apikey=${this.apiKey}`)
  }

  getMovies(roomId: string) : Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.moviesUrl}/${roomId}`)
  }

  addMovie(movie: Movie, username: string, roomId: string) : Observable<any> {    
    return this.http.post(this.moviesUrl, {title: movie.Title, imdbId: movie.imdbID, user: username, roomId: roomId})
  }
}
