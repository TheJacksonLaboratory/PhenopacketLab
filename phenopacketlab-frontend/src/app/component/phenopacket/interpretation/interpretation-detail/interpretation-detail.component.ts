import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { GenomicInterpretation, Interpretation } from 'src/app/models/interpretation';
import { InterpretationDetailDialogComponent } from './interpretation-detail-dialog/interpretation-detail-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

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
export class InterpretationDetailComponent implements OnInit {

    @Input()
    interpretation: Interpretation;

    @Output() onInterpretationChanged = new EventEmitter<Interpretation>();

    disease: string;
    interpretationId: string;
    status: any;
    summary: string;
    genomicInterpretations: GenomicInterpretation[];

    ref: DynamicDialogRef;

    constructor(public dialogService: DialogService, public messageService: MessageService) {

    }

    ngOnInit() {
        this.updateInterpretation();
    }

    updateInterpretation() {
        if (this.interpretation) {
            this.disease = this.interpretation.diagnosis?.disease?.toString();
            this.interpretationId = this.interpretation.id;
            this.status = this.interpretation.progressStatus;
            this.summary = this.interpretation.summary;
            this.genomicInterpretations = this.interpretation.diagnosis?.genomicInterpretations;
        }
    }

    openEditDialog() {
        this.ref = this.dialogService.open(InterpretationDetailDialogComponent, {
            header: 'Edit Interpretation',
            width: '70%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            data: { interpretation: this.interpretation }
        });

        this.ref.onClose.subscribe((interpretation: Interpretation) => {
            if (interpretation) {
                this.interpretation = interpretation;
                this.updateInterpretation();
                // emit change
                this.onInterpretationChanged.emit(this.interpretation);
            }
        });
    }

    /**
     * Add a new interpretation(genomic) with default values or no values
     */
    addInterpretation(genoInterpretation?: GenomicInterpretation) {

        // TODO push changes to api
    }


    getCall(genomicInterpretation: GenomicInterpretation) {
        if (genomicInterpretation.geneDescriptor === undefined && genomicInterpretation.variantInterpretation) {
            return 'VariantInterpretation';
        } else if (genomicInterpretation.geneDescriptor && genomicInterpretation.variantInterpretation === undefined) {
            return 'GeneDescriptor';
        }
    }
}

