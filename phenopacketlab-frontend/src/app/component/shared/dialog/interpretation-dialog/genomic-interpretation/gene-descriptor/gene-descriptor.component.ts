import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneDescriptor } from 'src/app/models/interpretation';
import { InterpretationService } from 'src/app/services/interpretation.service';

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
    alternateIds: string[];
    alternateId: string;
    xrefs: string[];
    xref: string;
    alternateSymbols: string[];
    alternateSymbol: string;
    ref: DynamicDialogRef;


    constructor(public dialogService: DialogService, public interpretationService: InterpretationService,
        private messageService: MessageService, private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        if (this.geneDescriptor) {
            this.alternateIds = this.geneDescriptor.alternateIds;
            this.xrefs = this.geneDescriptor.xrefs;
            this.alternateSymbols = this.geneDescriptor.alternateSymbols;
        }
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

    onAlternateIdChange(event, rowIndex) {
        // enter is pressed
        if (event.key && event.key === 'Enter') {
            this.alternateIds[rowIndex] = this.alternateId;
            if (this.geneDescriptor) {
                this.geneDescriptor.alternateIds = this.alternateIds;
                this.geneDescriptorChange.emit(this.geneDescriptor);
            }
        } else if (typeof event === 'string') {
            // value is changed
            this.alternateId = event;
        }
    }
    openNewAlternateId() {
        this.alternateIds.push(' ');
    }

    deleteAlternateId(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + id + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.alternateIds = this.alternateIds.filter(val => val !== id);
                if (this.geneDescriptor) {
                    this.geneDescriptor.alternateIds = this.alternateIds;
                    this.geneDescriptorChange.emit(this.geneDescriptor);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Alternate ID Deleted', life: 3000 });
                }
            }
        });
    }

    onXrefChange(event, rowIndex) {
        // enter is pressed
        if (event.key && event.key === 'Enter') {
            this.xrefs[rowIndex] = this.xref;
            if (this.geneDescriptor) {
                this.geneDescriptor.xrefs = this.xrefs;
                this.geneDescriptorChange.emit(this.geneDescriptor);
            }
        } else if (typeof event === 'string') {
            // value is changed
            this.xref = event;
        }
    }
    openNewXRef() {
        this.xrefs.push(' ');
    }

    deleteXref(xref: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + xref + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.xrefs = this.xrefs.filter(val => val !== xref);
                if (this.geneDescriptor) {
                    this.geneDescriptor.xrefs = this.xrefs;
                    this.geneDescriptorChange.emit(this.geneDescriptor);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Xref Deleted', life: 3000 });
                }
            }
        });
    }

    onAlternateSymbolChange(event, rowIndex) {
        // enter is pressed
        if (event.key && event.key === 'Enter') {
            this.alternateSymbols[rowIndex] = this.alternateSymbol;
            if (this.geneDescriptor) {
                this.geneDescriptor.alternateSymbols = this.alternateSymbols;
                this.geneDescriptorChange.emit(this.geneDescriptor);
            }
        } else if (typeof event === 'string') {
            // value is changed
            this.alternateSymbol = event;
        }
    }
    openNewAlternateSymbol() {
        this.alternateSymbols.push(' ');
    }

    deleteAlternateSymbol(symbol: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + symbol + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.alternateSymbols = this.alternateSymbols.filter(val => val !== symbol);
                if (this.geneDescriptor) {
                    this.geneDescriptor.alternateSymbols = this.alternateSymbols;
                    this.geneDescriptorChange.emit(this.geneDescriptor);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Alternate symbol Deleted', life: 3000 });
                }
            }
        });
    }

}
