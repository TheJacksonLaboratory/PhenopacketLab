import { DOCUMENT } from "@angular/common";
import { Component, Inject } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-auth-button',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    // Inject the authentication service into your component through the constructor
    constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
}