export enum AffectedStatus {
    MISSING,
    UNAFFECTED,
    AFFECTED
}
export class Person {
    familyId: string;
    individualId: string;
    paternalId: string;
    maternalId: string;
    sex: string;
    affectedStatus: AffectedStatus;

}
export class Pedigree {
    persons: Person[];

    constructor() {
        this.persons = [];
    }
}
