import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const phenotypicFeatureSearchUrl = environment.PHENOPACKETLAB_API_PHENOTYPIC_FEATURE_SEARCH_URL;

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private http: HttpClient) {
    }

    public queryPhenotypicFeature(paramsIn: any): Observable<any> {
        return this.sendPhenotypicFeatureQueryRequest(paramsIn, phenotypicFeatureSearchUrl);
    }

    private sendPhenotypicFeatureQueryRequest(paramsIn: any, url: string): Observable<any> {
        const options = {
            phenopacketId: paramsIn.phenoId,
            max: paramsIn.max ? paramsIn.max : '',
            offset: paramsIn.offset ? paramsIn.offset : '',
            sortBy: paramsIn.sortBy ? paramsIn.sortBy : '',
            sortDirection: paramsIn.sortDirection ? paramsIn.sortDirection : ''
        }
        return this.http.get(url, { params: options });
    }

}
