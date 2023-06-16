import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OntologyClass, TimeElement } from '../models/base';
import { DialogService } from 'primeng/dynamicdialog';
import { SpinnerDialogComponent } from '../component/shared/spinner-dialog/spinner-dialog.component';

const phenopacketDiseasesUrl = environment.PHENOPACKETLAB_DISEASE_URL;
const hpoDiseasesUrl = environment.HPO_DISEASE_URL;

@Injectable({
    providedIn: 'root'
})
export class DiseaseSearchService {

    diseases = new BehaviorSubject<any>(undefined);

    onset = new Subject<TimeElement>();
    resolution = new Subject<TimeElement>();
    tnmFindings = new Subject<OntologyClass[]>();
    diseaseStages = new Subject<OntologyClass[]>();

    constructor(private http: HttpClient) {
    }

    // return diseases as an Observable
    getDiseases(dialogService: DialogService): Observable<any> {
        // only if undefined, load from server
        if (this.diseases.getValue() === undefined) {
            console.log('Loading diseases...');
            this.loadDiseases(dialogService);
        }
        // return diseases for subscription even if the value is yet undefined.
        return this.diseases.asObservable();
    }

    private loadDiseases(dialogService: DialogService): void {
        const spinnerDialogRef = dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true,
            data: { loadingMessage: 'Loading disease ontology...' }
        });
        this.http.get(phenopacketDiseasesUrl).subscribe(res => {
            this.diseases.next(res);
            spinnerDialogRef.close();
        }, (error) => {
            console.log(error);
            spinnerDialogRef.close();
        });
    }

    // getAll(): Observable<any> {
    //     return this.getAllHpoDiseases();
    // }

    // public getAllHpoDiseases(): Observable<any> {
    //     return this.http.get(phenopacketDiseasesUrl);
    // }

    // public queryDiseases(paramsIn: any): Observable<any> {
    //     return this.sendDiseaseQueryRequest(paramsIn, phenopacketDiseasesUrl);
    // }

    // public queryDiseasesById(id: string): Observable<any> {
    //     return this.http.get(`${hpoDiseasesUrl}/${id}`);
    // }

    // private sendDiseaseQueryRequest(paramsIn: any, url: string): Observable<any> {
    //     const nameList: string[] = [];
    //     if (paramsIn.selectedItems) {
    //         paramsIn.selectedItems.forEach(item => {
    //             nameList.push(item.selectedValue.name);
    //         });
    //     }

    //     const options = {
    //         name: nameList,
    //         max: paramsIn.max ? paramsIn.max : '',
    //         offset: paramsIn.offset ? paramsIn.offset : '',
    //         sortBy: paramsIn.sortBy ? paramsIn.sortBy : '',
    //         sortDirection: paramsIn.sortDirection ? paramsIn.sortDirection : ''
    //     };
    //     return this.http.get(url, { params: options });
    // }

    getDiseaseOnset(): Observable<TimeElement> {
        return this.onset.asObservable();
    }

    setDiseaseOnset(onset: TimeElement) {
        this.onset.next(onset);
    }
    getDiseaseResolution(): Observable<TimeElement> {
        return this.resolution.asObservable();
    }

    setDiseaseResolution(resolution: TimeElement) {
        this.resolution.next(resolution);
    }

    getTnmFindings(): Observable<OntologyClass[]> {
        return this.tnmFindings.asObservable();
    }
    setTnmFindings(findings: OntologyClass[]) {
        this.tnmFindings.next(findings);
    }

    getStages(): Observable<OntologyClass[]> {
        return this.diseaseStages.asObservable();
    }
    setStages(stages: OntologyClass[]) {
        this.diseaseStages.next(stages);
    }
}
