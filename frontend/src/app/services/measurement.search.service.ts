import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseSearchService } from "./base-search.service";

const bodySitesUrl = environment.PHENOPACKETLAB_BODY_SITE_URL;

@Injectable({ providedIn: 'root' })
export class MeasurementService extends BaseSearchService {
    selectedSearchItems: any;
    selectedSearchItemSubject: BehaviorSubject<any>;
    
    constructor(private http: HttpClient) {
        super(http);
        this.selectedSearchItems = {}
        this.selectedSearchItemSubject = new BehaviorSubject(this.selectedSearchItems)
    }

    getSelectedSearchItems() {
        return this.selectedSearchItems;
    }

    setSelectedSearchItems(searchItems: any) {
        this.selectedSearchItems = searchItems;
        this.selectedSearchItemSubject.next(searchItems);
    }

    getAll(): Observable<any> {
        //TODO
        return undefined;
    }
    getAllFromLocalStorage(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }

}