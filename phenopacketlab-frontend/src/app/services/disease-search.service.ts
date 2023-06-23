import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OntologyClass, TimeElement } from '../models/base';

const phenopacketDiseasesUrl = environment.DISEASE_URL;
const diseasesSearchUrl = environment.DISEASE_SEARCH_URL;

@Injectable({
    providedIn: 'root'
})
export class DiseaseSearchService {

    diseases = new BehaviorSubject<any>(undefined);

    onset = new Subject<TimeElement>();
    resolution = new Subject<TimeElement>();
    tnmFindings = new Subject<OntologyClass[]>();
    diseaseStages = new Subject<OntologyClass[]>();

    constructor(private http: HttpClient) {
    }

    // return diseases as an Observable
    getDiseases(): Observable<any> {
        // only if undefined, load from server
        if (this.diseases.getValue() === undefined) {
            console.log('Loading diseases...');
            this.loadDiseases();
        }
        // return diseases for subscription even if the value is yet undefined.
        return this.diseases.asObservable();
    }

    private loadDiseases(): void {
        this.http.get(phenopacketDiseasesUrl).subscribe(res => {
            this.diseases.next(res);
        }, (error) => {
            console.log(error);
        });
    }

    searchDiseases(query: string): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const params = new HttpParams().set('query', query).set('max', 10); // Create new HttpParams
        const httpOptions: Object = { headers, params };
        return this.http.get(diseasesSearchUrl, httpOptions);
    }

    public getDiseaseById(id: string): Observable<any> {
        return this.http.get(`${phenopacketDiseasesUrl}/${id}`);
    }

    getDiseaseOnset(): Observable<TimeElement> {
        return this.onset.asObservable();
    }

    setDiseaseOnset(onset: TimeElement) {
        this.onset.next(onset);
    }
    getDiseaseResolution(): Observable<TimeElement> {
        return this.resolution.asObservable();
    }

    setDiseaseResolution(resolution: TimeElement) {
        this.resolution.next(resolution);
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
