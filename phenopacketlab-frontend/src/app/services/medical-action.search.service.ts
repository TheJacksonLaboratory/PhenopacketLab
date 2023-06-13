import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseSearchService } from './base-search.service';

const bodySitesUrl = environment.PHENOPACKETLAB_BODY_SITE_URL;
const treatmentIntentsUrl = environment.MEDICAL_ACTION_TREATMENT_INTENTS_URL;
const treatmentResponsesUrl = environment.MEDICAL_ACTION_TREATMENT_RESPONSES_URL;
const treatmentTerminationReasonsUrl = environment.MEDICAL_ACTION_TERMINATION_REASONS_URL;
const adverseEventsUrl = environment.MEDICAL_ACTION_ADVERSE_EVENTS_URL;


@Injectable({ providedIn: 'root' })
export class MedicalActionService extends BaseSearchService {
    selectedSearchItems: any;
    selectedSearchItemSubject: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        super(http);
        this.selectedSearchItems = {};
        this.selectedSearchItemSubject = new BehaviorSubject(this.selectedSearchItems);
    }

    getSelectedSearchItems() {
        return this.selectedSearchItems;
    }

    setSelectedSearchItems(searchItems: any) {
        this.selectedSearchItems = searchItems;
        this.selectedSearchItemSubject.next(searchItems);
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

}
