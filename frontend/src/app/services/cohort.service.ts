import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cohort } from '../models/cohort';

@Injectable({ providedIn: 'root' })
export class CohortService {

    private cohortSubject = new BehaviorSubject<Cohort>(new Cohort());

    constructor() {
    }
    setCohort(cohort: Cohort) {
        this.cohortSubject.next(cohort);
        // this.cohort = cohort;
    }
    getCohort(): Observable<Cohort> {
        return this.cohortSubject.asObservable();
    }
}
