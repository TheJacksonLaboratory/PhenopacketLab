import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhenotypicFeatureDialogComponent } from '../../shared/dialog/phenotypic-feature-dialog/phenotypic-feature-dialog.component';
import { PhenotypicFeatureSearchDialogComponent } from '../../shared/dialog/phenotypic-feature-search-dialog/phenotypic-feature-search-dialog.component';

@Component({
    selector: 'app-phenotypic-feature',
    templateUrl: './phenotypic-feature.component.html',
    styleUrls: ['./phenotypic-feature.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class PhenotypicFeatureComponent implements OnInit, OnChanges {

    @Input()
    phenotypicFeatures: PhenotypicFeature[];
    @Output()
    onPhenotypicFeaturesChanged = new EventEmitter<PhenotypicFeature[]>();

    ref: DynamicDialogRef;

    constructor(public dialogService: DialogService,
        private messageService: MessageService, private confirmationService: ConfirmationService) {
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.onPhenotypicFeaturesChanged.emit(this.phenotypicFeatures);
    }

    ngOnInit() {
    }

    addPhenotypicFeature() {
        this.ref = this.dialogService.open(PhenotypicFeatureSearchDialogComponent, {
            header: 'Add Phenotypic feature',
            width: '50%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            modal: true
        });

        this.ref.onClose.subscribe((addedFeatures: PhenotypicFeature[]) => {
            if (this.phenotypicFeatures === undefined) {
                this.phenotypicFeatures = [];
            }
            if (addedFeatures) {
                for (const phenoFeature of addedFeatures) {
                    const indexToUpdate = this.phenotypicFeatures.findIndex(item => item.type.id === phenoFeature.type.id);
                    if (indexToUpdate === -1) {
                        this.phenotypicFeatures.push(phenoFeature);
                    } else {
                        this.phenotypicFeatures[indexToUpdate] = phenoFeature;
                        this.phenotypicFeatures = Object.assign([], this.phenotypicFeatures);
                    }
                }
                // emit change
                this.onPhenotypicFeaturesChanged.emit(this.phenotypicFeatures);
            }
        });
    }

    editPhenotypicFeature(feature?: PhenotypicFeature) {
        this.ref = this.dialogService.open(PhenotypicFeatureDialogComponent, {
            header: 'Edit Phenotypic feature',
            width: '50%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            data: { phenotypicFeature: feature }
        });

        this.ref.onClose.subscribe((phenoFeature: PhenotypicFeature) => {
            if (phenoFeature) {
                const indexToUpdate = this.phenotypicFeatures.findIndex(item => item.key === phenoFeature.key);
                if (indexToUpdate === -1) {
                    this.phenotypicFeatures.push(phenoFeature);
                } else {
                    this.phenotypicFeatures[indexToUpdate] = phenoFeature;
                    this.phenotypicFeatures = Object.assign([], this.phenotypicFeatures);
                }
                this.onPhenotypicFeaturesChanged.emit(this.phenotypicFeatures);

            }
        });
    }

    /**
     * Removes the chosen feature
     * @param feature
     * @returns
     */
    deleteFeature(feature: PhenotypicFeature) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete \'' + feature.type.label + '\'?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.phenotypicFeatures = this.phenotypicFeatures.filter(val => val.key !== feature.key);
                // emit change
                this.onPhenotypicFeaturesChanged.emit(this.phenotypicFeatures);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Phenotypic feature Deleted', life: 3000 });
            },
            reject: () => {
                this.confirmationService.close();
            }
        });
    }

}

