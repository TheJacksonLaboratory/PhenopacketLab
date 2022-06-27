import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';

import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';
import { MedicalAction } from 'src/app/models/medical-action';
import { MedicalActionDetailDialogComponent } from './medical-action-detail/medical-action-detail-dialog/medical-action-detail-dialog.component';
import { Disease } from 'src/app/models/disease';

@Component({
    selector: 'app-medical-action',
    templateUrl: './medical-action.component.html',
    styleUrls: ['./medical-action.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class MedicalActionComponent implements AfterViewInit, OnInit {
    // search params
    itemName = "Medical Action";

    @ViewChild('medicalActionPaginator', { static: true }) medicalActionPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    //Table items
    displayedColumns = ['icon', 'action', 'id', 'target', 'intent', 'remove'];

    medicalActionDataSource = new MatTableDataSource<MedicalAction>();
    medicalActionCount: number;

    // MatPaginator Inputs
    pageLength = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 50, 100];

    //searchparams
    currSearchParams: any = {}

    expandedElement: MedicalAction | null;
    @Input()
    medicalActions: MedicalAction[] = [];
    @Input()
    diseases: Disease[];

    @Output() onMedicalActionChanged = new EventEmitter<MedicalAction[]>();
    
    dialogRef: any;
    spinnerDialogRef: any;

    constructor(public dialog: MatDialog) {
    }

    ngOnInit() {

        // load example data
        // this.phenotypicDataSource = new PhenotypicFeatureData().PHENOTYPIC_DATA;
        this.medicalActionDataSource.data = this.medicalActions;
        this.onMedicalActionChanged.emit(this.medicalActions);

    }

    ngAfterViewInit() {

    }

    /**
     * Add a new medical action with default values or no values
     */
    addMedicalAction(medicalAction?: MedicalAction) {
        if (medicalAction === undefined) {
            // Add through a dialog to choose from type of Actions
            // let action = new MedicalAction();
            const medicalActionDetailData = { 'title': 'Edit medical action' };
            medicalActionDetailData['diseases'] = this.diseases;
            medicalActionDetailData['displayCancelButton'] = true;
            const dialogRef = this.dialog.open(MedicalActionDetailDialogComponent, {
              width: '1000px',
              data: medicalActionDetailData
            });
            dialogRef.afterClosed().subscribe(result => {
              if (result !== undefined) {
                let updatedMedicalAction = result.medical_action;
                if (updatedMedicalAction) {
                  // update medical action
                  let medicalAction = updatedMedicalAction;
                  console.log(medicalAction);
                  this.medicalActions.push(medicalAction);

                //   this.updateMedicalActionAction();
                  // emit change
                  // this.onFeatureChanged.emit(this.phenotypicFeature);
                }
              }
            });

            // this.medicalActions.push(action);
        } else {
            this.medicalActions.push(medicalAction);
        }
        this.medicalActionDataSource.data = this.medicalActions;
        this.onMedicalActionChanged.emit(this.medicalActions);

        // TODO push changes to api
    }

    /**
     * Removes the chosen element, if ok is pressed on the popup window.
     * @param element 
     * @returns 
     */
    deleteMedicalAction(element: MedicalAction) {
        const msgData = { 'title': 'Delete Medical Action' };
        msgData['description'] = `Delete the Medical Action with the ID "${element.action.id}" ?`;
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

    removeFromDatasource(medicalAction: MedicalAction) {
        this.medicalActions.forEach((element, index) => {
            if (element == medicalAction) {
                this.medicalActions.splice(index, 1);
            }
        });
        this.medicalActionDataSource.data = this.medicalActions;
        this.onMedicalActionChanged.emit(this.medicalActions);

    }

    private clearSort() {
        this.sort.sort({ id: '', start: 'asc', disableClear: false });
    }

    doPageChange(pageEvent: any) {

        // if (this.currSearchParams) {
        //     this.currSearchParams.offset = pageEvent.pageIndex * pageEvent.pageSize;
        //     this.currSearchParams.max = pageEvent.pageSize;
        //     this._getPhenotypicFeatures(this.currSearchParams);
        // }
    }

    expandCollapse(element: any) {
        this.expandedElement = this.expandedElement === element ? null : element

    }

}

