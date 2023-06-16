import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const bodySitesUrl = environment.PHENOPACKETLAB_BODY_SITE_URL;

@Injectable({ providedIn: 'root' })
export class MeasurementService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        // TODO
        return undefined;
    }
    getAllFromLocalStorage(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }

}
