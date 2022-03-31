import { OntologyClass, TimeElement } from "./base";

export class Individual {
    id: string;
    alternateId: string;
    dateOfBirth: Date;
    timeAtLastEncounter: TimeElement;
    vitalStatus: VitalStatus;
    sex: Sex;
    karyotypicSex: KaryotypicSex;
    gender: OntologyClass;
    taxonomy: OntologyClass;
}

export enum Status {
    UNKNOWN_STATUS,
    ALIVE,
    DECEASED
}
export class VitalStatus {
    status: Status;
    timeOfDeath: TimeElement;
    causeOfDeath: OntologyClass;
    survivalTimeInDays: number;
}
export enum Sex {
    UNKNOWN_SEX = "Unknown sex",
    FEMALE = "Female",
    MALE = "Male",
    OTHER_SEX = "Other sex"
}
export enum KaryotypicSex {
    UNKNOWN_KARYOTYPE = "Unknown karyotype",
    XX = "XX",
    XY = "XY",
    XO = "XO",
    XXY = "XXY",
    XXX = "XXX",
    XXYY = "XXYY",
    XXXY = "XXXY",
    XXXX = "XXXX",
    XYY = "XYY",
    OTHER_KARYOTYPE = "Other karyotype"
}