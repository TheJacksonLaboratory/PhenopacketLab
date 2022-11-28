import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cohort } from '../models/cohort';
import { Phenopacket } from '../models/phenopacket';

@Injectable({ providedIn: 'root' })
export class CohortService {

    cohort: Cohort;

    private cohortSubject = new Subject<Cohort>();
    private phenopacketSubject = new Subject<Phenopacket>();

    setCohort(cohort: Cohort) {
        this.cohortSubject.next(cohort);
    }
    getCohort(): Observable<Cohort> {
        return this.cohortSubject.asObservable();
    }
    addPhenopacket(phenopacket: Phenopacket) {
        this.phenopacketSubject.next(phenopacket);
        if (this.cohort === undefined) {
            this.cohort = new Cohort();
        }
        this.cohort.members.push(phenopacket);
        this.setCohort(this.cohort);
    }
    getPhenopacket(): Observable<Phenopacket> {
        return this.phenopacketSubject.asObservable();
    }
}
