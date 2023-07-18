import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SpinnerDialogComponent } from 'src/app/component/shared/spinner-dialog/spinner-dialog.component';
import { VariantInterpretation } from 'src/app/models/interpretation';
import { ProfileSelection } from 'src/app/models/profile';
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

    @Input()
    profile: ProfileSelection;
    @Output()
    variantInterpretationChange = new EventEmitter<VariantInterpretation>();
    @Output()
    variantValidated = new EventEmitter<VariantMetadata>();

    spinnerDialogRef: DynamicDialogRef;

    // variant search params
    interpretations: VariantInterpretation[];
    visible = false;
    hgvs: string;
    // We just support grch38 for now
    assembly = 'GRCh38/hg38';
    selectedTranscript: string;
    transcript: string;
    genotype: string;
    genotypes = ['heterozygous', 'homozygous', 'hemizygous'];
    builds = ['GRCh37/hg19', 'GRCh38/hg38'];
    // acmgClassifications = Object.keys(AcmgPathogenicityClassification).filter((item) => isNaN(Number(item)));
    // selectedTherapeuticActionability = TherapeuticActionability.UNKNOWN_ACTIONABILITY;
    // therapeuticActionabilities = Object.keys(TherapeuticActionability).filter((item) => isNaN(Number(item)));

    expanded = false;

    apiLink = `${environment.API_DOC}#/functional-variant-annotation-controller/annotate`;

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

    public searchVariantByHGVS() {
        // For now we just allow the mane select option
        this.selectedTranscript = 'prefered';
        if (this.hgvs && this.assembly) {
            this.spinnerDialogRef = this.dialogService.open(SpinnerDialogComponent, {
                closable: false,
                modal: true
            });
            let build = '';
            if (this.assembly === 'GRCh37/hg19') {
                build = 'hg19';
            }
            if (this.assembly === 'GRCh38/hg38') {
                build = 'hg38';
            }
            this.searchService.queryFunctionalAnnotationByHGVS(this.hgvs, build, this.selectedTranscript).subscribe(data => {
                let variant;
                for (const item of data) {
                    variant = new VariantMetadata(item);
                    variant.genotype = this.genotype;
                }
                if (variant === undefined) {
                    this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `No variant corresponds to the description \'${this.hgvs}\'` });
                    this.hgvs = '';
                }
                this.variantValidated.emit(variant);
                this.spinnerDialogRef.close();
            },
                (error) => {
                    console.log(error);
                    this.hgvs = '';
                    this.spinnerDialogRef.close();
                });
        } else {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Make sure Variant description, genome build and transcript are selected before making a search.' });

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

}
