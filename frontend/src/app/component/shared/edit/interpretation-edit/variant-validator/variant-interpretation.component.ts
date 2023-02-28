import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VariantInterpretation } from 'src/app/models/interpretation';
import { Phenopacket } from 'src/app/models/phenopacket';
import { VariantMetadata } from 'src/app/models/variant-metadata';
import { InterpretationService } from 'src/app/services/interpretation.service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { SpinnerDialogComponent } from '../../../spinner-dialog/spinner-dialog.component';

@Component({
    providers: [ConfirmationService, DialogService],
    selector: 'app-variant-interpretation',
    templateUrl: './variant-interpretation.component.html',
    styleUrls: ['./variant-interpretation.component.scss']
})
export class VariantInterpretationComponent implements OnInit {

    @Output()
    variantInterpretationChange = new EventEmitter<VariantInterpretation[]>();

    spinnerDialogRef: DynamicDialogRef;

    phenopacket: Phenopacket;
    // variant search params
    interpretations: VariantInterpretation[];
    visible = false;
    hgvs: string;
    assembly: string;
    selectedTranscript: string;
    transcriptDescription: string;
    transcript: string;
    acmg: string;
    genotype: string;
    genotypes = ['heterozygous', 'homozygous', 'hemizygous'];
    builds = ['GRCh37/hg19', 'GRCh38/hg38'];
    transcripts = ['all', 'prefered'];

    expanded = false;

    constructor(public searchService: InterpretationService,
        public phenopacketService: PhenopacketService,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        private messageService: MessageService) {
    }


    ngOnInit() {
        this.phenopacket = this.phenopacketService.phenopacket;
    }

    updateHgvs(hgvs: string) {
        this.hgvs = hgvs;
    }

    updateAssembly(event: any) {
        this.assembly = event.value;
    }

    updateSelectedTranscript(event: any) {
        this.selectedTranscript = event.value;
        if (this.selectedTranscript === 'all') {
            this.transcriptDescription = 'Return all possible transcripts';
            this.transcript = this.selectedTranscript;
        }
        if (this.selectedTranscript === 'prefered') {
            this.transcriptDescription = 'Return only \'select\' transcripts';
            this.transcript = 'mane_select';
        }
        // if (this.selectedTranscript === 'select' || this.selectedTranscript === 'mane_select'
        //  || this.selectedTranscript === 'refseq_select') {
        //     this.transcriptDescription = 'Return only \'select\' transcripts';
        //     this.transcript = this.selectedTranscript;
        // }
        // if (this.selectedTranscript === 'single/multiple') {
        //     this.transcriptDescription = ''
        //     this.transcript = '';
        // }
    }
    updateTranscript(transcript: string) {
        this.transcript = transcript;
    }

    public searchVariantByHGVS() {
        if (this.hgvs && this.assembly && this.transcript) {
            this.spinnerDialogRef = this.dialogService.open(SpinnerDialogComponent, {
                closable: false,
                modal: true
            });
            let build = '';
            if (this.assembly === 'GRCh37/hg19') {
                build = 'grch37';
            }
            if (this.assembly === 'GRCh38/hg38') {
                build = 'grch38';
            }
            this.searchService.queryFunctionalAnnotationByHGVS(this.hgvs, build, this.selectedTranscript).subscribe(data => {
                // reset variants table
                this.interpretations = [];
                for (const item of data) {
                    const variant = new VariantMetadata(item);
                    const vInterpretation = variant.toVariantInterpretation(this.acmg, this.genotype);
                    vInterpretation.key = this.getBiggestKey(this.interpretations) + 1;
                    this.interpretations.push(vInterpretation);
                }

                this.visible = true;
                this.variantInterpretationChange.emit(this.interpretations);
                this.spinnerDialogRef.close();
            },
                (error) => {
                    console.log(error);
                    this.spinnerDialogRef.close();
                });
        } else {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Make sure HGVS, genome build and transcript are selected before making a search.' });

        }

    }

    deleteInterpretation(interpretation: VariantInterpretation) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete \'' + interpretation.variationDescriptor.expressions[0]?.value + '\'?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.interpretations = this.interpretations.filter(val => val.key !== interpretation.key);
                this.variantInterpretationChange.emit(this.interpretations);
                if (this.interpretations.length === 0) {
                    this.visible = false;
                }
                this.messageService.add({ severity: 'success', summary: 'Successful',
                    detail: 'Variant interpretation Deleted', life: 3000 });
            },
            reject: () => {
                this.confirmationService.close();
            }
        });
    }

    /**
     *
     * @param array of item with key parameters
     * @returns Returns the biggest key
     */
    getBiggestKey(array: any[]) {
        let key = 0;
        for (const item of array) {
            if ((item.key) >= key) {
                key = item.key;
            }
        }
        return key;
    }

    getHgvsExpression(interpretation: VariantInterpretation, syntax: string) {
        if (interpretation.variationDescriptor) {
            if (interpretation.variationDescriptor.expressions) {
                const expressions = interpretation.variationDescriptor.expressions;
                for (const expression of expressions) {
                    if (expression.syntax === syntax) {
                        return expression.value;
                    }
                }
            }
        }
    }
}
