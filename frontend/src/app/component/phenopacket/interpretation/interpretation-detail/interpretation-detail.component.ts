import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';

import { Measurement } from 'src/app/models/measurement';
import { GenomicInterpretation, Interpretation, ProgressStatus } from 'src/app/models/interpretation';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InterpretationDetailDialogComponent } from './interpretation-detail-dialog/interpretation-detail-dialog.component';
import { DataPresentMatTableDataSource } from 'src/app/component/shared/DataPresentMatTableDataSource';
import { MessageDialogComponent } from 'src/app/component/shared/message-dialog/message-dialog.component';

@Component({
    selector: 'app-interpretation-detail',
    templateUrl: './interpretation-detail.component.html',
    styleUrls: ['./interpretation-detail.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class InterpretationDetailComponent implements AfterViewInit, OnInit {

    disease: string;
    interpretationId: string;
    status: any;
    summary: string;
    statusControl = new UntypedFormControl('');
    statusSubscription: Subscription;

    //Table items
    displayedColumns = ['id', 'status', 'call', 'remove'];

    genoInterpretationDataSource = new DataPresentMatTableDataSource<GenomicInterpretation>();

    expandedElement: Measurement | null;
    @Input()
    interpretation: Interpretation;

    @Output() onInterpretationChanged = new EventEmitter<Interpretation>();

    dialogRef: any;
    spinnerDialogRef: any;

    constructor(public dialog: MatDialog) {

    }

    ngOnInit() {
        this.updateInterpretation();
        if (this.statusSubscription) {
            this.statusSubscription.unsubscribe();
        }
        this.statusSubscription = this.statusControl.valueChanges.subscribe(value => {
            if (value && value.length > 0) {
                if (this.interpretation) {
                    this.interpretation.progressStatus = value;
                    this.onInterpretationChanged.emit(this.interpretation);
                }

            }
        });

    }

    ngAfterViewInit() {

    }

    openEditDialog() {
        const measurementDetailData = { 'title': 'Edit Interpretation' };
        measurementDetailData['interpretation'] = this.interpretation;
        measurementDetailData['displayCancelButton'] = true;
        const dialogRef = this.dialog.open(InterpretationDetailDialogComponent, {
            width: '1000px',
            data: measurementDetailData
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                let updatedInterpretation = result.interpretation;
                if (updatedInterpretation) {
                    // update interpretation
                    this.interpretation = updatedInterpretation;
                    this.updateInterpretation();
                    // emit change
                    // this.onFeatureChanged.emit(this.phenotypicFeature);
                }
            }
        });
        return dialogRef;
    }

    updateInterpretation() {
        if (this.interpretation) {
            this.genoInterpretationDataSource.data = this.interpretation.diagnosis?.genomicInterpretations;
            this.disease = this.interpretation.diagnosis?.disease?.toString();
            this.interpretationId = this.interpretation.id;
            this.status = this.interpretation.progressStatus;
            this.statusControl.setValue(this.status);
            this.summary = this.interpretation.summary;
            this.onInterpretationChanged.emit(this.interpretation);
        }

    }
    /**
     * Add a new interpretation(genomic) with default values or no values
     */
    addInterpretation(genoInterpretation?: GenomicInterpretation) {
        if (genoInterpretation === undefined) {
            // Add through a dialog to choose from type of Actions
            const measurementDetailData = { 'title': 'Edit measurement' };
            measurementDetailData['displayCancelButton'] = true;
            const dialogRef = this.dialog.open(InterpretationDetailDialogComponent, {
                width: '1000px',
                data: measurementDetailData
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result !== undefined) {
                    let updatedInterpretation = result.interpretation;
                    if (updatedInterpretation) {
                        // update measurement
                        this.interpretation = updatedInterpretation;
                        this.genoInterpretationDataSource.data = this.interpretation.diagnosis?.genomicInterpretations;
                        // emit change
                        this.onInterpretationChanged.emit(this.interpretation);
                    }
                }
            });
            return dialogRef;
        } else {
            this.interpretation.diagnosis.genomicInterpretations.push(genoInterpretation);
        }
        this.genoInterpretationDataSource.data = this.interpretation.diagnosis.genomicInterpretations;
        this.onInterpretationChanged.emit(this.interpretation);

        // TODO push changes to api
    }

    /**
     * Removes the chosen element, if ok is pressed on the popup window.
     * @param element 
     * @returns 
     */
    deleteInterpretation(element: GenomicInterpretation) {
        const msgData = { 'title': 'Delete Genomic Interpretation' };
        msgData['description'] = `Delete the Interpretation with the ID "${this.getId(element)}" ?`;
        msgData['displayCancelButton'] = true;
        const dialogRef = this.dialog.open(MessageDialogComponent, {
            width: '400px',
            data: msgData
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'ok') {
                this.removeFromDatasource(element);
            }
        });
        return dialogRef;
    }

    removeFromDatasource(interpretation: GenomicInterpretation) {
        if (this.interpretation.diagnosis) {
            this.interpretation.diagnosis.genomicInterpretations.forEach((element, index) => {
                if (element == interpretation) {
                    this.interpretation.diagnosis.genomicInterpretations.splice(index, 1);
                }
            });
            this.genoInterpretationDataSource.data = this.interpretation.diagnosis.genomicInterpretations;
            this.onInterpretationChanged.emit(this.interpretation);
        }
    }

    expandCollapse(element: any) {
        this.expandedElement = this.expandedElement === element ? null : element

    }

    getId(element: GenomicInterpretation) {
        if (element) {
            return element.subjectOrBiosampleId;
        }
        return "";
    }
    getProgressStatus() {
        return Object.values(ProgressStatus).filter(x => !(parseInt(x) >= 0));
    }
}

