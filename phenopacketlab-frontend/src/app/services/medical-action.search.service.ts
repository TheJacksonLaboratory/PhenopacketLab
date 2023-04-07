import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseSearchService } from './base-search.service';

const bodySitesUrl = environment.PHENOPACKETLAB_BODY_SITE_URL;

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

    // public queryBodySiteById(id: string): Observable<any> {
    //     return this.http.get(`${bodySitesUrl}/${id}`);
    // }
}
