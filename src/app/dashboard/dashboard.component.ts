import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  searchClick(search: string): void {
    var formatted = this.formatSearch(search);
    this.router.navigateByUrl(`/movie/${formatted}`);
  }

  private formatSearch(search: string): string {
    return search.trim().split(' ').join('-');
  }

}
