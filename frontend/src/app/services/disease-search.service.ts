import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseSearchService } from "./base-search.service";
  
const phenopacketDiseasesUrl = environment.PHENOPACKETLAB_DISEASE_URL;
const hpoDiseasesUrl = environment.HPO_DISEASE_URL;

@Injectable({
    providedIn: 'root'
})
export class DiseaseSearchService extends BaseSearchService {

    selectedSearchItems: any;
    selectedSearchItemSubject: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        super(http);
        this.selectedSearchItems = {}
        this.selectedSearchItemSubject = new BehaviorSubject(this.selectedSearchItems)
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
        return this.http.get(hpoDiseasesUrl + '/' + id);
    }

    private sendDiseaseQueryRequest(paramsIn: any, url: string): Observable<any> {
        //console.log(paramsIn)
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
        }
        return this.http.get(url, { params: options });
    }

}