import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Variant } from 'src/app/models/variant';
import { InterpretationService } from 'src/app/services/interpretation.service';
import { SpinnerDialogComponent } from '../../../spinner-dialog/spinner-dialog.component';

@Component({
    providers: [ConfirmationService, DialogService],
    selector: 'app-variant-validator',
    templateUrl: './variant-validator.component.html',
    styleUrls: ['./variant-validator.component.scss']
})
export class VariantValidatorComponent implements OnInit {

    @Output()
    variantsChange = new EventEmitter<Variant[]>();

    spinnerDialogRef: DynamicDialogRef;

    // variant search params
    variants: Variant[];
    variantVisible = false;
    hgvs: string;
    assembly: string;
    transcript: string;
    builds = ['GRCh37', 'GRCh38', 'hg19', 'hg38'];
    transcripts = ['all', 'select', 'mane_select', 'refseq_select', 'single/multiple'];


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

    updateTranscript(event: any) {
        this.transcript = event.value;
    }

    public searchVariantByHGVS() {
        if (this.hgvs && this.assembly && this.transcript) {
            this.spinnerDialogRef = this.dialogService.open(SpinnerDialogComponent, {
                closable: false,
                modal: true
            });
            this.searchService.queryVariantValidatorByHGVS(this.hgvs, this.assembly, this.transcript).subscribe(data => {
                if (this.variants === undefined) {
                    this.variants = [];
                }
                // See Variant validator API for the type of object it returns
                Object.keys(data).forEach(key => {
                    if (key !== 'flag' && key !== 'metadata') {
                        const variant = new Variant();
                        variant.build = this.assembly;
                        variant.hgvs = data[key].hgvs_transcript_variant;
                        variant.submittedVariant = data[key].submitted_variant;
                        variant.chr = data[key].annotations.chromosome;
                        variant.geneSymbol = data[key].gene_symbol;
                        variant.transcriptDescription = data[key].transcript_description;
                        variant.key = this.getBiggestKey(this.variants) + 1;
                        this.variants.push(variant);
                        this.variantVisible = true;
                    }

                });
                this.variantsChange.emit(this.variants);
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

    addSelectedVariant() {
        // TODO
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
}
