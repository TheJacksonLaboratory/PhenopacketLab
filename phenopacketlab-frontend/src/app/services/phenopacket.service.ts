import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Phenopacket } from '../models/phenopacket';
import { ProfileSelection } from '../models/profile';

const phenopacketValidateUrl = environment.PHENO_VALIDATE_URL;
const modifiersUrl = environment.MODIFIERS_URL;
const evidencesUrl = environment.EVIDENCES_URL;
const mondoDiseasesUrl = environment.MONDO_DISEASES_URL;
const onsetsUrl = environment.ONSETS_URL;
const tnmTumorFindingsUrl = environment.TNM_TUMOR_URL;
const tnmNodeFindingsUrl = environment.TNM_NODE_URL;
const tnmMetastasisFindingsUrl = environment.TNM_METASTASIS_URL;
const diseaseStagesUrl = environment.DISEASE_STAGES_URL;
const sexUrl = environment.SEX_URL;
const genderUrl = environment.GENDER_URL;
const lateralityUrl = environment.LATERALITY_URL;
const severityUrl = environment.SEVERITY_URL;

@Injectable({
    providedIn: 'root'
})
export class PhenopacketService {

    phenopacket: Phenopacket;
    phenopacketSubject = new Subject<Phenopacket>();

    // BehaviorSubject used to store data
    modifiers = new BehaviorSubject<any>(undefined);
    evidences = new BehaviorSubject<any>(undefined);
    sexes = new BehaviorSubject<any>(undefined);
    onsets = new BehaviorSubject<any>(undefined);
    lateralities = new BehaviorSubject<any>(undefined);
    severities = new BehaviorSubject<any>(undefined);
    tnmTumorFindings = new BehaviorSubject<any>(undefined);
    tnmNodeFindings = new BehaviorSubject<any>(undefined);
    tnmMetastasisFindings = new BehaviorSubject<any>(undefined);
    diseaseStages = new BehaviorSubject<any>(undefined);

    profileSelection = new BehaviorSubject<ProfileSelection>(ProfileSelection.ALL_AVAILABLE);
    isPrivateInfoWarnSelected = new BehaviorSubject<boolean>(false);
    isInterpretationPrivateInfoWarnSelected = new BehaviorSubject<boolean>(false);

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
        const headers = { 'content-type': 'text/plain' };
        return this.http.post(phenopacketValidateUrl, phenopacket, { headers });
    }

    /**
     * Return modifiers as an Observable
     * @returns
     */
    getModifiers(): Observable<any> {
        // only if undefined, load from server
        if (this.modifiers.getValue() === undefined) {
            console.log('Loading modifiers...');
            this.http.get(modifiersUrl).subscribe(res => {
                this.modifiers.next(res);
            }, (error) => {
                console.log(error);
            });
        }
        // return modifiers for subscription even if the value is yet undefined.
        return this.modifiers.asObservable();
    }

    /**
     * Return evidences as an Observable
     * @returns
     */
    getEvidences(): Observable<any> {
        // only if undefined, load from server
        if (this.evidences.getValue() === undefined) {
            console.log('Loading evidences...');
            this.http.get(evidencesUrl).subscribe(res => {
                this.evidences.next(res);
            }, (error) => {
                console.log(error);
            });        }
        // return evidences for subscription even if the value is yet undefined.
        return this.evidences.asObservable();
    }

    /**
     * Return sex as an Observable
     * @returns
     */
    getSex(): Observable<any> {
        // only if undefined, load from server
        if (this.sexes.getValue() === undefined) {
            console.log('Loading sexes...');
            this.http.get(sexUrl).subscribe(res => {
                this.sexes.next(res);
            }, (error) => {
                console.log(error);
            });        }
        // return evidences for subscription even if the value is yet undefined.
        return this.sexes.asObservable();
    }

    /**
     * Return onsets as an Observable
     * @returns
     */
    getOnsets(): Observable<any> {
        // only if undefined, load from server
        if (this.onsets.getValue() === undefined) {
            console.log('Loading onsets...');
            this.http.get(onsetsUrl).subscribe(res => {
                this.onsets.next(res);
            }, (error) => {
                console.log(error);
            });        }
        // return onsets for subscription even if the value is yet undefined.
        return this.onsets.asObservable();
    }

    /**
     * Return lateralities as an Observable
     * @returns
     */
    getLateralities(): Observable<any> {
        // only if undefined, load from server
        if (this.lateralities.getValue() === undefined) {
            console.log('Loading lateralities...');
            this.http.get(lateralityUrl).subscribe(res => {
                this.lateralities.next(res);
            }, (error) => {
                console.log(error);
            });        }
        // return lateralities for subscription even if the value is yet undefined.
        return this.lateralities.asObservable();
    }

    /**
     * Return severities as an Observable
     * @returns
     */
    getSeverities(): Observable<any> {
        // only if undefined, load from server
        if (this.severities.getValue() === undefined) {
            console.log('Loading severities...');
            this.http.get(severityUrl).subscribe(res => {
                this.severities.next(res);
            }, (error) => {
                console.log(error);
            });        }
        // return severities for subscription even if the value is yet undefined.
        return this.severities.asObservable();
    }

    /**
     * Return tnmTumorFindings as an Observable
     * @returns
     */
    getTnmTumorFindings(): Observable<any> {
        // only if undefined, load from server
        if (this.tnmTumorFindings.getValue() === undefined) {
            console.log('Loading tnmTumorFindings...');
            this.http.get(tnmTumorFindingsUrl).subscribe(res => {
                this.tnmTumorFindings.next(res);
            }, (error) => {
                console.log(error);
            });        }
        // return severities for subscription even if the value is yet undefined.
        return this.tnmTumorFindings.asObservable();
    }

    /**
     * Return tnmNodeFindings as an Observable
     * @returns
     */
    getTnmNodeFindings(): Observable<any> {
        // only if undefined, load from server
        if (this.tnmNodeFindings.getValue() === undefined) {
            console.log('Loading tnmNodeFindings...');
            this.http.get(tnmNodeFindingsUrl).subscribe(res => {
                this.tnmNodeFindings.next(res);
            }, (error) => {
                console.log(error);
            });        }
        // return severities for subscription even if the value is yet undefined.
        return this.tnmNodeFindings.asObservable();
    }

    /**
     * Return TnmMetastasisFindings as an Observable
     * @returns
     */
    getTnmMetastasisFindings(): Observable<any> {
        // only if undefined, load from server
        if (this.tnmMetastasisFindings.getValue() === undefined) {
            console.log('Loading TnmMetastasisFindings...');
            this.http.get(tnmMetastasisFindingsUrl).subscribe(res => {
                this.tnmMetastasisFindings.next(res);
            }, (error) => {
                console.log(error);
            });        }
        // return severities for subscription even if the value is yet undefined.
        return this.tnmMetastasisFindings.asObservable();
    }

    /**
     * Return diseaseStages as an Observable
     * @returns
     */
    getDiseaseStages(): Observable<any> {
        // only if undefined, load from server
        if (this.diseaseStages.getValue() === undefined) {
            console.log('Loading diseaseStages...');
            this.http.get(diseaseStagesUrl).subscribe(res => {
                this.diseaseStages.next(res);
            }, (error) => {
                console.log(error);
            });        }
        // return severities for subscription even if the value is yet undefined.
        return this.diseaseStages.asObservable();
    }

    // getMondoDiseases(): Observable<any> {
    //     return this.http.get(mondoDiseasesUrl);
    // }

    // getGender(): Observable<any> {
    //     return this.http.get(genderUrl);
    // }

    setProfileSelection(profile: ProfileSelection) {
        this.profileSelection.next(profile);
    }
    getProfileSelection(): Observable<ProfileSelection> {
        return this.profileSelection.asObservable();
    }
    setPrivateInfoWarnSelected(isPrivateInfoWarnSelected: boolean) {
        this.isPrivateInfoWarnSelected.next(isPrivateInfoWarnSelected);
    }
    getIsPrivateInfoWarnSelected(): Observable<boolean> {
        return this.isPrivateInfoWarnSelected.asObservable();
    }
    setInterpretationPrivateInfoWarnSelected(isInterpretationPrivateInfoWarnSelected: boolean) {
        this.isInterpretationPrivateInfoWarnSelected.next(isInterpretationPrivateInfoWarnSelected);
    }
    getInterpretationIsPrivateInfoWarnSelected(): Observable<boolean> {
        return this.isInterpretationPrivateInfoWarnSelected.asObservable();
    }
}

