import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/selectable-ontology-tree', title: 'Selectable Ontology Tree',  icon: 'account_tree', class: '' },
    // { path: '/simple-ontology-tree', title: 'Simple Ontology Tree',  icon:'account_tree', class: '' },
    { path: '/families', title: 'Families',  icon:'family_restroom', class: '' },
    { path: '/cohorts', title: 'cohorts', icon: 'groups', class: '' },
    { path: '/phenopackets', title: 'Phenopackets', icon: 'medical_information', class: ''},
    { path: '/aboutUs', title: 'About', icon: 'info', class: '' },
    // { path: '/aboutUs', title: 'About',  icon:'explore', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
