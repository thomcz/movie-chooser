import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {

  private usernameSource = new BehaviorSubject<string>("anonym");
  currentUsername = this.usernameSource.asObservable();

  private roomIdSource = new BehaviorSubject<string>("");
  currentRoomId = this.roomIdSource.asObservable();

  private hostSource = new BehaviorSubject<boolean>(false);
  currentHost = this.hostSource.asObservable();

  constructor() { }

  changeUsername(username: string) {
    this.usernameSource.next(username)
  }

  changeRoomId(roomId: string) {
    this.roomIdSource.next(roomId)
  }

  changeHost(host: boolean) {
    this.hostSource.next(host)
  }

}
