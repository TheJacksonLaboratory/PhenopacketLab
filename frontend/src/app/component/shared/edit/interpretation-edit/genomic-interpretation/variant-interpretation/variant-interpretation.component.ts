import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Utils } from 'src/app/component/shared/utils';
import { AcmgPathogenicityClassification, TherapeuticActionability, VariantInterpretation, VariationDescriptor } from 'src/app/models/interpretation';
import { VariantMetadata } from 'src/app/models/variant-metadata';
import { InterpretationService } from 'src/app/services/interpretation.service';
import { SpinnerDialogComponent } from 'src/app/component/shared/spinner-dialog/spinner-dialog.component';

@Component({
    providers: [ConfirmationService, DialogService],
    selector: 'app-variant-search-interpretation',
    templateUrl: './variant-interpretation.component.html',
    styleUrls: ['./variant-interpretation.component.scss']
})
export class VariantInterpretationComponent implements OnInit {

    @Output()
    variantInterpretationChange = new EventEmitter<VariantInterpretation>();

    spinnerDialogRef: DynamicDialogRef;

    // variant search params
    interpretations: VariantInterpretation[];
    visible = false;
    hgvs: string;
    assembly: string;
    selectedTranscript: string;
    transcriptDescription: string;
    transcript: string;
    selectedAcmgPathogenicity = AcmgPathogenicityClassification.NOT_PROVIDED;
    genotype: string;
    genotypes = ['heterozygous', 'homozygous', 'hemizygous'];
    builds = ['GRCh37/hg19', 'GRCh38/hg38'];
    transcripts = ['all', 'prefered'];
    acmgClassifications = Object.keys(AcmgPathogenicityClassification).filter((item) => isNaN(Number(item)));
    selectedTherapeuticActionability = TherapeuticActionability.UNKNOWN_ACTIONABILITY;
    therapeuticActionabilities = Object.keys(TherapeuticActionability).filter((item) => isNaN(Number(item)));

    expanded = false;

    constructor(public searchService: InterpretationService,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        private messageService: MessageService) {
    }


    ngOnInit() {
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
    }

    updateAcmgPathogenicity(acmgPathogenicity: AcmgPathogenicityClassification) {
        console.log(acmgPathogenicity);
        console.log(this.selectedAcmgPathogenicity);
    }

    updateTherapeuticActionability(therapeuticActionability: TherapeuticActionability) {
        console.log(therapeuticActionability);
        console.log(this.selectedTherapeuticActionability);
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
                    const vInterpretation = variant.toVariantInterpretation(this.selectedAcmgPathogenicity, this.genotype);
                    vInterpretation.key = Utils.getBiggestKey(this.interpretations) + 1;
                    vInterpretation.acmgPathogenicityClassification = this.selectedAcmgPathogenicity;
                    vInterpretation.therapeuticActionability = this.selectedTherapeuticActionability;
                    this.interpretations.push(vInterpretation);
                }

                this.visible = true;
                this.variantInterpretationChange.emit(this.interpretations[0]);
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
        this.interpretations = this.interpretations.filter(val => val.key !== interpretation.key);
        if (this.interpretations.length === 0) {
            this.visible = false;
            this.variantInterpretationChange.emit(undefined);
        } else {
            this.variantInterpretationChange.emit(this.interpretations[0]);
        }
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

    updateVariationDescriptor(variationDescriptor: VariationDescriptor) {

    }
}
