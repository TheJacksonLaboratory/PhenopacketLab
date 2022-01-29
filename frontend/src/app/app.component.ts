import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = "frontend";

  constructor(public location: Location, private router: Router) { }

  ngOnInit() {
   
    this.router.navigate(['/aboutUs']);
  }

}
