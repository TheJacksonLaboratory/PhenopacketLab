import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';

import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';
import { DataPresentMatTableDataSource } from '../../shared/DataPresentMatTableDataSource';
import { Interpretation } from 'src/app/models/interpretation';
import { InterpretationDetailDialogComponent } from './interpretation-detail/interpretation-detail-dialog/interpretation-detail-dialog.component';

@Component({
    selector: 'app-interpretation',
    templateUrl: './interpretation.component.html',
    styleUrls: ['./interpretation.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class InterpretationComponent implements AfterViewInit, OnInit {

    //Table items
    displayedColumns = ['id', 'status', 'diagnosis', 'summary', 'remove'];

    interpretationDataSource = new DataPresentMatTableDataSource<Interpretation>();

    expandedElement: Interpretation | null;
    @Input()
    interpretations: Interpretation[];

    dialogRef: any;
    spinnerDialogRef: any;

    constructor(public dialog: MatDialog) {

    }

    ngOnInit() {
        this.updateInterpretation();

    }

    ngAfterViewInit() {

    }

    updateInterpretation() {
        if (this.interpretations) {
            this.interpretationDataSource.data = this.interpretations;
        }

    }
    /**
     * Add a new interpretation(genomic) with default values or no values
     */
    addInterpretation(interpretation?: Interpretation) {
        if (interpretation === undefined) {
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
                        this.interpretations.push(updatedInterpretation);
                        this.interpretationDataSource.data = this.interpretations;
                        // emit change
                    }
                }
            });
            return dialogRef;
        } else {
            this.interpretations.push(interpretation);
        }
        this.interpretationDataSource.data = this.interpretations;

        // TODO push changes to api
    }

    /**
     * Removes the chosen element, if ok is pressed on the popup window.
     * @param element 
     * @returns 
     */
    deleteInterpretation(element: Interpretation) {
        const msgData = { 'title': 'Delete Genomic Interpretation' };
        msgData['description'] = `Delete the Interpretation with the ID "${element?.id}" ?`;
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

    removeFromDatasource(interpretation: Interpretation) {
        if (this.interpretations) {
            this.interpretations.forEach((element, index) => {
                if (element == interpretation) {
                    this.interpretations.splice(index, 1);
                }
            });
            this.interpretationDataSource.data = this.interpretations;
        }
    }

    expandCollapse(element: any) {
        this.expandedElement = this.expandedElement === element ? null : element

    }

}

