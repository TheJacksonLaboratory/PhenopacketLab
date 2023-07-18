import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';

import { Interpretation } from 'src/app/models/interpretation';
import { Phenopacket } from 'src/app/models/phenopacket';
import { Profile, ProfileSelection } from 'src/app/models/profile';
import { InterpretationService } from 'src/app/services/interpretation.service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InterpretationDialogComponent } from '../shared/dialog/interpretation-dialog/interpretation-dialog.component';
import { Utils } from '../shared/utils';
import { DialogMode } from 'src/app/models/base';

@Component({
    providers: [ConfirmationService],
    selector: 'app-interpretation-step',
    templateUrl: './interpretation-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class InterpretationStepComponent implements OnInit, OnDestroy {

    visible = false;
    phenopacket: Phenopacket;
    id: string;
    interpretation: Interpretation;
    interpretations: Interpretation[] = [];
    submitted = false;
    phenopacketSubscription: Subscription;

    // table contents of phenotypic features
    selectedInterpretation: Interpretation;

    profileSelection: ProfileSelection;
    profileSelectionSubscription: Subscription;

    ref: DynamicDialogRef;


    constructor(public searchService: InterpretationService,
        public phenopacketService: PhenopacketService,
        private confirmationService: ConfirmationService,
        private dialogService: DialogService,
        private messageService: MessageService,
        private router: Router, public dialog: MatDialog,
        private primengConfig: PrimeNGConfig) {
    }


    ngOnInit() {
        this.primengConfig.ripple = true;
        this.phenopacket = this.phenopacketService.phenopacket;
        if (this.phenopacket === undefined) {
            // navigate to first page of creator as phenopacket is not created
            this.router.navigate(['pheno-creator/individual']);
        } else {
            this.interpretations = this.phenopacket.interpretations;
            if (this.interpretations) {
                if (this.interpretations.length > 0) {
                    this.visible = true;
                }
            }
        }

        this.phenopacketSubscription = this.phenopacketService.getPhenopacket().subscribe(phenopacket => {
            this.phenopacket = phenopacket;
            this.interpretations = phenopacket.interpretations;
        });
        // get profile
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

    addInterpretation() {
        const interpretation = new Interpretation();
        this.ref = this.dialogService.open(InterpretationDialogComponent, {
            header: 'Add Interpretation',
            width: '70%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            modal: true,
            data: {
                interpretation: interpretation,
                phenopacket: this.phenopacket,
                profile: this.profileSelection,
                mode: DialogMode.ADD
            }
        });
        this.ref.onClose.subscribe((interpret: Interpretation) => {
            this.updateInterpretation(interpret);
        });
    }

    editInterpretation(interpretation: Interpretation) {
        this.ref = this.dialogService.open(InterpretationDialogComponent, {
            header: 'Edit Interpretation',
            width: '70%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            modal: true,
            data: {
                interpretation: interpretation,
                phenopacket: this.phenopacket,
                profile: this.profileSelection,
                mode: DialogMode.EDIT
            }
        });
        this.ref.onClose.subscribe((interpret: Interpretation) => {
            this.updateInterpretation(interpret);
        });
    }

    updateInterpretation(interpretation: Interpretation) {
        if (interpretation) {
            if (this.interpretations === undefined) {
                this.interpretations = [];
            }
            const indexToUpdate = this.interpretations.findIndex(item => item.id === interpretation.id);
            interpretation.key = Utils.getBiggestKey(this.interpretations) + 1;
            if (indexToUpdate === -1) {
                this.interpretations.push(interpretation);
            } else {
                this.interpretations[indexToUpdate] = interpretation;
                this.interpretations = Object.assign([], this.interpretations);
            }
            // this.showTable = true;
            // emit change
            this.phenopacket.interpretations = this.interpretations;
            this.submitted = true;
        }
    }
    deleteInterpretation(interpretation: Interpretation) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete \'' + interpretation.id + '\'?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.interpretations = this.interpretations.filter(val => val.key !== interpretation.key);
                this.selectedInterpretation = null;
                this.phenopacket.interpretations = this.interpretations;
                if (this.interpretations.length === 0) {
                    this.visible = false;
                }
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Interpretation Deleted', life: 3000 });
            },
            reject: () => {
                this.confirmationService.close();
            }
        });
    }

    nextPage() {
        this.phenopacketService.phenopacket.interpretations = this.interpretations;
        // check profile and navigate to the corresponding step
        for (const profile of Profile.profileSelectionOptions) {
            if (this.profileSelection === ProfileSelection.ALL_AVAILABLE && profile.value === ProfileSelection.ALL_AVAILABLE) {
                this.router.navigate([`creator/${profile.path}/medical-actions`]);
                return;
            } else if (this.profileSelection === ProfileSelection.RARE_DISEASE && profile.value === ProfileSelection.RARE_DISEASE) {
                this.router.navigate([`creator/${profile.path}/validate`]);
                return;
            }
            // Possible other profiles to come
        }
    }
    prevPage() {
        // check profile and navigate to the corresponding step
        for (const profile of Profile.profileSelectionOptions) {
            if (this.profileSelection === ProfileSelection.ALL_AVAILABLE && profile.value === ProfileSelection.ALL_AVAILABLE) {
                this.router.navigate([`creator/${profile.path}/diseases`]);
                return;
            } else if (this.profileSelection === ProfileSelection.RARE_DISEASE && profile.value === ProfileSelection.RARE_DISEASE) {
                this.router.navigate([`creator/${profile.path}/diseases`]);
                return;
            }
            // Possible other profiles to come
        }
    }
}
