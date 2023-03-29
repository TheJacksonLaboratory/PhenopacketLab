import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';
import { OntologyClass } from 'src/app/models/base';
import { SpinnerDialogComponent } from '../../shared/spinner-dialog/spinner-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhenotypicDetailDialogComponent } from './phenotypic-detail/phenotypic-detail-dialog/phenotypic-detail-dialog.component';
import { Utils } from '../../shared/utils';

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
    // search params
    itemName = 'Phenotypic feature';
    searchLabel = 'Phenotypic feature';
    placeHolderTxt = 'Enter a phenotypic feature name';
    localStorageKey = 'phenotypic_features';

    showTable = false;

    phenotypicCount: number;

    // searchparams
    currSearchParams: any = {};

    expandedElement: PhenotypicFeature | null;

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
    }

    addPhenotypicFeature(feature?: PhenotypicFeature) {
        // TODO not needed
    }

    editPhenotypicFeature(feature?: PhenotypicFeature) {
        this.ref = this.dialogService.open(PhenotypicDetailDialogComponent, {
            header: 'Edit Phenotypic feature',
            width: '70%',
            contentStyle: { 'min-height': '500px', 'overflow': 'auto' },
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

    onSearchCriteriaChange(searchCriteria: any) {
        this.currSearchParams.offset = 0;
        const id = searchCriteria.selectedItems[0].selectedValue.id;

        if ((searchCriteria.selectedItems && searchCriteria.selectedItems.length > 0)) {
            this.currSearchParams = searchCriteria;
            this._queryPhenotypicFeatureById(id);
        }
    }

    private _queryPhenotypicFeatureById(id: string) {
        this.spinnerDialogRef = this.dialogService.open(SpinnerDialogComponent, {
            closable: false,
            modal: true
        });
        this.searchService.queryPhenotypicFeatureById(id).subscribe(data => {
            const phenotypicFeature = new PhenotypicFeature();
            phenotypicFeature.type = new OntologyClass(data.id, data.label);
            phenotypicFeature.description = data.description;
            phenotypicFeature.excluded = false;
            phenotypicFeature.key = Utils.getBiggestKey(this.phenotypicFeatures) + 1;
            this.phenotypicFeatures.push(phenotypicFeature);
            this.showTable = true;
            this.onPhenotypicFeaturesChanged.emit(this.phenotypicFeatures);
            this.spinnerDialogRef.close();
        },
            (error) => {
                console.log(error);
                this.spinnerDialogRef.close();
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
        if (phenotypicFeature.evidences) {
            const result = [];
            phenotypicFeature.evidences.forEach(evidence => {
                result.push(evidence.evidenceCode.toString());
            });
            return result.join(',');
        }
        return '';
    }

}

