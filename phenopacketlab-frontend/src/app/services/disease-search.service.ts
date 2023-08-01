import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OntologyClass } from '../models/base';

const phenopacketDiseasesUrl = environment.DISEASE_URL;
const diseasesSearchUrl = environment.DISEASE_SEARCH_URL;

@Injectable({
    providedIn: 'root'
})
export class DiseaseSearchService {

    diseases = new BehaviorSubject<any>(undefined);

    tnmFindings = new Subject<OntologyClass[]>();
    diseaseStages = new Subject<OntologyClass[]>();

    constructor(private http: HttpClient) {
    }

    public searchDiseases(query: string): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const params = new HttpParams().set('query', query).set('max', 10); // Create new HttpParams
        const httpOptions: Object = { headers, params };
        return this.http.get(diseasesSearchUrl, httpOptions);
    }

    public getDiseaseById(id: string): Observable<any> {
        return this.http.get(`${phenopacketDiseasesUrl}/${id}`);
    }

    getTnmFindings(): Observable<OntologyClass[]> {
        return this.tnmFindings.asObservable();
    }
    setTnmFindings(findings: OntologyClass[]) {
        this.tnmFindings.next(findings);
    }

    getStages(): Observable<OntologyClass[]> {
        return this.diseaseStages.asObservable();
    }
    setStages(stages: OntologyClass[]) {
        this.diseaseStages.next(stages);
    }
}
