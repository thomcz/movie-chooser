import { Injectable } from '@angular/core';

import { OmdbConfiguration } from '../configuration/omdbConfig'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../model/movie';

@Injectable()
export class OmdbService {
  
  private apiKey: string

  constructor(
    private http: HttpClient
  ) {
    
    this.apiKey = OmdbConfiguration.getApiKey()
   }

  getMovie(name : string) : Observable<Movie> {
    return this.http.get<Movie>(`https://www.omdbapi.com/?t=${name}&apikey=${this.apiKey}`)
  }

}
