import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { AuthService } from '@auth0/auth0-angular';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { distinctUntilChanged, filter, first, take } from 'rxjs/operators';

import { UserService } from './services/user.service';
import { PhenopacketService } from './services/phenopacket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  docsUrl = environment.DOCS_URL;
  showWelcomeScreen = true;
  activeSidenav = true;
  constructor(public location: Location, public http: HttpClient, public router: Router,
              public authService: AuthService, public userService: UserService, 
              private messageService: MessageService, private phenopacketService: PhenopacketService,
             ) { }

  ngOnInit() {
    const hideNavUrls = ['/about', '/help'];
    this.router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          this.activeSidenav = !(hideNavUrls.includes(event.url));
        }
    });
    this.phenopacketService.getShowWelcomeScreen().subscribe(showWelcomeScreen => {
      this.showWelcomeScreen = showWelcomeScreen;
    });

    this.authService.user$.pipe(
        filter(user => Boolean(user)),
        distinctUntilChanged((p, q) => p.sub === q.sub)
      ).subscribe((user) => {
          if (user != null) {
              this.userService.check().pipe(first()).subscribe();
          }
      });

    this.authService.isAuthenticated$.pipe().subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
            timer(15000).pipe(take(1)).subscribe(() => {
                const message = 'Your data will not be saved.';
                this.messageService.add({ severity: 'warn', summary: 'No Login Found', detail: message, sticky: true });
            });
        } else {
          this.start();
        }
    });
  }

  start() {
    this.showWelcomeScreen = false;
    this.phenopacketService.setShowWelcomeScreen(false);
  }
  navigateTo(url: string) {
    window.open(url, '_blank');
  }
}
