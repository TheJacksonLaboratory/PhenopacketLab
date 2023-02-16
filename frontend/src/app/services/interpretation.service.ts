import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const variantValidatorUrl = environment.VARIANT_VALIDATOR_URL;

@Injectable({
    providedIn: 'root'
})
export class InterpretationService {

    constructor(private http: HttpClient) {
    }

    public queryVariantValidatorByHGVS(hgvs: string, assembly: string, transcript: string): Observable<any> {
        return this.http.get(`${variantValidatorUrl}?build=${assembly}&description=${hgvs}&transcript=${transcript}`);
    }

}
