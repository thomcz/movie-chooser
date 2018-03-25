import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {

  private usernameSource = new BehaviorSubject<string>("anonym");
  currentUsername = this.usernameSource.asObservable();

  private roomIdSource = new BehaviorSubject<string>("");
  currentRoomId = this.roomIdSource.asObservable();

  constructor() { }

  changeUsername(username: string) {
    console.log('changed user:' + username)
    this.usernameSource.next(username)
  }
  changeRoomId(roomId: string) {
    console.log('change room:' + roomId)
    this.roomIdSource.next(roomId)
  }

}
