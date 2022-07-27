import { OntologyClass, TimeElement } from "./base";

export class Individual {
    id: string;
    alternateIds: string[];
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
        if(obj['id']) {
            individual.id = obj['id'];
        }
        if(obj['alternateId']) {
            individual.alternateIds = obj['alternateIds'];
        }
        if(obj['dateOfBirth']) {
            individual.dateOfBirth = obj['dateOfBirth'];
        }
        if(obj['timeAtLastEncounter']) {
            individual.timeAtLastEncounter = TimeElement.convert(obj['timeAtLastEncounter']);
        }
        if(obj['vitalStatus']) {
            individual.vitalStatus = VitalStatus.convert(obj['vitalStatus']);
        }
        if(obj['sex']) {
            individual.sex = obj['sex'];
        }
        if(obj['karyotypicSex']) {
            individual.karyotypicSex = obj['karyotypicSex'];
        }
        if(obj['gender']) {
            individual.gender = OntologyClass.convert(obj['gender']);
        }
        if(obj['taxonomy']) {
            individual.taxonomy = OntologyClass.convert(obj['taxonomy']);
        }
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
        if(obj['status']) {
            vitalSatus.status = obj['status'];
        } else if(obj['timeOfDeath']) {
            vitalSatus.timeOfDeath = TimeElement.convert(obj['timeOfDeath']);
        } else if(obj['causeOfDeath']) {
            vitalSatus.causeOfDeath = OntologyClass.convert(obj['causeOfDeath']);
        } else if(obj['survivalTimeInDays']) {
            vitalSatus.survivalTimeInDays = obj['survivalTimeInDays'];
        }
        return vitalSatus;
    }
}
export enum Sex {
    UNKNOWN_SEX = "UNKNOWN_SEX",
    FEMALE = "FEMALE",
    MALE = "MALE",
    OTHER_SEX = "OTHER_SEX"
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