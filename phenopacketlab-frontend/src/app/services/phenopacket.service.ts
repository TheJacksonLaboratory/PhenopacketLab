import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Phenopacket } from '../models/phenopacket';
import { ProfileSelection } from '../models/profile';
import { DialogService } from 'primeng/dynamicdialog';
import { SpinnerDialogComponent } from '../component/shared/spinner-dialog/spinner-dialog.component';

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
     * @param dialogService DialogService used for spinnerDialog
     * @returns
     */
    getModifiers(dialogService: DialogService): Observable<any> {
        // only if undefined, load from server
        if (this.modifiers.getValue() === undefined) {
            console.log('Loading modifiers...');
            this.loadModifiers(dialogService);
        }
        // return modifiers for subscription even if the value is yet undefined.
        return this.modifiers.asObservable();
    }

    private loadModifiers(dialogService: DialogService): void {
        const spinnerDialogRef = dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true,
            data: { loadingMessage: 'Loading modifiers ontology...' }
        });
        this.http.get(modifiersUrl).subscribe(res => {
            this.modifiers.next(res);
            spinnerDialogRef.close();
        }, (error) => {
            console.log(error);
            spinnerDialogRef.close();
        });
    }

    /**
     * Return evidences as an Observable
     * @param dialogService DialogService used for spinnerDialog
     * @returns
     */
    getEvidences(dialogService: DialogService): Observable<any> {
        // only if undefined, load from server
        if (this.evidences.getValue() === undefined) {
            console.log('Loading evidences...');
            this.loadEvidences(dialogService);
        }
        // return evidences for subscription even if the value is yet undefined.
        return this.evidences.asObservable();
    }

    private loadEvidences(dialogService: DialogService): void {
        const spinnerDialogRef = dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true,
            data: { loadingMessage: 'Loading evidences ontology...' }
        });
        this.http.get(evidencesUrl).subscribe(res => {
            this.evidences.next(res);
            spinnerDialogRef.close();
        }, (error) => {
            console.log(error);
            spinnerDialogRef.close();
        });
    }

    /**
     * Return sex as an Observable
     * @param dialogService DialogService used for spinnerDialog
     * @returns
     */
    getSex(dialogService: DialogService): Observable<any> {
        // only if undefined, load from server
        if (this.sexes.getValue() === undefined) {
            console.log('Loading sexes...');
            this.loadSexes(dialogService);
        }
        // return evidences for subscription even if the value is yet undefined.
        return this.sexes.asObservable();
    }

    private loadSexes(dialogService: DialogService): void {
        const spinnerDialogRef = dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true,
            data: { loadingMessage: 'Loading sex terms...' }
        });
        this.http.get(sexUrl).subscribe(res => {
            console.log('result');
            console.log(res);
            this.sexes.next(res);
            spinnerDialogRef.close();
        }, (error) => {
            console.log(error);
            spinnerDialogRef.close();
        });
    }

    /**
     * Return onsets as an Observable
     * @param dialogService DialogService used for spinnerDialog
     * @returns
     */
    getOnsets(dialogService: DialogService): Observable<any> {
        // only if undefined, load from server
        if (this.onsets.getValue() === undefined) {
            console.log('Loading onsets...');
            this.loadOnsets(dialogService);
        }
        // return onsets for subscription even if the value is yet undefined.
        return this.onsets.asObservable();
    }

    private loadOnsets(dialogService: DialogService): void {
        const spinnerDialogRef = dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true,
            data: { loadingMessage: 'Loading onset terms...' }
        });
        this.http.get(onsetsUrl).subscribe(res => {
            this.onsets.next(res);
            spinnerDialogRef.close();
        }, (error) => {
            console.log(error);
            spinnerDialogRef.close();
        });
    }

    /**
     * Return lateralities as an Observable
     * @param dialogService DialogService used for spinnerDialog
     * @returns
     */
    getLateralities(dialogService: DialogService): Observable<any> {
        // only if undefined, load from server
        if (this.lateralities.getValue() === undefined) {
            console.log('Loading lateralities...');
            this.loadLateralities(dialogService);
        }
        // return lateralities for subscription even if the value is yet undefined.
        return this.lateralities.asObservable();
    }

    private loadLateralities(dialogService: DialogService): void {
        const spinnerDialogRef = dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true,
            data: { loadingMessage: 'Loading laterality terms...' }
        });
        this.http.get(lateralityUrl).subscribe(res => {
            this.lateralities.next(res);
            spinnerDialogRef.close();
        }, (error) => {
            console.log(error);
            spinnerDialogRef.close();
        });
    }

    /**
     * Return severities as an Observable
     * @param dialogService DialogService used for spinnerDialog
     * @returns
     */
    getSeverities(dialogService: DialogService): Observable<any> {
        // only if undefined, load from server
        if (this.severities.getValue() === undefined) {
            console.log('Loading severities...');
            this.loadSeverities(dialogService);
        }
        // return severities for subscription even if the value is yet undefined.
        return this.severities.asObservable();
    }

    private loadSeverities(dialogService: DialogService): void {
        const spinnerDialogRef = dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true,
            data: { loadingMessage: 'Loading severity terms...' }
        });
        this.http.get(severityUrl).subscribe(res => {
            this.severities.next(res);
            spinnerDialogRef.close();
        }, (error) => {
            console.log(error);
            spinnerDialogRef.close();
        });
    }

    /**
     * Return tnmTumorFindings as an Observable
     * @param dialogService DialogService used for spinnerDialog
     * @returns
     */
    getTnmTumorFindings(dialogService: DialogService): Observable<any> {
        // only if undefined, load from server
        if (this.tnmTumorFindings.getValue() === undefined) {
            console.log('Loading tnmTumorFindings...');
            this.loadTnmTumorFindings(dialogService);
        }
        // return severities for subscription even if the value is yet undefined.
        return this.severities.asObservable();
    }

    private loadTnmTumorFindings(dialogService: DialogService): void {
        const spinnerDialogRef = dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true,
            data: { loadingMessage: 'Loading tnmTumorFindings terms...' }
        });
        this.http.get(tnmTumorFindingsUrl).subscribe(res => {
            this.tnmTumorFindings.next(res);
            spinnerDialogRef.close();
        }, (error) => {
            console.log(error);
            spinnerDialogRef.close();
        });
    }

    /**
     * Return tnmNodeFindings as an Observable
     * @param dialogService DialogService used for spinnerDialog
     * @returns
     */
    getTnmNodeFindings(dialogService: DialogService): Observable<any> {
        // only if undefined, load from server
        if (this.tnmNodeFindings.getValue() === undefined) {
            console.log('Loading tnmNodeFindings...');
            this.loadTnmNodeFindings(dialogService);
        }
        // return severities for subscription even if the value is yet undefined.
        return this.severities.asObservable();
    }

    private loadTnmNodeFindings(dialogService: DialogService): void {
        const spinnerDialogRef = dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true,
            data: { loadingMessage: 'Loading tnmNodeFindings terms...' }
        });
        this.http.get(tnmNodeFindingsUrl).subscribe(res => {
            this.tnmNodeFindings.next(res);
            spinnerDialogRef.close();
        }, (error) => {
            console.log(error);
            spinnerDialogRef.close();
        });
    }

    /**
     * Return TnmMetastasisFindings as an Observable
     * @param dialogService DialogService used for spinnerDialog
     * @returns
     */
    getTnmMetastasisFindings(dialogService: DialogService): Observable<any> {
        // only if undefined, load from server
        if (this.tnmMetastasisFindings.getValue() === undefined) {
            console.log('Loading TnmMetastasisFindings...');
            this.loadTnmMetastasisFindings(dialogService);
        }
        // return severities for subscription even if the value is yet undefined.
        return this.severities.asObservable();
    }

    private loadTnmMetastasisFindings(dialogService: DialogService): void {
        const spinnerDialogRef = dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true,
            data: { loadingMessage: 'Loading TnmMetastasisFindings terms...' }
        });
        this.http.get(tnmMetastasisFindingsUrl).subscribe(res => {
            this.tnmMetastasisFindings.next(res);
            spinnerDialogRef.close();
        }, (error) => {
            console.log(error);
            spinnerDialogRef.close();
        });
    }

    /**
     * Return diseaseStages as an Observable
     * @param dialogService DialogService used for spinnerDialog
     * @returns
     */
    getDiseaseStages(dialogService: DialogService): Observable<any> {
        // only if undefined, load from server
        if (this.diseaseStages.getValue() === undefined) {
            console.log('Loading diseaseStages...');
            this.loadDiseaseStages(dialogService);
        }
        // return severities for subscription even if the value is yet undefined.
        return this.severities.asObservable();
    }

    private loadDiseaseStages(dialogService: DialogService): void {
        const spinnerDialogRef = dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true,
            data: { loadingMessage: 'Loading diseaseStages terms...' }
        });
        this.http.get(diseaseStagesUrl).subscribe(res => {
            this.diseaseStages.next(res);
            spinnerDialogRef.close();
        }, (error) => {
            console.log(error);
            spinnerDialogRef.close();
        });
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
}

