import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneDescriptor } from 'src/app/models/interpretation';
import { InterpretationService } from 'src/app/services/interpretation.service';
import { LabelCreatorDialogComponent } from './label-creator-dialog.component';

@Component({
    providers: [MessageService, ConfirmationService],
    selector: 'app-gene-descriptor',
    templateUrl: './gene-descriptor.component.html',
    styleUrls: ['./gene-descriptor.component.scss']
})
export class GeneDescriptorComponent implements OnInit, OnDestroy {

    @Input()
    geneDescriptor: GeneDescriptor;
    @Output()
    geneDescriptorChange = new EventEmitter<GeneDescriptor>();

    submitted = false;
    alternateIds: any[];
    alternateId: any;
    xrefs: any[];
    xref: any;
    alternateSymbols: any[];
    alternateSymbol: any;

    ref: DynamicDialogRef;


    constructor(public dialogService: DialogService, public interpretationService: InterpretationService,
        private messageService: MessageService, private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }

    onValueIdChange(id: string) {
        if (this.geneDescriptor) {
            this.geneDescriptor.valueId = id;
            this.geneDescriptorChange.emit(this.geneDescriptor);
        }
    }

    onSymbolChange(symbol: string) {
        if (this.geneDescriptor) {
            this.geneDescriptor.symbol = symbol;
            this.geneDescriptorChange.emit(this.geneDescriptor);
        }
    }
    onDescriptionChange(description: string) {
        if (this.geneDescriptor) {
            this.geneDescriptor.description = description;
            this.geneDescriptorChange.emit(this.geneDescriptor);
        }
    }

    openNewAlternateId() {
        this.ref = this.dialogService.open(LabelCreatorDialogComponent, {
            header: 'Create new alternate ID',
            data: this.alternateIds,
            width: '20%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000
        });

        this.ref.onClose.subscribe((labels: any) => {
            if (labels) {
                this.alternateIds = labels;
                this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: labels });
            }
        });

        this.alternateId = {};
        this.submitted = false;
    }

    deleteAlternateId(id: any) {
        console.log(id);
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + id.value + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.alternateIds = this.alternateIds.filter(val => val.key !== id.key);
                this.alternateId = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Alternate ID Deleted', life: 3000 });
                if (this.geneDescriptor) {
                    this.geneDescriptor.alternateIds = this.geneDescriptor.alternateIds.filter(val => val !== id);
                }
            }
        });
    }

    openNewXRef() {
        this.ref = this.dialogService.open(LabelCreatorDialogComponent, {
            header: 'Create new Xref',
            data: this.xrefs,
            width: '20%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000
        });

        this.ref.onClose.subscribe((xrefs: any) => {
            if (xrefs) {
                this.xrefs = xrefs;
                this.messageService.add({ severity: 'info', summary: 'Xref created', detail: xrefs });
            }
        });

        this.xref = {};
        this.submitted = false;
    }

    deleteXref(xref: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + xref.value + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.xrefs = this.xrefs.filter(val => val.key !== xref.key);
                this.xref = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Xref Deleted', life: 3000 });
                if (this.geneDescriptor) {
                    this.geneDescriptor.xrefs = this.geneDescriptor.xrefs.filter(val => val !== xref);
                }
            }
        });
    }

    openNewAlternateSymbol() {
        this.ref = this.dialogService.open(LabelCreatorDialogComponent, {
            header: 'Create new alternate symbol',
            data: this.alternateSymbols,
            width: '20%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000
        });

        this.ref.onClose.subscribe((symbols: any) => {
            if (symbols) {
                this.alternateSymbols = symbols;
                this.messageService.add({ severity: 'info', summary: 'Symbol created', detail: symbols });
            }
        });

        this.alternateSymbol = {};
        this.submitted = false;
    }

    deleteAlternateSymbol(symbol: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + symbol.value + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.alternateSymbols = this.alternateSymbols.filter(val => val.key !== symbol.key);
                this.alternateSymbol = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Alternate symbol Deleted', life: 3000 });
                if (this.geneDescriptor) {
                    this.geneDescriptor.alternateSymbols = this.geneDescriptor.alternateSymbols.filter(val => val !== symbol);
                }
            }
        });
    }

}
