import { OntologyClass, TimeElement } from "./base";

export class Individual {
    id: string;
    alternateId: string;
    dateOfBirth: string; // timestamp
    timeAtLastEncounter: TimeElement;
    vitalStatus: VitalStatus;
    sex: Sex;
    karyotypicSex: KaryotypicSex;
    gender: OntologyClass;
    taxonomy: OntologyClass;

    /**
     * 
     * @param obj 
     * @returns 
     */
    public static convert(obj: any): Individual {
        const individual = new Individual();
        individual.id = obj['id'];
        individual.alternateId = obj['alternateId'];
        individual.dateOfBirth = obj['dateOfBirth'];
        individual.timeAtLastEncounter = TimeElement.convert(obj['timeAtLastEncounter']);
        individual.vitalStatus = VitalStatus.convert(obj['vitalStatus']);
        individual.sex = obj['sex'];
        individual.karyotypicSex = obj['karyotypicSex'];
        individual.gender = OntologyClass.convert(obj['gender']);
        individual.taxonomy = OntologyClass.convert(obj['taxonomy']);
        return individual;
    }
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

    public static convert(obj: any): VitalStatus {
        const vitalSatus = new VitalStatus();
        vitalSatus.status = obj['status'];
        vitalSatus.timeOfDeath = TimeElement.convert(obj['timeOfDeath']);
        vitalSatus.causeOfDeath = OntologyClass.convert(obj['causeOfDeath']);
        vitalSatus.survivalTimeInDays = obj['survivalTimeInDays'];
        return vitalSatus;
    }
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