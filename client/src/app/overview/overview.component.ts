import { Component, OnInit } from '@angular/core';
import { MovieDb } from '../model/moviedb';
import { MovieService } from '../services/movie.service';
import { User } from '../model/user';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../services/room.service';
import { MovieChooserConfiguration } from '../configuration/movieChooserConfig';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  private movies: MovieDb[]
  private users: User[]

  private roomId: string;
  
  private interval: number
  
  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService,
    private roomService: RoomService
  ) {
    this.movies = []
    this.interval = 5000
   }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    TimerObservable.create(0, this.interval).subscribe(() => {
      this.movieService.getMovies(this.roomId).subscribe(movies => this.movies = movies)
    });
    TimerObservable.create(0, this.interval).subscribe(() => {
      this.roomService.getUsersOfRoom(this.roomId).subscribe(users => this.users = users)
    });
  }

  getRoomLink(): string {
    return `${MovieChooserConfiguration.getMovieChooserClientUrl()}/login/${this.roomId}`
  }

  getQrCode(): string {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${this.getRoomLink()}`
  }

}
