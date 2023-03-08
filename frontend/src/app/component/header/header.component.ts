import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  // tracks whether the navigation sidebar is open
  sideNavOpen = true;

  // emits when the navigation should be opened or closed with status of sideNavOpen
  @Output() toggleNav: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Trigger the sidenav to be opened or closed based on its current state
   */
  toggleSideNav(): void {
    this.sideNavOpen = !this.sideNavOpen;
    this.toggleNav.emit(this.sideNavOpen);
  }
}
