import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cohort } from '../models/cohort';
import { Phenopacket } from '../models/phenopacket';

@Injectable({ providedIn: 'root' })
export class CohortService {

    private cohortSubject = new BehaviorSubject<Cohort>(new Cohort());

    constructor() {
    }
    setCohort(cohort: Cohort) {
        this.cohortSubject.next(cohort);
    }
    getCohort(): Observable<Cohort> {
        return this.cohortSubject.asObservable();
    }

    addCohortMember(phenopacket: Phenopacket) {
        const cohort = this.cohortSubject.getValue();
        cohort.members.push(phenopacket);
        this.cohortSubject.next(cohort);
    }

    removeCohortMember(phenopacket: Phenopacket) {
        const cohort = this.cohortSubject.getValue();
        for (let i = cohort.members.length - 1; i >= 0; --i) {
            if (cohort.members[i].id === phenopacket.id) {
                cohort.members.splice(i, 1);
            }
        }

        this.cohortSubject.next(cohort);
    }
}
