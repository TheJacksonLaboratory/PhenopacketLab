import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Cohort } from "../models/cohort";

@Injectable({ providedIn: 'root' })
export class CohortService {

    private cohortSubject = new Subject<Cohort>();

    setCohort(cohort: Cohort) {
        this.cohortSubject.next(cohort);
    }
    getCohort(): Observable<Cohort> {
        return this.cohortSubject.asObservable();
    }
}