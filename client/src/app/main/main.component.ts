import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private username: string
  private roomId: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationData: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationData.currentUsername.subscribe(username => this.username = username)
    this.authenticationData.currentRoomId.subscribe(roomId => this.roomId = roomId)
  }

  createNewRoom(username: string) {
    this.authenticationData.changeRoomId(this.createRandomRoomId())
    this.authenticationData.changeUsername(username)

    this.router.navigateByUrl('/dashboard');
  }

  joinRoom(roomId: string, username: string): void {
    if (roomId.trim == null) {
      return;
    }

    this.authenticationData.changeRoomId(roomId)
    this.authenticationData.changeUsername(username)

    this.router.navigateByUrl('/dashboard');
  }

  private createRandomRoomId(): string {
    return Math.random().toString(36).substring(7);    
  }

}
