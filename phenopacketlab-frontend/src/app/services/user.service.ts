import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private client: HttpClient) {
    }

    /**
     * This method tries to get the current logged in user from the database. If they don't
     * exist yet they will be inserted.
     * @returns a user object
     */
    public check(): void {
        this.client.get<any>(environment.USER_URL).subscribe();
    }
}