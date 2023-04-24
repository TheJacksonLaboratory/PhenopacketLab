import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Utils } from 'src/app/component/shared/utils';

@Component({
    providers: [MessageService, ConfirmationService],
    selector: 'app-label-creator-dialog',
    templateUrl: './label-creator-dialog.component.html',
    styleUrls: ['./gene-descriptor.component.scss']
})
export class LabelCreatorDialogComponent implements OnInit, OnDestroy {

    label: any;
    labels: any[];
    header: string;

    submitted: boolean;

    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, public messageService: MessageService) {

    }
    ngOnInit(): void {
        this.labels = this.config.data;
        this.header = this.config.header;
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    onLabelChange(label: string) {
        this.label = {};
        this.label.value = label;
    }

    saveLabel() {
        this.submitted = true;
        if (!this.labels) {
            this.labels = [];
        }
        if (this.label.value.trim()) {
            if (this.label.key) {
                this.labels[this.findIndexById(this.labels, this.label.key)] = this.label;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Alternate ID Updated', life: 3000 });
            } else {
                this.label.key = Utils.getBiggestKey(this.labels) + 1;
                this.labels.push(this.label);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Alternate ID Created', life: 3000 });
            }

            this.labels = [...this.labels];
            this.label = {};

            this.ref.close(this.labels);
        }
    }

    findIndexById(array: any[], id: string): number {
        let index = -1;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    closeDialog() {
        this.ref.close();
    }

}
