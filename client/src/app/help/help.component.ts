import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  private displayToolbar: boolean

  constructor(private route: ActivatedRoute, 
    
    private router: Router,
    private location: Location
  ) { 
    
  }

  ngOnInit() {
    this.displayToolbar = this.router.url == "/help"
  }

  goBack() {
    this.location.back();
  }

}
