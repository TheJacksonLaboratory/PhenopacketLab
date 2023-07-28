import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Phenopacket } from '../models/phenopacket';

const phenopacketValidateUrl = environment.PHENO_VALIDATE_URL;

@Injectable({
    providedIn: 'root'
})
export class PhenopacketService {

    // TODO rename phenopacket to phenopacketStepper (indicate it is used in the stepper)
    phenopacket: Phenopacket;
    phenopacketSubject = new Subject<Phenopacket>();

    constructor(private http: HttpClient) {
    }
    setPhenopacket(phenopacket: Phenopacket) {
        this.phenopacket = phenopacket;
        this.phenopacketSubject.next(phenopacket);
    }
    getPhenopacket(): Observable<Phenopacket> {
        return this.phenopacketSubject.asObservable();
    }

    validatePhenopacket(phenopacket: string): Observable<any> {
        const headers = { 'content-type': 'text/plain' };
        return this.http.post(phenopacketValidateUrl, phenopacket, { headers });
    }
}

