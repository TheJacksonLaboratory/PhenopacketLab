import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { HeaderComponent } from './component/header/header.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  // navigation sidebar child component
  @ViewChild(SidebarComponent) sideNav!: SidebarComponent;

  // header child component
  @ViewChild(HeaderComponent) header!: HeaderComponent;

  // status of whether the sidebar is open or closed
  sideNavOpen = false;

  constructor(public location: Location, public http: HttpClient, public router: Router) { }

  ngOnInit() {
    this.sideNavOpen = this.header?.sideNavOpen || true;
  }

}
