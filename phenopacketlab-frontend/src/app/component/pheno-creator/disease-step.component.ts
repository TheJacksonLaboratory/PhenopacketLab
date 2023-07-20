import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Disease } from 'src/app/models/disease';
import { Phenopacket } from 'src/app/models/phenopacket';
import { ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { Utils } from '../shared/utils';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DiseaseSearchDialogComponent } from '../shared/dialog/disease-search-dialog/disease-search-dialog.component';
import { DiseaseDialogComponent } from '../shared/dialog/disease-dialog/disease-dialog.component';

@Component({
    providers: [ConfirmationService],
    selector: 'app-disease-step',
    templateUrl: './disease-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class DiseaseStepComponent implements OnInit, OnDestroy {

    diseases: Disease[];
    phenopacket: Phenopacket;
    phenopacketSubscription: Subscription;

    // table contents of diseases
    selectedDisease: Disease;

    profileSelectionSubscription: Subscription;
    profileSelection: ProfileSelection;

    ref: DynamicDialogRef;

    submitted = false;

    constructor(public phenopacketService: PhenopacketService,
        private confirmationService: ConfirmationService,
        private dialogService: DialogService,
        private messageService: MessageService,
        private router: Router, private primengConfig: PrimeNGConfig,
        public dialog: MatDialog) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.phenopacket = this.phenopacketService.phenopacket;
        if (this.phenopacket === undefined) {
            // navigate to first page of creator as phenopacket is not created
            this.router.navigate(['creator/individual']);
        } else {
            this.diseases = this.phenopacket.diseases;
        }
        this.profileSelectionSubscription = this.phenopacketService.getProfileSelection().subscribe(profile => {
            this.profileSelection = profile;
        });
    }
    ngOnDestroy(): void {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
        if (this.profileSelectionSubscription) {
            this.profileSelectionSubscription.unsubscribe();
        }
    }

    /**
     * Adds a new disease.
     **/
    addDisease() {
        this.ref = this.dialogService.open(DiseaseSearchDialogComponent, {
            header: 'Search for disease(s)',
            width: '50%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            modal: true,
            data: {
                profile: this.profileSelection
            }
        });

        this.ref.onClose.subscribe((diseasesResult: Disease[]) => {
            if (diseasesResult) {
                if (this.diseases === undefined) {
                    this.diseases = [];
                }
                for (const dis of diseasesResult) {
                    const indexToUpdate = this.diseases.findIndex(item => item.term.id === dis.term.id);
                    dis.key = Utils.getBiggestKey(this.diseases) + 1;
                    if (indexToUpdate === -1) {
                        this.diseases.push(dis);
                    } else {
                        this.diseases[indexToUpdate] = dis;
                        this.diseases = Object.assign([], this.diseases);
                    }
                }
                // emit change
                this.phenopacket.diseases = this.diseases;
                this.submitted = true;
            }
        });
    }

    deleteDisease(disease: Disease) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete \'' + disease.term.label + '\'?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.diseases = this.diseases.filter(val => val.term.id !== disease.term.id);
                this.selectedDisease = null;
                this.phenopacket.diseases = this.diseases;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Disease Deleted', life: 3000 });
            },
            reject: () => {
                this.confirmationService.close();
            }
        });
    }

    updateDisease(disease) {
        this.selectedDisease = disease;
    }

    editDisease(disease?: Disease) {
        this.ref = this.dialogService.open(DiseaseDialogComponent, {
            header: 'Edit disease',
            width: '50%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            data: { disease: disease,
                profile: this.profileSelection }
        });

        this.ref.onClose.subscribe((diseaseEdited: Disease) => {
            if (diseaseEdited) {
                const indexToUpdate = this.diseases.findIndex(item => item.key === diseaseEdited.key);
                if (indexToUpdate === -1) {
                    this.diseases.push(diseaseEdited);
                } else {
                    this.diseases[indexToUpdate] = diseaseEdited;
                    this.diseases = Object.assign([], this.diseases);
                }
            }
        });
    }
}
