import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // current user profile data
  @Input() user: any;

  // current url
  @Input() route?: string;

  // tracks whether the navigation sidebar is open
  sideNavOpen = true;

  // emits when the navigation should be opened or closed with status of sideNavOpen
  @Output() toggleNav: EventEmitter<boolean> = new EventEmitter<boolean>();

  // emits when the user wants to login
  @Output() login: EventEmitter<any> = new EventEmitter<any>();

  // emits when the user wants to logout
  @Output() logout: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Trigger the sidenav to be opened or closed based on its current state
   */
  toggleSideNav(): void {
    this.sideNavOpen = !this.sideNavOpen;
    this.toggleNav.emit(this.sideNavOpen);
  }
}
