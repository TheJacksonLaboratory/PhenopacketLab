import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';
import { OntologyClass } from 'src/app/models/base';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhenotypicDetailDialogComponent } from './phenotypic-detail/phenotypic-detail-dialog/phenotypic-detail-dialog.component';
import { Utils } from '../../shared/utils';
import { Subscription } from 'rxjs';

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

    /**
     * If this variable is true, we show the add button and also add the selected phenotypic feature to the datasource.
     * If false, we do not show the add button and just return a single phenotypic feature with the corresponding type OntologyClass
     */
    @Input()
    showAddButton = true;
    @Input()
    phenotypicFeatures: PhenotypicFeature[];
    @Output()
    onPhenotypicFeaturesChanged = new EventEmitter<PhenotypicFeature[]>();

    // search params
    itemName = 'Phenotypic feature';
    searchLabel = 'Phenotypic feature';
    placeHolderTxt = 'Enter a phenotypic feature name';
    localStorageKey = 'phenotypic_features';

    showTable = false;

    phenotypicCount: number;

    phenotypicFeatureSubscription: Subscription;
    featureItems: any[];
    ref: DynamicDialogRef;
    spinnerDialogRef: any;

    constructor(public searchService: PhenotypeSearchService, public dialogService: DialogService,
        private messageService: MessageService, private confirmationService: ConfirmationService) {
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.onPhenotypicFeaturesChanged.emit(this.phenotypicFeatures);
    }

    ngOnInit() {
        if (this.phenotypicFeatures && this.phenotypicFeatures.length > 0) {
            this.showTable = true;
        }
        this.phenotypicFeatureSubscription = this.searchService.getAllPhenotypicFeatures().subscribe(features => {
            this.featureItems = features;
        });
    }

    featureItemSelected(item: any) {
        if (item) {
            const feature = new PhenotypicFeature();
            feature.type = new OntologyClass(item.id.value, item.lbl);
            feature.description = item.def;
            this.editPhenotypicFeature(feature);
        }
    }

    /**
       * Adds a new phenotypic feature.
       **/
    addPhenotypicFeature(phenotypicFeature?: PhenotypicFeature) {
        if (phenotypicFeature === undefined) {
            return;
        }
        // set unique key for feature table
        phenotypicFeature.key = Utils.getBiggestKey(this.phenotypicFeatures) + 1;
        this.phenotypicFeatures.push(phenotypicFeature);
        // we copy the array after each update so the ngChange method is triggered on the child component
        this.phenotypicFeatures = this.phenotypicFeatures.slice();
        setTimeout(() => this.showTable = true, 0);

        // make table visible
        this.showTable = true;
    }

    editPhenotypicFeature(feature?: PhenotypicFeature) {
        this.ref = this.dialogService.open(PhenotypicDetailDialogComponent, {
            header: 'Edit Phenotypic feature',
            width: '70%',
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
                this.showTable = true;
                // emit change
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
            message: 'Are you sure you want to delete \'' + feature.type.id + '\'?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.phenotypicFeatures = this.phenotypicFeatures.filter(val => val.key !== feature.key);
                if (this.phenotypicFeatures.length === 0) {
                    this.showTable = false;
                }
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Phenotypic feature Deleted', life: 3000 });
            },
            reject: () => {
                this.confirmationService.close();
            }
        });
    }

    getModifiers(phenotypicFeature: PhenotypicFeature) {
        if (phenotypicFeature.modifiers) {
            const result = [];
            phenotypicFeature.modifiers.forEach(modifier => {
                result.push(modifier.toString());
            });
            return result.join(',');
        }
        return '';
    }
    getEvidences(phenotypicFeature: PhenotypicFeature) {
        if (phenotypicFeature.evidence) {
            const result = [];
            phenotypicFeature.evidence.forEach(evidence => {
                result.push(evidence.evidenceCode.toString());
            });
            return result.join(',');
        }
        return '';
    }

}

