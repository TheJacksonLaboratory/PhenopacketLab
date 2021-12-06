import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first, map, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [HttpClient]
})
export class DashboardComponent implements OnInit {

  message = '';

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {
    this.http.get(environment.MESSAGE_URL).pipe(
      first(),
      tap(result => console.log('Message received from the server: ', result)),
      map(result => this.message = (result as any).message)
    ).subscribe();
  }


}
