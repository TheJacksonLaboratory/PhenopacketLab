import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const bodySitesUrl = environment.BODY_SITE_URL;
const treatmentIntentsUrl = environment.MEDICAL_ACTION_TREATMENT_INTENTS_URL;
const treatmentResponsesUrl = environment.MEDICAL_ACTION_TREATMENT_RESPONSES_URL;
const treatmentTerminationReasonsUrl = environment.MEDICAL_ACTION_TERMINATION_REASONS_URL;


@Injectable({ providedIn: 'root' })
export class MedicalActionService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        return this.getAllBodySites();
    }
    getAllFromLocalStorage(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }

    public getAllBodySites(): Observable<any> {
        return this.http.get(bodySitesUrl);
    }

    public getTreatmentIntents(): Observable<any> {
        return this.http.get(treatmentIntentsUrl);
    }
    public getTreatmentResponses(): Observable<any> {
        return this.http.get(treatmentResponsesUrl);
    }
    public getTerminationReasons(): Observable<any> {
        return this.http.get(treatmentTerminationReasonsUrl);
    }
}
