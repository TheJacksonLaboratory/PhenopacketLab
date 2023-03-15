import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const functionalAnnotationUrl = environment.FUNCTIONAL_ANNOTATION_URL;
const allelicStatesUrl = environment.ALLELIC_STATE_URL;

@Injectable({
    providedIn: 'root'
})
export class InterpretationService {

    constructor(private http: HttpClient) {
    }

    public queryFunctionalAnnotationByHGVS(hgvs: string, assembly: string, transcript: string): Observable<any> {
        return this.http.get(`${functionalAnnotationUrl}/${assembly}/${hgvs}/${transcript}`);
    }

    public getAllelicStates(): Observable<any> {
        return this.http.get(allelicStatesUrl);
    }

}
