import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private client: HttpClient) {
    }

    /**
     * This method tries to get the current logged-in user from the database. If they don't
     * exist, they will be inserted.
     * @returns true if the user persists in our store
     */
    public check(authId: string): Observable<boolean> {
        return this.client.get<any>(environment.USER_URL).pipe(
            map((user) => {
                return user != null && user.authId === authId;
            }));
    }
}