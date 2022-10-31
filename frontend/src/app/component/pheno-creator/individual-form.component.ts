import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
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

    sex: any;
    karyotypicSex: any;
    gender: any;
    dob: Date;
    individual: Individual;

    status: string;
    timeOfDeath: string;
    causeOfDeath: string;
    survivalTime: number;

    constructor(public phenopacketService: PhenopacketService, private router: Router) {

    }
    ngOnDestroy(): void {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.phenopacket = this.phenopacketService.phenopacket;
        // this.phenopacketSubscription = this.phenopacketService.getPhenopacket().subscribe(phenopacket => {
        //     this.phenopacket = phenopacket;
        //   });
        if (this.phenopacket === undefined) {
            this.phenopacket = new Phenopacket();
            this.phenopacket.subject = new Individual();
        }

    }

    nextPage() {
        console.log('next page');
        console.log(this.phenopacket);
        if (this.phenopacket.id) {
            // this.phenopacketService.setPhenopacket(this.phenopacket);
            this.phenopacketService.phenopacket = this.phenopacket;
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
        console.log(Gender.VALUES);
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
