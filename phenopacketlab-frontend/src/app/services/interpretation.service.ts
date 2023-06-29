import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DialogService } from 'primeng/dynamicdialog';
import { SpinnerDialogComponent } from '../component/shared/spinner-dialog/spinner-dialog.component';

const functionalAnnotationUrl = environment.FUNCTIONAL_ANNOTATION_URL;
const allelicStatesUrl = environment.ALLELIC_STATE_URL;
const structuralTypeUrl = environment.STRUCTURAL_TYPE_URL;

@Injectable({
    providedIn: 'root'
})
export class InterpretationService {

    allelicStates = new BehaviorSubject<any>(undefined);
    structuralTypes = new BehaviorSubject<any>(undefined);

    constructor(private http: HttpClient) {
    }

    public queryFunctionalAnnotationByHGVS(hgvs: string, assembly: string, transcript: string): Observable<any> {
        return this.http.get(`${functionalAnnotationUrl}/${assembly}/${hgvs}/${transcript}`);
    }

    /**
     * Return allelicStates as an Observable
     * @param dialogService DialogService used for spinnerDialog
     * @returns
     */
    getAllelicStates(dialogService: DialogService): Observable<any> {
        // only if undefined, load from server
        if (this.allelicStates.getValue() === undefined) {
            console.log('Loading allelic states...');
            this.loadAllelicStates(dialogService);
        }
        // return allelicStates for subscription even if the value is yet undefined.
        return this.allelicStates.asObservable();
    }

    private loadAllelicStates(dialogService: DialogService): void {
        const spinnerDialogRef = dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true,
            data: { loadingMessage: 'Loading allelic states terms...' }
        });
        this.http.get(allelicStatesUrl).subscribe(res => {
            this.allelicStates.next(res);
            spinnerDialogRef.close();
        }, (error) => {
            console.log(error);
            spinnerDialogRef.close();
        });
    }

    /**
     * Return StructuralTypes as an Observable
     * @param dialogService DialogService used for spinnerDialog
     * @returns
     */
    getStructuralTypes(dialogService: DialogService): Observable<any> {
        // only if undefined, load from server
        if (this.structuralTypes.getValue() === undefined) {
            console.log('Loading Structural Types...');
            this.loadStructuralTypes(dialogService);
        }
        // return StructuralTypes for subscription even if the value is yet undefined.
        return this.structuralTypes.asObservable();
    }

    private loadStructuralTypes(dialogService: DialogService): void {
        const spinnerDialogRef = dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true,
            data: { loadingMessage: 'Loading Structural Types terms...' }
        });
        this.http.get(structuralTypeUrl).subscribe(res => {
            this.structuralTypes.next(res);
            spinnerDialogRef.close();
        }, (error) => {
            console.log(error);
            spinnerDialogRef.close();
        });
    }

}
