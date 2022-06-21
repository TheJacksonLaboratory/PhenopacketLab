import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Family } from "../models/family";

@Injectable({ providedIn: 'root' })
export class FamilyService {

    family: Family;

    private familySubject = new Subject<Family>();

    setFamily(newFamily: Family) {
        this.familySubject.next(newFamily);
        this.family = newFamily;
    }
    getFamily(): Observable<Family> {
        return this.familySubject.asObservable();
    }
}