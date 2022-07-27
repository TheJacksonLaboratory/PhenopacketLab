import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';

import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';
import { ComplexValue, Measurement, Quantity, Value } from 'src/app/models/measurement';
import { MeasurementDetailDialogComponent } from './measurement-detail/measurement-detail-dialog/measurement-detail-dialog.component';
import { DataPresentMatTableDataSource } from '../../shared/DataPresentMatTableDataSource';
import { OntologyClass } from 'src/app/models/base';

@Component({
    selector: 'app-measurement',
    templateUrl: './measurement.component.html',
    styleUrls: ['./measurement.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class MeasurementComponent implements AfterViewInit, OnInit {


    @ViewChild('measurementPaginator', { static: true }) measurementPaginator: MatPaginator;
    // @ViewChild(MatSort, { static: true }) sort: MatSort;

    //Table items
    displayedColumns = ['assay', 'value', 'procedure', 'time', 'remove'];

    measurementDataSource = new DataPresentMatTableDataSource<Measurement>();
    measurementCount: number;

    // MatPaginator Inputs
    pageLength = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 50, 100];

    //searchparams
    currSearchParams: any = {}

    expandedElement: Measurement | null;
    @Input()
    measurements: Measurement[];

    @Output() onMeasurementsChanged = new EventEmitter<Measurement[]>();

    dialogRef: any;
    spinnerDialogRef: any;

    constructor(public dialog: MatDialog) {
    }

    ngOnInit() {
        if (this.measurements === undefined) {
            this.measurements = [];
        }
        this.measurementDataSource.data = this.measurements;
        this.onMeasurementsChanged.emit(this.measurements);

    }

    ngAfterViewInit() {

    }

    /**
     * Add a new measurement with default values or no values
     */
    addMeasurement(measurement?: Measurement) {
        if (measurement === undefined) {
            // Add through a dialog to choose from type of Actions
            const measurementDetailData = { 'title': 'Edit measurement' };
            measurementDetailData['displayCancelButton'] = true;
            const dialogRef = this.dialog.open(MeasurementDetailDialogComponent, {
                width: '1000px',
                data: measurementDetailData
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result !== undefined) {
                    let updatedMeasurement = result.measurement;
                    console.log('measurement:');
                    console.log(updatedMeasurement);
                    if (updatedMeasurement) {
                        // update measurement
                        let medicalAction = updatedMeasurement;
                        this.measurements.push(medicalAction);
                        this.measurementDataSource.data = this.measurements;
                        // emit change
                        this.onMeasurementsChanged.emit(this.measurements);
                    }
                }
            });
            return dialogRef;
        } else {
            this.measurements.push(measurement);
        }
        this.measurementDataSource.data = this.measurements;
        this.onMeasurementsChanged.emit(this.measurements);

        // TODO push changes to api
    }

    /**
     * Removes the chosen element, if ok is pressed on the popup window.
     * @param element 
     * @returns 
     */
    deleteMeasurement(element: Measurement) {
        const msgData = { 'title': 'Delete Measurement' };
        msgData['description'] = `Delete the Measurement with the ID "${this.getId(element)}" ?`;
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

    removeFromDatasource(measurement: Measurement) {
        this.measurements.forEach((element, index) => {
            if (element == measurement) {
                this.measurements.splice(index, 1);
            }
        });
        this.measurementDataSource.data = this.measurements;
        this.onMeasurementsChanged.emit(this.measurements);

    }

    /**
     * Retrieve the correct measurement id
     * @param measurement 
     * @returns id
     */
    getId(measurement: Measurement) {
        if (measurement) {
            return measurement.assay.id;
        }
        return '';
    }

    /**
     * Retrieve the assay
     * @param measurement 
     * @returns assay
     */
    getAssay(measurement: Measurement) {
        let assay = measurement.assay;
        if (assay) {
            return assay.toString();
        }
        return '';
    }

    getValue(measurement: Measurement) {
        if (measurement.measurementValue) {
            let measurementValue = measurement.measurementValue;
            return measurementValue.toString();  
        }
        return '';
    }

    getProcedure(measurement: Measurement) {
        let procedure = measurement.procedure;
        if (procedure) {
            return procedure.toString();
        }
        return '';
    }

    getTimeOfMeasurement(measurement: Measurement) {
        let tom = measurement.timeObserved;
        if (tom) {
            return `${tom.toString()}`;
        }
        return '';
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

