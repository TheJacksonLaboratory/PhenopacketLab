import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseSearchService } from './base-search.service';
import { TimeElement } from '../models/base';

const phenotypicFeaturesUrl = environment.PHENOPACKETLAB_PHENOTYPIC_FEATURE_URL;
const textMinerUrl = environment.TEXT_MINING_URL;

@Injectable({
    providedIn: 'root'
})
export class PhenotypeSearchService extends BaseSearchService {

    selectedSearchItems: any;
    selectedSearchItemSubject: BehaviorSubject<any>;

    onset = new Subject<TimeElement>();
    resolution = new Subject<TimeElement>();

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
        return this.getAllPhenotypicFeatures();
    }

    public getAllPhenotypicFeatures(): Observable<any> {
        return this.http.get(phenotypicFeaturesUrl);
    }

    public queryPhenotypicFeature(paramsIn: any): Observable<any> {
        return this.sendPhenotypicFeatureQueryRequest(paramsIn, phenotypicFeaturesUrl);
    }

    public queryPhenotypicFeatureById(id: string): Observable<any> {
        return this.http.get(`${phenotypicFeaturesUrl}/${id}`);
    }

    private sendPhenotypicFeatureQueryRequest(paramsIn: any, url: string): Observable<any> {
        const options = {
            phenopacketId: paramsIn.phenoId,
            max: paramsIn.max ? paramsIn.max : '',
            offset: paramsIn.offset ? paramsIn.offset : '',
            sortBy: paramsIn.sortBy ? paramsIn.sortBy : '',
            sortDirection: paramsIn.sortDirection ? paramsIn.sortDirection : ''
        };
        return this.http.get(url, { params: options });
    }

    /**
     *
     * @param textSearch
     * @returns an Observable with json dataset as a result
     */
    public queryTextMiner(textSearch: string): Observable<any> {
        return this.http.post(textMinerUrl, { payload: textSearch });
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
