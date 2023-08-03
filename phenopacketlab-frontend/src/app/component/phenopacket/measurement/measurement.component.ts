import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Measurement } from 'src/app/models/measurement';
import { Phenopacket } from 'src/app/models/phenopacket';
// import { Utils } from '../../shared/utils';

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
export class MeasurementComponent implements OnInit {

    @Input()
    measurements: Measurement[];
    @Input()
    phenopacket: Phenopacket;
    @Output() onMeasurementsChanged = new EventEmitter<Measurement[]>();

    ref: DynamicDialogRef;

    constructor(public dialogService: DialogService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
    }

    /**
     * TODO: Add a new measurement with default values or no values
     */
    addMeasurement(measurement?: Measurement) {
        // if (measurement === undefined || measurement === null) {
        //     measurement = new Measurement();
        // }
        // this.ref = this.dialogService.open(MeasurementDetailDialogComponent, {
        //     header: 'Edit Measurement',
        //     width: '70%',
        //     contentStyle: { 'overflow': 'auto' },
        //     baseZIndex: 10000,
        //     resizable: true,
        //     draggable: true,
        //     data: { measurement: measurement,
        //             phenopacket: this.phenopacket }
        // });

        // this.ref.onClose.subscribe((measure: Measurement) => {
        //     if (measure) {
        //         const indexToUpdate = this.measurements.findIndex(item => item.assay.id === measure.assay.id);
        //         if (indexToUpdate === -1) {
        //             measure.key = Utils.getBiggestKey(this.measurements) + 1;
        //             this.measurements.push(measure);
        //         } else {
        //             this.measurements[indexToUpdate] = measure;
        //             this.measurements = Object.assign([], this.measurements);
        //         }
        //         // emit change
        //         this.onMeasurementsChanged.emit(this.measurements);
        //     }
        // });
    }

    /**
     * TODO
     * @param measurement
     */
    deleteMeasurement(measurement: Measurement) {
        // this.confirmationService.confirm({
        //   message: 'Are you sure you want to delete \'' + measurement.assay?.id + '\'?',
        //   header: 'Confirm',
        //   icon: 'pi pi-exclamation-triangle',
        //   accept: () => {
        //     this.measurements = this.measurements.filter(val => val.key !== measurement.key);
        //     // emit change
        //     this.onMeasurementsChanged.emit(this.measurements);
        //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Measurement Deleted', life: 3000 });
        //   },
        //   reject: () => {
        //     this.confirmationService.close();
        //   }
        // });
      }

    getValue(measurement: Measurement) {
        let measurementValue;
        if (measurement.value) {
            measurementValue = measurement.value;
        } else if (measurement.complexValue) {
            measurementValue = measurement.complexValue;
        } else {
            return '';
        }
        return measurementValue.toString();
    }

}

