import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private username: string
  private roomId: string
  private isHost: boolean

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationData: AuthenticationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.authenticationData.currentUsername.subscribe(username => this.username = username)
    this.authenticationData.currentRoomId.subscribe(roomId => this.roomId = roomId)
    this.authenticationData.currentHost.subscribe(isHost => this.isHost = isHost)

  }

  createNewRoom(username: string) {
    if (username.trim() == "") {
      this.openDialog('Information', 'Enter A Username')
      return;
    }

    this.authenticationData.changeRoomId(this.createRandomRoomId())
    this.authenticationData.changeUsername(username)
    this.authenticationData.changeHost(true)

    this.router.navigateByUrl('/dashboard');
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

    this.router.navigateByUrl('/dashboard');
  }

  private createRandomRoomId(): string {
    return Math.random().toString(36).substring(7);    
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
