import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Utils } from 'src/app/component/shared/utils';
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

    alternateIds: RowValue[];
    xrefs: RowValue[];
    alternateSymbols: RowValue[];
    ref: DynamicDialogRef;


    constructor(public dialogService: DialogService, public interpretationService: InterpretationService,
        private messageService: MessageService, private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        if (this.geneDescriptor) {
            this.alternateIds = RowValue.getRowValues(this.geneDescriptor.alternateIds);
            this.xrefs = RowValue.getRowValues(this.geneDescriptor.xrefs);
            this.alternateSymbols = RowValue.getRowValues(this.geneDescriptor.alternateSymbols);
        }
    }

    ngOnDestroy(): void {

    }

    onValueIdChange(id: string) {
        if (this.geneDescriptor === undefined) {
            this.geneDescriptor = new GeneDescriptor();
        }
        this.geneDescriptor.valueId = id;
        this.geneDescriptorChange.emit(this.geneDescriptor);
    }

    onSymbolChange(symbol: string) {
        if (this.geneDescriptor === undefined) {
            this.geneDescriptor = new GeneDescriptor();
        }
        this.geneDescriptor.symbol = symbol;
        this.geneDescriptorChange.emit(this.geneDescriptor);
    }
    onDescriptionChange(description: string) {
        if (this.geneDescriptor === undefined) {
            this.geneDescriptor = new GeneDescriptor();
        }
        this.geneDescriptor.description = description;
        this.geneDescriptorChange.emit(this.geneDescriptor);
    }

    onAlternateIdChange() {
        if (this.geneDescriptor === undefined) {
            this.geneDescriptor = new GeneDescriptor();
        }
        this.geneDescriptor.alternateIds = RowValue.getStringArray(this.alternateIds);
        this.geneDescriptorChange.emit(this.geneDescriptor);
    }
    openNewAlternateId() {
        if (this.alternateIds === undefined || this.alternateIds === null) {
            this.alternateIds = [];
        }
        this.alternateIds.push(new RowValue(Utils.getBiggestKey(this.alternateIds) + 1));
    }

    deleteAlternateId(id: RowValue) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + id.value + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.alternateIds = this.alternateIds.filter(val => val.key !== id.key);
                if (this.geneDescriptor) {
                    this.geneDescriptor.alternateIds = RowValue.getStringArray(this.alternateIds);
                    this.geneDescriptorChange.emit(this.geneDescriptor);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Alternate ID Deleted', life: 3000 });
                }
            }
        });
    }

    onXrefChange() {
        if (this.geneDescriptor === undefined) {
            this.geneDescriptor = new GeneDescriptor();
        }
        this.geneDescriptor.xrefs = RowValue.getStringArray(this.xrefs);
        this.geneDescriptorChange.emit(this.geneDescriptor);

    }
    openNewXRef() {
        if (this.xrefs === undefined || this.xrefs === null) {
            this.xrefs = [];
        }
        this.xrefs.push(new RowValue(Utils.getBiggestKey(this.xrefs) + 1));
    }

    deleteXref(xref: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + xref.value + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.xrefs = this.xrefs.filter(val => val.key !== xref.key);
                if (this.geneDescriptor) {
                    this.geneDescriptor.xrefs = RowValue.getStringArray(this.xrefs);
                    this.geneDescriptorChange.emit(this.geneDescriptor);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Xref Deleted', life: 3000 });
                }
            }
        });
    }

    onAlternateSymbolChange() {
        if (this.geneDescriptor === undefined) {
            this.geneDescriptor = new GeneDescriptor();
        }
        this.geneDescriptor.alternateSymbols = RowValue.getStringArray(this.alternateSymbols);
        this.geneDescriptorChange.emit(this.geneDescriptor);
    }
    openNewAlternateSymbol() {
        if (this.alternateSymbols === undefined || this.alternateSymbols === null) {
            this.alternateSymbols = [];
        }
        this.alternateSymbols.push(new RowValue(Utils.getBiggestKey(this.alternateSymbols) + 1));
    }

    deleteAlternateSymbol(symbol: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + symbol.value + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.alternateSymbols = this.alternateSymbols.filter(val => val !== symbol);
                if (this.geneDescriptor) {
                    this.alternateSymbols = RowValue.getRowValues(this.geneDescriptor.alternateSymbols);
                    this.geneDescriptorChange.emit(this.geneDescriptor);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Alternate symbol Deleted', life: 3000 });
                }
            }
        });
    }

}

export class RowValue {
    key: number;
    value: string;

    constructor(key: number) {
        this.key = key;
    }
    public static getRowValues(values: string[]): RowValue[] {
        const rowValues = [];
        if (values) {
            for (const value of values) {
                const rowValue = new RowValue(Utils.getBiggestKey(rowValues) + 1);
                rowValue.value = value;
                rowValues.push(rowValue);
            }
        }
        return rowValues;
    }
    public static getStringArray(rowValues: RowValue[]): string[] {
        const values = [];
        if (rowValues) {
            for (const rowValue of rowValues) {
                values.push(rowValue.value);
            }
        }
        return values;
    }
}
