import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movie Chooser';
  
  constructor(
    private router: Router
  ) { }
  
  openHelp() {
    this.router.navigateByUrl("/help");
  }
}
