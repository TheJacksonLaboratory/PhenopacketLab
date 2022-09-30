import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  // tracks whether the sidebar should be open or closed
  @Input() open?: boolean;

  // current url
  @Input() route?: string;

  constructor() { }

}
