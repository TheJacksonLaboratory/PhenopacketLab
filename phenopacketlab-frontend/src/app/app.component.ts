import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AuthService } from '@auth0/auth0-angular';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { filter, first, take } from 'rxjs/operators';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  activeSidenav = true;
  constructor(public location: Location, public http: HttpClient, public router: Router,
              public authService: AuthService, public userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
    const hideNavUrls = ['/about', '/help'];
    this.router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          this.activeSidenav = !(hideNavUrls.includes(event.url));
        }
    });

    this.authService.user$.pipe(
        filter(user => Boolean(user)),
        take(1),
      ).subscribe((user) => {
          if (user != null) {
              this.userService.check(user.sub).pipe(first()).subscribe();
          } else {
              // We will warn someone if they are not logged in and they have been on the site for at least 15secs
              // about data not being saved.
              timer(15000).pipe(take(1)).subscribe(() => {
                  const message = 'Your data will not be saved.';
                  // TODO: Show alert that their phenopackets would not be saved.
                  this.messageService.add({ severity: 'warn', summary: 'No Login Found', detail: message, sticky: true });
              });
          }
      });
  }
}
