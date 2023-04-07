import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Family } from '../models/family';
import { Phenopacket } from '../models/phenopacket';

@Injectable({ providedIn: 'root' })
export class FamilyService {

    family: Family;

    private phenopacketSubject = new Subject<Phenopacket>();
    private familySubject = new Subject<Family>();

    setFamily(newFamily: Family) {
        this.familySubject.next(newFamily);
        this.family = newFamily;
    }
    getFamily(): Observable<Family> {
        return this.familySubject.asObservable();
    }
    addPhenopacket(phenopacket: Phenopacket) {
        this.phenopacketSubject.next(phenopacket);
        if (this.family === undefined) {
            this.family = new Family('family-id');
        }
        this.family.relatives.set(phenopacket.id, phenopacket);
        this.setFamily(this.family);
    }
    getPhenopacket(): Observable<Phenopacket> {
        return this.phenopacketSubject.asObservable();
    }
}
