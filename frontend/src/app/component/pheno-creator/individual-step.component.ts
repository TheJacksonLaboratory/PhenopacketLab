import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OntologyClass, TimeElement } from 'src/app/models/base';
import { Gender, Individual, KaryotypicSex, Sex, Status } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import {CohortService} from '../../services/cohort.service';

@Component({
    selector: 'app-individual-step',
    templateUrl: './individual-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class IndividualStepComponent implements OnInit, OnDestroy {

    phenopacket: Phenopacket;

    phenopacketSubscription: Subscription;
    submitted = false;

    summary: string;
    ageType: any;
    timeOfLastEncounter: TimeElement;
    selectedSex: any;
    selectedKaryotypicSex: any;
    selectedGender: any;
    dob: Date;
    individual: Individual;

    selectedStatus: any;
    timeOfDeath: TimeElement;
    survivalTime: number;

    selectedCauseOfDeath: OntologyClass;
    causeOfDeaths: any[];
    causeOfDeathSubscription: Subscription;

    constructor(public phenopacketService: PhenopacketService, private cohortService: CohortService, private router: Router) {

    }
    ngOnDestroy(): void {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
        if (this.causeOfDeathSubscription) {
            this.causeOfDeathSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.phenopacket = this.phenopacketService.phenopacket;
        this.causeOfDeathSubscription = this.phenopacketService.getMondoDiseases().subscribe(nodes => {
            this.causeOfDeaths = <TreeNode[]>nodes.data;

        });
        if (this.phenopacket === undefined) {
            this.phenopacket = new Phenopacket();
            this.phenopacket.subject = new Individual();
        }
        // set up
        if (this.phenopacket) {
            this.selectedSex = this.phenopacket.subject?.sex;
            this.selectedKaryotypicSex = this.phenopacket.subject?.karyotypicSex;
            this.selectedGender = this.phenopacket.subject?.gender;
            this.timeOfLastEncounter = this.phenopacket.subject?.timeAtLastEncounter;
            this.selectedStatus = this.phenopacket.subject?.vitalStatus?.status;
            this.timeOfDeath = this.phenopacket.subject?.vitalStatus?.timeOfDeath;
            this.selectedCauseOfDeath = this.phenopacket.subject?.vitalStatus?.causeOfDeath;
            this.survivalTime = this.phenopacket.subject?.vitalStatus?.survivalTimeInDays;

        }

    }

    /**
     *
     * @param timeOfLastEncounter a TimeElement
     */
    updateTimeOfLastEncounter(timeOfLastEncounter: any) {
        this.timeOfLastEncounter = timeOfLastEncounter;
        this.phenopacket.subject.timeAtLastEncounter = this.timeOfLastEncounter;
    }

    updateSex(event) {
        this.selectedSex = event.value;
        // update phenopacket
        this.phenopacket.subject.sex = this.selectedSex;
    }
    updateKaryotypicSex(event) {
        this.selectedKaryotypicSex = event.value;
        this.phenopacket.subject.karyotypicSex = this.selectedKaryotypicSex;
    }
    updateGender(event) {
        this.selectedGender = event.value;
        this.phenopacket.subject.gender = this.selectedGender;
    }
    updateStatus(event) {
        this.selectedStatus = event.value;
        this.phenopacket.subject.vitalStatus.status = this.selectedStatus;
    }
    updateSurvivalTime(event) {
        this.survivalTime = event.value;
        this.phenopacket.subject.vitalStatus.survivalTimeInDays = this.survivalTime;
    }
    /**
     *
     * @param timeOfDeath a TimeElement
     */
    updateTimeOfDeath(timeOfDeath: any) {
        this.timeOfDeath = timeOfDeath;
        this.phenopacket.subject.vitalStatus.timeOfDeath = this.timeOfDeath;
    }
    updateCauseOfDeath(event) {
        this.selectedCauseOfDeath = new OntologyClass(event.node.key, event.node.label);
        this.phenopacket.subject.vitalStatus.causeOfDeath = this.selectedCauseOfDeath;
    }
    getSexes() {
        // tslint:disable-next-line:radix
        return Object.values(Sex).filter(x => !(parseInt(x) >= 0));
    }

    getGenders() {
        return Gender.VALUES;
    }

    getKaryotypicSexes() {
        // tslint:disable-next-line:radix
        return Object.values(KaryotypicSex).filter(x => !(parseInt(x) >= 0));
    }
    getStatuses() {
        // tslint:disable-next-line:radix
        return Object.values(Status).filter(x => !(parseInt(x) >= 0));
    }

    nextPage() {
        if (this.phenopacket.id) {
            // TODO Check if id already exists
            this.phenopacketService.phenopacket = this.phenopacket;
            this.router.navigate(['pheno-creator/phenotypic-features']);
            return;
        }
        this.submitted = true;

    }
}
