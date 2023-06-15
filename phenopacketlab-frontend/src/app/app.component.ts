import { Location } from '@angular/common';
<<<<<<< HEAD:phenopacketlab-frontend/src/app/app.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
=======
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import { AuthService } from "@auth0/auth0-angular";
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { HeaderComponent } from './component/header/header.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from "./services/user.service";
>>>>>>> 1046986 (preliminary auth0 integration, logout and login):frontend/src/app/app.component.ts


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  // navigation sidebar child component
  @ViewChild(SidebarComponent) sideNav!: SidebarComponent;

  // header child component
  @ViewChild(HeaderComponent) header!: HeaderComponent;

  // status of whether the sidebar is open or closed
  sideNavOpen = false;

<<<<<<< HEAD:phenopacketlab-frontend/src/app/app.component.ts
  activeSidenav = true;

  constructor(public location: Location, public http: HttpClient, public router: Router) {}

  ngOnInit() {
    const hideNavUrls = ['/about', '/help'];
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.activeSidenav = !(hideNavUrls.includes(event.url));
      }
=======
  constructor(public location: Location, public http: HttpClient, public router: Router,
              public authService: AuthService, public userService: UserService) { }

  ngOnInit() {
    this.sideNavOpen = this.header?.sideNavOpen || true;
    this.authService.user$.subscribe(user => {
     this.userService.check();
>>>>>>> 1046986 (preliminary auth0 integration, logout and login):frontend/src/app/app.component.ts
    });
  }

}
