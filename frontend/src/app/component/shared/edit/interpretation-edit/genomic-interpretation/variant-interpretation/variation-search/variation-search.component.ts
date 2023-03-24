import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SpinnerDialogComponent } from 'src/app/component/shared/spinner-dialog/spinner-dialog.component';
import { Utils } from 'src/app/component/shared/utils';
import { AcmgPathogenicityClassification, TherapeuticActionability, VariantInterpretation, VariationDescriptor } from 'src/app/models/interpretation';
import { VariantMetadata } from 'src/app/models/variant-metadata';
import { InterpretationService } from 'src/app/services/interpretation.service';
import { environment } from 'src/environments/environment';

@Component({
    providers: [ConfirmationService, DialogService],
    selector: 'app-variation-search',
    templateUrl: './variation-search.component.html',
    styleUrls: ['./variation-search.component.scss']
})
export class VariationSearchComponent implements OnInit, OnDestroy {

    @Output()
    variantInterpretationChange = new EventEmitter<VariantInterpretation>();

    spinnerDialogRef: DynamicDialogRef;

    // variant search params
    interpretations: VariantInterpretation[];
    visible = false;
    hgvs: string;
    showHGVSHelp: boolean;
    // We just support grch38 for now
    assembly = 'GRCh38/hg38';
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

    apiLink = environment.FUNCTIONAL_ANNOTATION_URL;

    constructor(public searchService: InterpretationService,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        private messageService: MessageService) {
    }


    ngOnInit() {
    }

    ngOnDestroy(): void {

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

    openHGVSHelp() {
        this.showHGVSHelp = true;
    }

    public searchVariantByHGVS() {
        // For now we just allow the mane select option
        this.transcript = 'mane_select';
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

    addInterpretation(interpretation: VariantInterpretation) {
        this.variantInterpretationChange.emit(interpretation);
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
