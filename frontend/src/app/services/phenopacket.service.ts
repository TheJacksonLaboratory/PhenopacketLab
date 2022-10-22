import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Phenopacket } from '../models/phenopacket';

const phenopacketValidateUrl = environment.PHENO_VALIDATE_URL;
const modifiersUrl = environment.MODIFIERS_URL;

@Injectable({
    providedIn: 'root'
})
export class PhenopacketService {

    phenopacket: Phenopacket;
    phenopacketSubject = new Subject<Phenopacket>();

    private validated = new Subject<any>();
    validated$ = this.validated.asObservable();

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
        const options = {
            phenopacket: phenopacket
        };
        return this.http.get(phenopacketValidateUrl, { params: options });
    }

    getModifiers(): Observable<any> {
        return this.http.get(modifiersUrl);
    }
}
