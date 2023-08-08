import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { OntologyClass, TimeElement } from 'src/app/models/base';
import { ConstantObject, Individual, KaryotypicSex, Sex, Status, VitalStatus } from 'src/app/models/individual';
import { ProfileSelection } from 'src/app/models/profile';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { Utils } from '../../utils';

@Component({
    selector: 'app-individual-edit',
    templateUrl: './individual-edit.component.html',
    styleUrls: ['./individual-edit.component.scss']
})
export class IndividualEditComponent implements OnInit, OnDestroy {

    @Input()
    subject: Individual;
    @Input()
    profile: ProfileSelection;
    @Output()
    subjectChange = new EventEmitter<Individual>();

    @Input()
    submitted: boolean;

    timeOfLastEncounter: TimeElement;
    status: Status;
    // cause of death
    causeOfDeathItems: OntologyClass[];
    causeOfDeathItemsCount: number;
    causeOfDeathSearchstate = 'inactive';
    causeOfDeathQuery = new Subject();
    causeOfDeathQueryText: string;
    causeOfDeathNotFoundFlag = false;
    loadingCauseOfDeathSearchResults = false;
    selectedCauseOfDeath: OntologyClass;

    selectedSex: ConstantObject;
    selectedKaryotypicSex: ConstantObject;

    spinnerDialogRef: DynamicDialogRef;

    // time of survival
    rangeDates: Date[];
    @ViewChild('rangecalendar') private calendar: any;
    useCalendar: boolean;

    constructor(public diseaseService: DiseaseSearchService) {
    }

    ngOnInit() {
        // get cause of death
        this.causeOfDeathQuery.pipe(debounceTime(425),
            distinctUntilChanged()).subscribe((val: string) => {
                if (this.hasValidCauseOfDeathInput(val)) {
                    this.loadingCauseOfDeathSearchResults = true;
                    this.causeOfDeathQueryText = val;
                    this.diseaseService.searchDiseases(val).subscribe((data) => {
                        this.causeOfDeathItems = [];
                        for (const concept of data.foundConcepts) {
                            this.causeOfDeathItems.push(new OntologyClass(concept.id, concept.lbl, concept.id));
                        }
                        this.causeOfDeathItemsCount = data.numberOfTerms;
                        this.causeOfDeathNotFoundFlag = (this.causeOfDeathItemsCount === 0);
                        this.causeOfDeathSearchstate = 'active';
                    }, (error) => {
                        console.log(error);
                        this.loadingCauseOfDeathSearchResults = false;
                    }, () => {
                        this.loadingCauseOfDeathSearchResults = false;
                    });

                } else {
                    this.causeOfDeathSearchstate = 'inactive';
                }
            }); // End debounce subscribe

        if (this.subject) {
            // timeOfLastEncounter
            this.timeOfLastEncounter = this.subject.timeAtLastEncounter;
            this.status = this.subject.vitalStatus?.status;
            // set Sex
            for (const sex of Sex.VALUES) {
                if (this.subject.sex === sex.lbl) {
                    this.selectedSex = sex;
                }
            }
            for (const karyosex of KaryotypicSex.VALUES) {
                if (this.subject.karyotypicSex === karyosex.lbl) {
                    this.selectedKaryotypicSex = karyosex;
                }
            }
            // cause of death
            if (this.subject.vitalStatus?.causeOfDeath) {
                this.selectedCauseOfDeath = this.subject.vitalStatus.causeOfDeath;
                this.causeOfDeathItems = [this.selectedCauseOfDeath];
            }
        }
    }
    ngOnDestroy(): void {
    }

    /**
      *
      * @param timeOfLastEncounter a TimeElement
      */
    updateTimeOfLastEncounter(timeOfLastEncounter: TimeElement) {
        if (this.subject) {
            this.timeOfLastEncounter = timeOfLastEncounter;
            this.subject.timeAtLastEncounter = timeOfLastEncounter;
            this.subjectChange.emit(this.subject);
        }
    }

    updateSex(sex: ConstantObject) {
        if (this.subject) {
            if (sex) {
                this.subject.sex = sex.lbl;
            } else {
                this.subject.sex = undefined;
            }
            this.subjectChange.emit(this.subject);
        }
    }

    updateKaryotypicSex(karyotypicSex: ConstantObject) {
        if (this.subject) {
            if (karyotypicSex) {
                this.subject.karyotypicSex = karyotypicSex.lbl;
            } else {
                this.subject.karyotypicSex = undefined;
            }
            this.subjectChange.emit(this.subject);

        }
    }

    updateStatus(status: any) {
        if (this.subject) {
            if (status) {
                if (this.subject.vitalStatus === undefined) {
                    this.subject.vitalStatus = new VitalStatus();
                }
                this.subject.vitalStatus.status = status;
                this.status = status;
            } else {
                this.subject.vitalStatus = undefined;
            }
            this.subjectChange.emit(this.subject);
        }
    }
    updateSurvivalTime(event: any) {
        let numberOfDays: number;
        // if event is Date, then call is from calendar range
        if (event instanceof Date) {
            if (this.rangeDates[1]) { // If second date is selected
                this.calendar.overlayVisible = false;
            }
            // convert date range to # of days
            if (this.rangeDates[0] < this.rangeDates[1]) {
                const diff = Math.abs(this.rangeDates[1].getTime() - this.rangeDates[0].getTime());
                numberOfDays = Math.ceil(diff / (1000 * 3600 * 24));
            } else {
                console.log('end date is smaller!');
            }
        } else {
            numberOfDays = event.value;
        }

        if (this.subject && numberOfDays !== undefined) {
            this.subject.vitalStatus.survivalTimeInDays = numberOfDays;
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

    updateCauseOfDeath(causeOfDeath: any) {
        if (this.subject) {
            if (causeOfDeath) {
                if (this.causeOfDeathSearchstate === 'active') {
                    this.causeOfDeathSearchstate = 'inactive';
                }
                this.selectedCauseOfDeath = causeOfDeath;
                causeOfDeath.termUrl = Utils.getUrlForId(causeOfDeath.id);
                this.subject.vitalStatus.causeOfDeath = causeOfDeath;
                this.subjectChange.emit(this.subject);

            } else {
                this.subject.vitalStatus.causeOfDeath = undefined;
                this.subjectChange.emit(this.subject);
            }
        }
    }
    causeOfDeathContentChanging(input: string) {
        this.causeOfDeathQuery.next(input);
    }
    hasValidCauseOfDeathInput(qString: string) {
        return (qString && qString.length >= 3);
    }

    getSexes() {
        return Sex.VALUES;
    }
    getKaryotypicSexes() {
        return KaryotypicSex.VALUES;
    }
    getStatuses() {
        // tslint:disable-next-line:radix
        return Object.values(Status).filter(x => !(parseInt(x) >= 0));
    }
    getDeceasedStatus() {
        return Status.DECEASED;
    }

}
