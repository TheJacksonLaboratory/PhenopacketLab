import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { Gender, Individual, KaryotypicSex, Sex, Status } from 'src/app/models/individual';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-individual-edit',
    templateUrl: './individual-edit.component.html',
    styleUrls: ['./individual-edit.component.scss']
})
export class IndividualEditComponent implements OnInit, OnDestroy {

    @Input()
    subject: Individual;
    @Output()
    subjectChange = new EventEmitter<Individual>();

    causeOfDeaths: any[];
    causeOfDeathSubscription: Subscription;

    constructor(public phenopacketService: PhenopacketService) {
    }

    ngOnInit() {
        // get cause of death
        this.causeOfDeathSubscription = this.phenopacketService.getMondoDiseases().subscribe(nodes => {
            this.causeOfDeaths = <TreeNode[]>nodes;
        });
    }
    ngOnDestroy(): void {
        if (this.causeOfDeathSubscription) {
            this.causeOfDeathSubscription.unsubscribe();
        }
    }

    /**
      *
      * @param timeOfLastEncounter a TimeElement
      */
    updateTimeOfLastEncounter(timeOfLastEncounter: any) {
        if (this.subject) {
            console.log('update Time Of Last encounter');
            console.log(timeOfLastEncounter);
            this.subject.timeAtLastEncounter = timeOfLastEncounter;
            this.subjectChange.emit(this.subject);
        }
    }

    updateSex(sex: any) {
        if (this.subject) {
            this.subject.sex = sex;
            this.subjectChange.emit(this.subject);
        }
    }
    updateKaryotypicSex(karyoSex: any) {
        if (this.subject) {
            this.subject.karyotypicSex = karyoSex;
            this.subjectChange.emit(this.subject);
        }
    }
    updateGender(gender: any) {
        if (this.subject) {
            this.subject.gender = gender;
            this.subjectChange.emit(this.subject);
        }
    }
    updateStatus(status: any) {
        if (this.subject) {
            this.subject.vitalStatus.status = status;
            this.subjectChange.emit(this.subject);
        }
    }
    updateSurvivalTime(event: any) {
        if (this.subject) {
            this.subject.vitalStatus.survivalTimeInDays = event.value;
            this.subjectChange.emit(this.subject);
        }
    }
    /**
     *
     * @param timeOfDeath a TimeElement
     */
    updateTimeOfDeath(timeOfDeath: any) {
        if (this.subject) {
            this.subject.vitalStatus.timeOfDeath = timeOfDeath;
            this.subjectChange.emit(this.subject);
        }
    }
    updateCauseOfDeath(event) {
        if (this.subject) {
            this.subject.vitalStatus.causeOfDeath = new OntologyClass(event.node.key, event.node.label);
            this.subjectChange.emit(this.subject);
        }
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
    getDeceasedStatus() {
        return Status.DECEASED;
    }

}
