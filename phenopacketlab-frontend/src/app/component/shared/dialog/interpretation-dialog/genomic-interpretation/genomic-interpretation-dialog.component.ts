import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneDescriptor, GenomicInterpretation, InterpretationStatus, VariantInterpretation } from 'src/app/models/interpretation';
import { ProfileSelection } from 'src/app/models/profile';

@Component({
    providers: [ConfirmationService],
    selector: 'app-genomic-interpretation-dialog',
    templateUrl: './genomic-interpretation-dialog.component.html',
    styleUrls: ['./genomic-interpretation-dialog.component.scss']
})
export class GenomicInterpretationDialogComponent implements OnInit {

    genomicInterpretation: GenomicInterpretation;
    profile: ProfileSelection;
    submitted: boolean;

    selectedInterpretationStatus: InterpretationStatus;
    interpretationStatuses = Object.keys(InterpretationStatus).filter((item) => isNaN(Number(item)));

    constructor(private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private ref: DynamicDialogRef, private config: DynamicDialogConfig) {
        this.genomicInterpretation = config.data?.genomicInterpretation;
        this.profile = config.data?.profile;
        this.submitted = config.data?.submitted;
    }

    ngOnInit() {
    }

    updateInterpretationStatus(interpretationStatus) {
        if (this.genomicInterpretation) {
            this.genomicInterpretation.interpretationStatus = interpretationStatus;
        }
        // this.genomicInterpretationChange.emit(this.genomicInterpretation);
    }

    addVariantInterpretation(variantInterpretation: VariantInterpretation) {
        if (this.genomicInterpretation) {
            this.genomicInterpretation.variantInterpretation = variantInterpretation;
            this.genomicInterpretation.geneDescriptor = undefined;
        }
        // this.genomicInterpretationChange.emit(this.genomicInterpretation);
    }

    addGeneDescriptor(geneDescriptor: GeneDescriptor) {
        if (this.genomicInterpretation) {
            this.genomicInterpretation.variantInterpretation = undefined;
            this.genomicInterpretation.geneDescriptor = geneDescriptor;
        }
        // this.genomicInterpretationChange.emit(this.genomicInterpretation);
    }

    onCancelClick(): void {
        this.ref.close();
    }

    onOkClick() {
        if (this.genomicInterpretation) {
            try {
                GenomicInterpretation.convert(this.genomicInterpretation);
            } catch (error) {
                this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `${error}` });
                return;
            }
        }

        if (this.genomicInterpretation.interpretationStatus === InterpretationStatus.UNKNOWN_STATUS) {
            this.confirmationService.confirm({
                message: `The \'Interpretation Status\' of the genomic interpretation with the variation id \'${this.genomicInterpretation.variantInterpretation.variationDescriptor.id}\' is set to \'UNKNOWN_STATUS\'. Click on \'Yes\' to keep the status value to \'UNKNOWN_STATUS\'. Click on \'No\' to keep editing the interpretation and change the status value.`,
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    // continue saving
                    this.ref.close(this.genomicInterpretation);
                },
                reject: () => {
                    return;
                }
            });
        } else {
            this.ref.close(this.genomicInterpretation);
        }
    }

}
