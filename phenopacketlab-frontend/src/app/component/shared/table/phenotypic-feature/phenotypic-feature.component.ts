import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhenotypicFeatureDialogComponent } from '../../dialog/phenotypic-feature-dialog/phenotypic-feature-dialog.component';
import { PhenotypicFeatureSearchDialogComponent } from '../../dialog/phenotypic-feature-search-dialog/phenotypic-feature-search-dialog.component';
import { ProfileSelection } from 'src/app/models/profile';
import { PhenopacketStepperService } from 'src/app/services/phenopacket-stepper.service';

@Component({
    selector: 'app-phenotypic-feature',
    templateUrl: './phenotypic-feature.component.html',
    styleUrls: ['./phenotypic-feature.component.scss']
})
export class PhenotypicFeatureComponent implements OnInit {

    @Input()
    phenotypicFeatures: PhenotypicFeature[];
    @Input()
    profile: ProfileSelection;
    @Output()
    onPhenotypicFeaturesChanged = new EventEmitter<PhenotypicFeature[]>();

    ref: DynamicDialogRef;

    constructor(private phenopacketService: PhenopacketStepperService,
        public dialogService: DialogService,
        private messageService: MessageService, private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
    }

    addPhenotypicFeature() {
        let onset;
        if (this.profile && this.phenopacketService) {
            onset = this.phenopacketService.phenopacket?.subject?.timeAtLastEncounter;
        }
        this.ref = this.dialogService.open(PhenotypicFeatureSearchDialogComponent, {
            header: 'Add Phenotypic feature',
            width: '50%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            modal: true,
            data: { profile: this.profile,
                onset: onset }
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
            data: { phenotypicFeature: feature,
                profile: this.profile }
        });

        this.ref.onClose.subscribe((phenoFeature: PhenotypicFeature) => {
            if (phenoFeature) {
                const indexToUpdate = this.phenotypicFeatures.findIndex(item => item.type.id === phenoFeature.type.id);
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
                this.phenotypicFeatures = this.phenotypicFeatures.filter(val => val.type.id !== feature.type.id);
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

