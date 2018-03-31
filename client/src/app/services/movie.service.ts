import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie } from '../model/movie'
import { MovieDb } from '../model/moviedb'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MovieChooserConfiguration } from '../configuration/movieChooserConfig'

@Injectable()
export class MovieService {

  private moviesUrl: string

  constructor(
    private http: HttpClient
  )  { 
    this.moviesUrl = MovieChooserConfiguration.getMovieChooserEndpointUrl()
  }

  getMovies(roomId: string) : Observable<MovieDb[]> {
    return this.http.get<MovieDb[]>(`${this.moviesUrl}/${roomId}`)
  }

  addMovie(movie: Movie, username: string, roomId: string) : Observable<any> {    
    return this.http.post(this.moviesUrl, {title: movie.Title, imdbId: movie.imdbID, user: username, roomId: roomId})
  }

  deleteMovie(movie: Movie, username: string, roomId: string) : Observable<any> {    
    return this.http.delete(`${this.moviesUrl}/${movie.imdbID}/${username}/${roomId}`)
  }
}
