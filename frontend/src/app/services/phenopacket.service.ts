import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfileSelection } from '../component/pheno-creator/profile-selection/profile-selection.component';
import { Phenopacket } from '../models/phenopacket';

const phenopacketValidateUrl = environment.PHENO_VALIDATE_URL;
const modifiersUrl = environment.MODIFIERS_URL;
const mondoDiseasesUrl = environment.MONDO_DISEASES_URL;
const onsetsUrl = environment.ONSETS_URL;
const tnmFindingsUrl = environment.TNM_FINDINGS_URL;

@Injectable({
    providedIn: 'root'
})
export class PhenopacketService {

    phenopacket: Phenopacket;
    phenopacketSubject = new Subject<Phenopacket>();

    profileSelection = new BehaviorSubject<ProfileSelection>(ProfileSelection.ALL_AVAILABLE);

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
    getMondoDiseases(): Observable<any> {
        return this.http.get(mondoDiseasesUrl);
    }
    getOnsets(): Observable<any> {
        return this.http.get(onsetsUrl);
    }
    getTnmFindings(): Observable<any> {
        return this.http.get(tnmFindingsUrl);
    }
    setProfileSelection(profile: ProfileSelection) {
        this.profileSelection.next(profile);
    }
    getProfileSelection(): Observable<ProfileSelection> {
        return this.profileSelection.asObservable();
    }
 }

