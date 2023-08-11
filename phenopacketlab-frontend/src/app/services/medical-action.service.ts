import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const bodySitesUrl = environment.BODY_SITE_URL;
const treatmentIntentsUrl = environment.MEDICAL_ACTION_TREATMENT_INTENTS_URL;
const treatmentResponsesUrl = environment.MEDICAL_ACTION_TREATMENT_RESPONSES_URL;
const chemicalEntitiesUrl = environment.CHEMICAL_ENTITY_URL;
const chemicalEntitiesSearchUrl = environment.CHEMICAL_ENTITY_SEARCH_URL;

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

    public searchChemicalEntities(query: string): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const params = new HttpParams().set('query', query).set('max', 10); // Create new HttpParams
        const httpOptions: Object = { headers, params };
        return this.http.get(chemicalEntitiesSearchUrl, httpOptions);
    }

    public getChemicalEntityById(id: string): Observable<any> {
        return this.http.get(`${chemicalEntitiesUrl}/${id}`);
    }

}
