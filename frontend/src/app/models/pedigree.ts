import { Sex } from "./individual";

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
    sex: Sex;
    affectedStatus: AffectedStatus;

}
export class Pedigree {
    persons: Person;
}