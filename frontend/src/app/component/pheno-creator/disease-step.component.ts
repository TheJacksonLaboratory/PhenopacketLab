import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { Disease } from 'src/app/models/disease';
import { Phenopacket } from 'src/app/models/phenopacket';
import { Profile, ProfileSelection } from 'src/app/models/profile';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { SpinnerDialogComponent } from '../shared/spinner-dialog/spinner-dialog.component';
import { Utils } from '../shared/utils';

@Component({
    providers: [ConfirmationService],
    selector: 'app-disease-step',
    templateUrl: './disease-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class DiseaseStepComponent implements OnInit, OnDestroy {

    visible = false;

    // disease: Disease;
    diseases: Disease[];
    phenopacket: Phenopacket;
    phenopacketSubscription: Subscription;

    // table contents of diseases
    selectedDisease: Disease;
    // searchparams
    currSearchParams: any = {};
    spinnerDialogRef: any;

    profileSelectionSubscription: Subscription;
    profileSelection: ProfileSelection;

    submitted = false;

    constructor(public searchService: DiseaseSearchService,
        public phenopacketService: PhenopacketService,
        private confirmationService: ConfirmationService,
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
            if (this.diseases) {
                if (this.diseases.length > 0) {
                    this.visible = true;
                }
            }
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

    // Used for disease search bar
    onSearchCriteriaChange(searchCriteria: any) {
        this.currSearchParams.offset = 0;
        const id = searchCriteria.selectedItems[0].selectedValue.id;

        if ((searchCriteria.selectedItems && searchCriteria.selectedItems.length > 0)) {
            this.currSearchParams = searchCriteria;
            this._queryDiseaseById(id);
        }
    }

    private _queryDiseaseById(id: string) {
        this.openSpinnerDialog();
        this.searchService.queryDiseasesById(id).subscribe(data => {
            const disease = new Disease();
            disease.term = new OntologyClass(data.id, data.name);
            disease.excluded = false;
            this.addDisease(disease);
            this.spinnerDialogRef.close();
        },
            (error) => {
                console.log(error);
                this.spinnerDialogRef.close();
            });
    }

    openSpinnerDialog() {
        this.spinnerDialogRef = this.dialog.open(SpinnerDialogComponent, {
            panelClass: 'transparent',
            disableClose: true
        });
    }

    /**
     * Adds a new disease.
     **/
    addDisease(disease?: Disease) {
        if (disease === undefined) {
            return;
        }
        // set unique key for feature table
        disease.key = Utils.getBiggestKey(this.diseases) + 1;
        this.diseases.push(disease);
        // we copy the array after each update so the ngChange method is triggered on the child component
        this.diseases = this.diseases.slice();
        setTimeout(() => this.visible = true, 0);

        this.phenopacket.diseases = this.diseases;
        this.submitted = true;
        // make table visible
        this.visible = true;
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
                if (this.diseases.length === 0) {
                    this.visible = false;
                }
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

    /**
     * Called when a row is selected on the left side table
     * @param event
     */
    onRowSelect(event) {
        this.selectedDisease = event.data;
        this.searchService.setDiseaseOnset(this.selectedDisease.onset);
        this.searchService.setDiseaseResolution(this.selectedDisease.resolution);
        this.searchService.setTnmFindings(this.selectedDisease.clinicalTnmFinding);
        this.searchService.setStages(this.selectedDisease.diseaseStage);
    }

    nextPage() {

        this.phenopacketService.setPhenopacket(this.phenopacket);

        // this.phenopacketService.phenopacket.diseases = this.diseases;
        // check profile and navigate to the corresponding step
        for (const profile of Profile.profileSelectionOptions) {
            if (this.profileSelection === ProfileSelection.ALL_AVAILABLE && profile.value === ProfileSelection.ALL_AVAILABLE) {
                this.router.navigate([`creator/${profile.path}/interpretations`]);
                return;
            } else if (this.profileSelection === ProfileSelection.RARE_DISEASE && profile.value === ProfileSelection.RARE_DISEASE) {
                this.router.navigate([`creator/${profile.path}/interpretations`]);
                return;
            }
        }
        this.submitted = true;

    }
    prevPage() {
        // check profile and navigate to the corresponding step
        for (const profile of Profile.profileSelectionOptions) {
            if (this.profileSelection === ProfileSelection.ALL_AVAILABLE && profile.value === ProfileSelection.ALL_AVAILABLE) {
                this.router.navigate([`creator/${profile.path}/biosamples`]);
                return;
            } else if (this.profileSelection === ProfileSelection.RARE_DISEASE && profile.value === ProfileSelection.RARE_DISEASE) {
                this.router.navigate([`creator/${profile.path}/phenotypic-features`]);
                return;
            }
        }
        this.router.navigate(['creator/phenotypic-features']);
    }
}
