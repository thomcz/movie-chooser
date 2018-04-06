import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { MovieChooserConfiguration } from '../configuration/movieChooserConfig';
import { Observable } from 'rxjs/Observable';
import { Room } from '../model/room';
import { State } from '../model/states';

@Injectable()
export class StateService {

  private moviesUrl: string

  constructor(
    private http: HttpClient
  )  { 
    this.moviesUrl = `${MovieChooserConfiguration.getMovieChooserEndpointUrl()}/room`
  }

  getState(roomId: string) : Observable<State> {
    return this.http.get<State>(`${this.moviesUrl}/${roomId}`)
  }

  setState(roomId: string, state: State): Observable<any> {
    return this.http.post(`${this.moviesUrl}/${roomId}`, new Room(roomId, state))
  }

}
