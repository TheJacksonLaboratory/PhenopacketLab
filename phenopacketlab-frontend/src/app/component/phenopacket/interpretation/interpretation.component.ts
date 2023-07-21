import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Interpretation } from 'src/app/models/interpretation';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Phenopacket } from 'src/app/models/phenopacket';
import { InterpretationDialogComponent } from '../../shared/dialog/interpretation-dialog/interpretation-dialog.component';
import { DialogMode } from 'src/app/models/base';
import { Utils } from '../../shared/utils';

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
export class InterpretationComponent implements OnInit {

    @Input()
    interpretations: Interpretation[];
    @Input()
    phenopacket: Phenopacket;
    @Output()
    onInterpretationsChange = new EventEmitter<Interpretation[]>();

    ref: DynamicDialogRef;

    spinnerDialogRef: any;

    constructor(public dialogService: DialogService, public messageService: MessageService,
        public confirmationService: ConfirmationService) {
    }

    ngOnInit() {
    }

    addInterpretation() {
        const interpretation = new Interpretation();
        this.ref = this.dialogService.open(InterpretationDialogComponent, {
            header: 'Add Interpretation',
            width: '60%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            modal: true,
            data: {
                interpretation: interpretation,
                phenopacket: this.phenopacket,
                mode: DialogMode.ADD
            }
        });
        this.ref.onClose.subscribe((interpret: Interpretation) => {
            this.updateInterpretation(interpret);
        });
    }

    editInterpretation(interpretation: Interpretation) {

        this.ref = this.dialogService.open(InterpretationDialogComponent, {
            header: 'Edit Interpretation',
            width: '60%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            modal: true,
            data: {
                interpretation: interpretation,
                phenopacket: this.phenopacket,
                mode: DialogMode.EDIT
            }
        });
        this.ref.onClose.subscribe((interpret: Interpretation) => {
            this.updateInterpretation(interpret);
        });
    }

    updateInterpretation(interpretation: Interpretation) {
        if (interpretation) {
            if (this.interpretations === undefined) {
                this.interpretations = [];
            }
            const indexToUpdate = this.interpretations.findIndex(item => item.id === interpretation.id);
            interpretation.key = Utils.getBiggestKey(this.interpretations) + 1;
            if (indexToUpdate === -1) {
                this.interpretations.push(interpretation);
            } else {
                this.interpretations[indexToUpdate] = interpretation;
                this.interpretations = Object.assign([], this.interpretations);
            }
            // emit change
            this.onInterpretationsChange.emit(this.interpretations);
        }
    }
    deleteInterpretation(interpretation: Interpretation) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete \'' + interpretation.id + '\'?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.interpretations = this.interpretations.filter(val => val.id !== interpretation.id);
                // emit change
                this.onInterpretationsChange.emit(this.interpretations);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Interpretation Deleted', life: 3000 });
            },
            reject: () => {
                this.confirmationService.close();
            }
        });
    }

}

