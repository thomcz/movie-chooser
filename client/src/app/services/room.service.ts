import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieChooserConfiguration } from '../configuration/movieChooserConfig';
import { Observable } from 'rxjs/Observable';
import { Room } from '../model/room';
import { User } from '../model/user';

@Injectable()
export class RoomService {

  private moviesUrl: string

  constructor(
    private http: HttpClient
  )  { 
    this.moviesUrl = `${MovieChooserConfiguration.getMovieChooserEndpointUrl()}`
  }

  addRoom(room: Room): Observable<any> {
    return this.http.post(`${this.moviesUrl}/room`, room)
  }

  addUser(user: User): Observable<any> {
    return this.http.post(`${this.moviesUrl}/users`, user)
  }

  getUsersOfRoom(roomId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.moviesUrl}/users/${roomId}`)
  }

}
