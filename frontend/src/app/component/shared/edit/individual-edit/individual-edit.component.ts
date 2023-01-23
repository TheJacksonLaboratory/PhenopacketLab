import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { Individual, KaryotypicSex, Sex, Status } from 'src/app/models/individual';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
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

    selectedSex: string;
    sexes: string[];
    sexSubscription: Subscription;

    genders: OntologyClass[];
    genderSubscription: Subscription;

    constructor(public phenopacketService: PhenopacketService, public diseaseService: DiseaseSearchService) {
    }

    ngOnInit() {
        // get cause of death
        this.causeOfDeathSubscription = this.diseaseService.getAll().subscribe(diseases => {
            this.causeOfDeaths = diseases;
        });
        this.sexSubscription = this.phenopacketService.getSex().subscribe(sexes => {
            if (this.sexes === undefined) {
                this.sexes = [];
            }
            for (const sex of sexes) {
                this.sexes.push(sex.name);
            }
        });
        this.genderSubscription = this.phenopacketService.getGender().subscribe(genders => {
            if (this.genders === undefined) {
                this.genders = [];
            }
            for (const gender of genders) {
                this.genders.push(new OntologyClass(gender.id.value, gender.name));
            }
        });
        if (this.subject) {
            this.selectedSex = this.subject.sex;
        }
    }
    ngOnDestroy(): void {
        if (this.causeOfDeathSubscription) {
            this.causeOfDeathSubscription.unsubscribe();
        }
        if (this.sexSubscription) {
            this.sexSubscription.unsubscribe();
        }
        if (this.genderSubscription) {
            this.genderSubscription.unsubscribe();
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

    updateSex(event: any) {
        if (this.subject && event) {
            this.subject.sex = event.value;
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
            this.subject.vitalStatus.causeOfDeath = new OntologyClass(event.value.id, event.value.name);
            this.subjectChange.emit(this.subject);
        }
    }
    getSexes() {
        // tslint:disable-next-line:radix
        return Object.values(Sex).filter(x => !(parseInt(x) >= 0));
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
