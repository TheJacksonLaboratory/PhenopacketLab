import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OntologyTreeNode } from '../models/ontology-treenode';

const bodySitesUrl = environment.BODY_SITE_URL;
const treatmentIntentsUrl = environment.MEDICAL_ACTION_TREATMENT_INTENTS_URL;
const treatmentResponsesUrl = environment.MEDICAL_ACTION_TREATMENT_RESPONSES_URL;
const treatmentTerminationReasonsUrl = environment.MEDICAL_ACTION_TERMINATION_REASONS_URL;
const adverseEventsUrl = environment.MEDICAL_ACTION_ADVERSE_EVENTS_URL;
const routeOfAdministrationUrl = environment.ROUTE_OF_ADMINISTRATION_URL;


@Injectable({ providedIn: 'root' })
export class MedicalActionService {

    routesOfAdministration = new BehaviorSubject<any>(undefined);

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
    public getAdverseEvents(): Observable<any> {
        return this.http.get(adverseEventsUrl);
    }

    public getRoutesOfAdministration(): Observable<OntologyTreeNode> {
        // only if undefined, load from server
        if (this.routesOfAdministration.getValue() === undefined) {
            console.log('Loading routes of administration...');
            this.loadRoutesOfAdminsitration();
        }
        // return routes for subscription even if the value is yet undefined.
        return this.routesOfAdministration.asObservable();
    }

    private loadRoutesOfAdminsitration(): void {
        this.http.get(routeOfAdministrationUrl).subscribe(res => {
            this.routesOfAdministration.next(res);
        }, (error) => {
            console.log(error);
        });
    }
}
