import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";

const hpoDiseasesUrl = environment.HPO_DISEASE_URL;

@Injectable({
    providedIn: 'root'
})
export class DiseaseSearchService {

    selectedSearchItems: any;
    selectedSearchItemSubject: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        this.selectedSearchItems = {}
        this.selectedSearchItemSubject = new BehaviorSubject(this.selectedSearchItems)
    }

    getSelectedSearchItems() {
        return this.selectedSearchItems;
    }

    setSelectedSearchItems(searchItems: any) {
        console.log(searchItems)

        this.selectedSearchItems = searchItems;
        this.selectedSearchItemSubject.next(searchItems);
    }

    public getAllHpoDiseases(): Observable<any> {
        return this.http.get(hpoDiseasesUrl);
    }

    public queryDiseases(paramsIn: any): Observable<any> {
        return this.sendDiseaseQueryRequest(paramsIn, hpoDiseasesUrl);
    }

    public queryDiseasesById(id: string): Observable<any> {
        console.log("id:");
        console.log(id);
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