import { DOCUMENT } from "@angular/common";
import { Component, Inject } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-auth-button',
    template: `<ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
    <button class="p-button" (click)="auth.logout({ logoutParams: { returnTo: document.location.origin } })">
        Log out
            </button>
    </ng-container>

    <ng-template #loggedOut>
        <button class="p-button" (click)="auth.loginWithRedirect()">Log in</button>
    </ng-template>`
})
export class LoginComponent {
    // Inject the authentication service into your component through the constructor
    constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
}