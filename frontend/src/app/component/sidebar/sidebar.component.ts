import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  items: MenuItem[];

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {label: 'Dashboard', icon: 'pi pi-fw pi-users', routerLink: '/dashboard'},
      {label: 'Second Example', icon: 'pi pi-fw pi-plus', routerLink: '/profile-selection'}
    ];

  }

}
