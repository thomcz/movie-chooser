import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieChooserConfiguration } from '../configuration/movieChooserConfig';
import { Observable } from 'rxjs/Observable';
import { Room } from '../model/room';

@Injectable()
export class RoomService {

  private moviesUrl: string

  constructor(
    private http: HttpClient
  )  { 
    this.moviesUrl = `${MovieChooserConfiguration.getMovieChooserEndpointUrl()}/room`
  }

  addRoom(room: Room): Observable<any>  {
    console.log(room)
    return this.http.post(`${this.moviesUrl}`, room)
  }

}
