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

        //console.log(paramsIn)

        const genes: string[] = [];
        const hgvsList: string[] = [];
        const mvarIdList: string[] = [];
        const dbSNPidList: string[] = [];

        if (paramsIn.selectedItems) {
            paramsIn.selectedItems.forEach(item => {
                if (item.selectedType === 'gene') {
                    genes.push(item.selectedValue.symbol);
                }
                if (item.selectedType === 'hgvs') {
                    hgvsList.push(item.selectedValue);
                }
                if (item.selectedType === 'mvarId') {
                    mvarIdList.push(item.selectedValue);
                }
                if (item.selectedType === 'dbSNPid') {
                    dbSNPidList.push(item.selectedValue);
                }
            });
        }

        const options = {
            gene: genes,
            type: paramsIn.varType ? paramsIn.varType : [],
            consequence: paramsIn.consequence ? paramsIn.consequence : [],
            hgvs: hgvsList,
            mvarId: mvarIdList,
            dbSNPid: dbSNPidList,
            impact: paramsIn.varImpact ? paramsIn.varImpact : [],
            chr: paramsIn.chr ? paramsIn.chr : '',
            startPos: paramsIn.startPos ? paramsIn.startPos : '',
            endPos: paramsIn.endPos ? paramsIn.endPos : '',
            // default set to 0
            imputed: '0',
            max: paramsIn.max ? paramsIn.max : '',
            offset: paramsIn.offset ? paramsIn.offset : '',
            sortBy: paramsIn.sortBy ? paramsIn.sortBy : '',
            sortDirection: paramsIn.sortDirection ? paramsIn.sortDirection : ''
        }
        return this.http.get(url, { params: options });
    }

}
