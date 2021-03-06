import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { RoomService } from '../services/room.service';
import { Room } from '../model/room';
import { State } from '../model/states';
import { StateService } from '../services/state.service';
import { User } from '../model/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private username: string
  private roomId: string
  private isHost: boolean
  private isInvited: boolean

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationData: AuthenticationService,
    private roomService: RoomService,
    private stateService: StateService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.authenticationData.currentUsername.subscribe(username => this.username = username)
    this.authenticationData.currentRoomId.subscribe(roomId => this.roomId = roomId)
    this.authenticationData.currentHost.subscribe(isHost => this.isHost = isHost)

    const roomId = this.route.snapshot.paramMap.get('roomId');
    if (roomId != null) {
      this.authenticationData.changeRoomId(roomId);
      this.isInvited = true;
    }

  }

  createNewRoom(username: string) {
    if (username.trim() == "") {
      this.openDialog('Information', 'Enter A Username')
      return;
    }

    this.authenticationData.changeRoomId(this.createRandomRoomId())
    this.authenticationData.changeUsername(username)
    this.authenticationData.changeHost(true)
    
    this.roomService.addRoom(new Room(this.roomId, State.ADDING)).subscribe(
      res => {
        this.addUser(new User(username, this.roomId))
      },
      err => {
        console.log("Error occured");
      }
    );

  }

  joinRoom(roomId: string, username: string): void {
    if (roomId.trim() == "") {
      this.openDialog('Information', 'Enter A Room Id')
      return;
    }
    if (username.trim() == "") {
      this.openDialog('Information', 'Enter A Username')
      return;
    }

    this.authenticationData.changeRoomId(roomId)
    this.authenticationData.changeUsername(username)
    this.stateService.getState(this.roomId).subscribe(state => {
      if (state == State.ADDING) {
        this.addUser(new User(username, this.roomId))
      }
      else {
        this.openDialog('Information', 'Sorry you are to late the room is closed')
      }
    });
  }

  private addUser(user: User) {
    this.roomService.addUser(user).subscribe(
      res => {
        this.router.navigateByUrl('/dashboard');
      }
    )
  }

  private createRandomRoomId(): string {
    const roomId = Math.random().toString(36).substring(7);
    this.authenticationData.changeRoomId(roomId)
    return roomId;
  }

  private openDialog(title: string, message: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { title: title, message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
