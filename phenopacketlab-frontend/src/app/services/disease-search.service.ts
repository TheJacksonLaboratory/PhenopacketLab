import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OntologyClass, TimeElement } from '../models/base';
import { BaseSearchService } from './base-search.service';

const phenopacketDiseasesUrl = environment.PHENOPACKETLAB_DISEASE_URL;
const hpoDiseasesUrl = environment.HPO_DISEASE_URL;

@Injectable({
    providedIn: 'root'
})
export class DiseaseSearchService extends BaseSearchService {

    selectedSearchItems: any;
    selectedSearchItemSubject: BehaviorSubject<any>;

    onset = new Subject<TimeElement>();
    resolution = new Subject<TimeElement>();
    tnmFindings = new Subject<OntologyClass[]>();
    diseaseStages = new Subject<OntologyClass[]>();

    constructor(private http: HttpClient) {
        super(http);
        this.selectedSearchItems = {};
        this.selectedSearchItemSubject = new BehaviorSubject(this.selectedSearchItems);
    }
    getAll(): Observable<any> {
        return this.getAllHpoDiseases();
    }

    getSelectedSearchItems() {
        return this.selectedSearchItems;
    }

    setSelectedSearchItems(searchItems: any) {
        this.selectedSearchItems = searchItems;
        this.selectedSearchItemSubject.next(searchItems);
    }

    public getAllHpoDiseases(): Observable<any> {
        return this.http.get(phenopacketDiseasesUrl);
    }

    public queryDiseases(paramsIn: any): Observable<any> {
        return this.sendDiseaseQueryRequest(paramsIn, phenopacketDiseasesUrl);
    }

    public queryDiseasesById(id: string): Observable<any> {
        return this.http.get(`${hpoDiseasesUrl}/${id}`);
    }

    private sendDiseaseQueryRequest(paramsIn: any, url: string): Observable<any> {
        const nameList: string[] = [];
        if (paramsIn.selectedItems) {
            paramsIn.selectedItems.forEach(item => {
                nameList.push(item.selectedValue.name);
            });
        }

        const options = {
            name: nameList,
            max: paramsIn.max ? paramsIn.max : '',
            offset: paramsIn.offset ? paramsIn.offset : '',
            sortBy: paramsIn.sortBy ? paramsIn.sortBy : '',
            sortDirection: paramsIn.sortDirection ? paramsIn.sortDirection : ''
        };
        return this.http.get(url, { params: options });
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