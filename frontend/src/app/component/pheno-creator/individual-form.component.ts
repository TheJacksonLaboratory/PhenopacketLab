import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OntologyClass, TimeElement } from 'src/app/models/base';
import { Gender, Individual, KaryotypicSex, Sex, Status, VitalStatus } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-individual-form',
    templateUrl: './individual-form.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class IndividualFormComponent implements OnInit, OnDestroy {

    phenopacket: Phenopacket;

    phenopacketSubscription: Subscription;
    submitted = false;

    id: string;
    summary: string;

    timeOfLastEncounter: TimeElement;
    sex: any;
    karyotypicSex: any;
    gender: any;
    dob: Date;
    individual: Individual;

    status: string;
    timeOfDeath: TimeElement;
    causeOfDeath: string;
    survivalTime: number;

    selectedCauseOfDeath: OntologyClass;
    causeOfDeaths: any[];
    causeOfDeathSubscription: Subscription;

    constructor(public phenopacketService: PhenopacketService, private router: Router) {

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
            console.log(this.causeOfDeaths);

        });
        if (this.phenopacket === undefined) {
            this.phenopacket = new Phenopacket();
            this.phenopacket.subject = new Individual();
        }
        // set up
        if (this.phenopacket) {
            this.id = this.phenopacket.id;
            this.sex = this.phenopacket.subject?.sex;
            this.karyotypicSex = this.phenopacket.subject?.karyotypicSex;
            this.gender = this.phenopacket.subject?.gender;
            this.timeOfLastEncounter = this.phenopacket.subject?.timeAtLastEncounter;
            this.status = this.phenopacket.subject?.vitalStatus?.status;
            this.timeOfDeath = this.phenopacket.subject?.vitalStatus?.timeOfDeath;
            this.causeOfDeath = this.phenopacket.subject?.vitalStatus?.causeOfDeath?.toString();
            this.survivalTime = this.phenopacket.subject?.vitalStatus?.survivalTimeInDays;

        }

    }

    nextPage() {
        console.log('next page');
        console.log(this.phenopacket);
        if (this.phenopacket.id) {
            // this.phenopacketService.setPhenopacket(this.phenopacket);
            this.phenopacketService.phenopacket = this.phenopacket;
            // vital status

            // cause of death
            if (this.selectedCauseOfDeath) {
                if (this.phenopacket.subject.vitalStatus) {
                    this.phenopacket.subject.vitalStatus = new VitalStatus();
                    this.phenopacket.subject.vitalStatus.causeOfDeath = this.selectedCauseOfDeath;
                    console.log(this.selectedCauseOfDeath);
                }
            }
            this.router.navigate(['pheno-creator/phenotypic-features']);
            console.log(this.phenopacketService.getPhenopacket());

            return;
        }
        this.submitted = true;

    }

    /**
     *
     * @param timeOfLastEncouter a TimeElement
     */
    updateTimeOfLastEncounter(timeOfLastEncouter: any) {
        console.log(timeOfLastEncouter);
        this.phenopacket.subject.timeAtLastEncounter = timeOfLastEncouter;
        this.phenopacketService.setPhenopacket(this.phenopacket);
    }

    /**
     *
     * @param timeOfDeath a TimeElement
     */
    updateTimeOfDeath(timeOfDeath: any) {
        if (this.phenopacket.subject.vitalStatus === undefined) {
            this.phenopacket.subject.vitalStatus = new VitalStatus();
        }
        this.phenopacket.subject.vitalStatus.timeOfDeath = timeOfDeath;
        this.phenopacketService.setPhenopacket(this.phenopacket);
    }
    updateCauseOfDeath(causeOfDeath: OntologyClass) {
        if (this.phenopacket.subject.vitalStatus === undefined) {
            this.phenopacket.subject.vitalStatus = new VitalStatus();
        }
        this.phenopacket.subject.vitalStatus.causeOfDeath = causeOfDeath;
        this.phenopacketService.setPhenopacket(this.phenopacket);
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

    getCauseOfDeath() {

    }
    changeCauseOfDeath(eventObj: OntologyClass) {
        // this.procedureCode = eventObj;
        // // update medicalAction
        // if (this.medicalAction) {
        //   this.medicalAction.action.code = this.procedureCode;
        // }
    }
    editStatus() {
        // TODO
    }
    editTimeOfLastEncounter() {
        // TODO
    }


}
