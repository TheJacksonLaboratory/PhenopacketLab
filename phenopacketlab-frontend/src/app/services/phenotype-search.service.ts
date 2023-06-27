import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TimeElement } from '../models/base';

const phenotypicFeaturesUrl = environment.PHENOTYPIC_FEATURE_URL;
const phenotypicFeaturesSearchUrl = environment.PHENOTYPIC_FEATURE_SEARCH_URL;
const textMinerUrl = environment.TEXT_MINING_URL;

@Injectable({
    providedIn: 'root'
})
export class PhenotypeSearchService {

    phenotypicFeatures = new BehaviorSubject<any>(undefined);

    onset = new Subject<TimeElement>();
    resolution = new Subject<TimeElement>();

    constructor(private http: HttpClient) {
    }

    // return diseases as an Observable
    getPhenotypicFeatures(): Observable<any> {
        // only if undefined, load from server
        if (this.phenotypicFeatures.getValue() === undefined) {
            console.log('Loading features...');
            this.loadPhenotypicFeatures();
        }
        // return features for subscription even if the value is yet undefined.
        return this.phenotypicFeatures.asObservable();
    }

    searchPhenotypicFeatures(query: string): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const params = new HttpParams().set('query', query).set('max', 10); // Create new HttpParams
        const httpOptions: Object = { headers, params };
        return this.http.get(phenotypicFeaturesSearchUrl, httpOptions);
    }

    private loadPhenotypicFeatures(): void {
        this.http.get(phenotypicFeaturesUrl).subscribe(res => {
            this.phenotypicFeatures.next(res);
        }, (error) => {
            console.log(error);
        });
    }

    public getPhenotypicFeatureById(id: string): Observable<any> {
        return this.http.get(`${phenotypicFeaturesUrl}/${id}`);
    }

    /**
     *
     * @param textSearch
     * @returns an Observable with json dataset as a result
     */
    public queryTextMiner(textSearch: string): Observable<any> {
        const headers = { 'content-type': 'text/plain'};
        return this.http.post(textMinerUrl, textSearch, {headers});
    }

    getPhenotypicOnset(): Observable<TimeElement> {
        return this.onset.asObservable();
    }

    setPhenotypicOnset(onset: TimeElement) {
        this.onset.next(onset);
    }
    getPhenotypicResolution(): Observable<TimeElement> {
        return this.resolution.asObservable();
    }

    setPhenotypicResolution(resolution: TimeElement) {
        this.resolution.next(resolution);
    }

}
