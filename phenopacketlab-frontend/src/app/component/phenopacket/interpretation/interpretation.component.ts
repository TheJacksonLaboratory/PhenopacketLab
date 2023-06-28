import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Interpretation } from 'src/app/models/interpretation';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Phenopacket } from 'src/app/models/phenopacket';
import { InterpretationDialogComponent } from '../../shared/dialog/interpretation-dialog/interpretation-dialog.component';

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
    showTable = false;

    constructor(public dialogService: DialogService, public messageService: MessageService,
        public confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        if (this.interpretations && this.interpretations.length > 0) {
            this.showTable = true;
        }
    }

    /**
     * Add a new interpretation(genomic) with default values or no values
     */
    addInterpretation(interpretation?: Interpretation) {
        if (interpretation === undefined || interpretation === null) {
            interpretation = new Interpretation();
        }
        this.ref = this.dialogService.open(InterpretationDialogComponent, {
            header: 'Enter Interpretation',
            width: '70%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            data: { interpretation: interpretation,
                    phenopacket: this.phenopacket }
        });

        this.ref.onClose.subscribe((interpret: Interpretation) => {
            if (interpret) {
                const indexToUpdate = this.interpretations.findIndex(item => item.id === interpret.id);
                if (indexToUpdate === -1) {
                    this.interpretations.push(interpret);
                } else {
                    this.interpretations[indexToUpdate] = interpret;
                    this.interpretations = Object.assign([], this.interpretations);
                }
                this.showTable = true;
                // emit change
                this.onInterpretationsChange.emit(this.interpretations);
            }
        });
    }

    deleteInterpretation(interpretation: Interpretation) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete \'' + interpretation.id + '\'?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.interpretations = this.interpretations.filter(val => val.id !== interpretation.id);
                if (this.interpretations.length === 0) {
                    this.showTable = false;
                }
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Interpretation Deleted', life: 3000 });
            },
            reject: () => {
                this.confirmationService.close();
            }
        });
    }

}

