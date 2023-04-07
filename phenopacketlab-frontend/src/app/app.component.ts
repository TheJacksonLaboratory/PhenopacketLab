import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';


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

  activeSidenav = true;

  constructor(public location: Location, public http: HttpClient, public router: Router) {}

  ngOnInit() {
    const hideNavUrls = ['/about', '/help'];
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.activeSidenav = !(hideNavUrls.includes(event.url));
      }
    });
  }

}
