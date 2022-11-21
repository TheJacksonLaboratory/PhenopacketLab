import { OntologyClass, TimeElement } from './base';

export class Individual {
    id = '';
    alternateIds: string[] = [];
    dateOfBirth = ''; // timestamp
    timeAtLastEncounter: TimeElement;
    vitalStatus: VitalStatus = new VitalStatus();
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
        if (obj['id']) {
            individual.id = obj['id'];
        } else {
            throw new Error(`Phenopacket file is missing 'id' field in 'subject' object.`);
        }
        if (obj['alternateId']) {
            individual.alternateIds = obj['alternateIds'];
        }
        if (obj['dateOfBirth']) {
            individual.dateOfBirth = obj['dateOfBirth'];
        }
        if (obj['timeAtLastEncounter']) {
            individual.timeAtLastEncounter = TimeElement.convert(obj['timeAtLastEncounter']);
        }
        if  (obj['vitalStatus']) {
            individual.vitalStatus = VitalStatus.convert(obj['vitalStatus']);
        }
        if (obj['sex']) {
            individual.sex = obj['sex'];
        }
        if (obj['karyotypicSex']) {
            individual.karyotypicSex = obj['karyotypicSex'];
        }
        if (obj['gender']) {
            individual.gender = OntologyClass.convert(obj['gender']);
        }
        if (obj['taxonomy']) {
            individual.taxonomy = OntologyClass.convert(obj['taxonomy']);
        }
        return individual;
    }
}

export enum Status {
    UNKNOWN_STATUS = 'UNKNOWN_STATUS',
    ALIVE = 'ALIVE',
    DECEASED = 'DECEASED'
}
export class VitalStatus {
    status: Status;
    timeOfDeath: TimeElement;
    causeOfDeath: OntologyClass;
    survivalTimeInDays: number;

    public static convert(obj: any): VitalStatus {
        const vitalSatus = new VitalStatus();
        if (obj['status']) {
            vitalSatus.status = obj['status'];
        }
        if (obj['timeOfDeath']) {
            vitalSatus.timeOfDeath = TimeElement.convert(obj['timeOfDeath']);
        }
        if (obj['causeOfDeath']) {
            vitalSatus.causeOfDeath = OntologyClass.convert(obj['causeOfDeath']);
        }
        if (obj['survivalTimeInDays']) {
            vitalSatus.survivalTimeInDays = obj['survivalTimeInDays'];
        }
        return vitalSatus;
    }
}
export enum Sex {
    UNKNOWN_SEX = 'UNKNOWN_SEX',
    FEMALE = 'FEMALE',
    MALE = 'MALE',
    OTHER_SEX = 'OTHER_SEX'
}
export enum KaryotypicSex {
    UNKNOWN_KARYOTYPE = 'Unknown karyotype',
    XX = 'XX',
    XY = 'XY',
    XO = 'XO',
    XXY = 'XXY',
    XXX = 'XXX',
    XXYY = 'XXYY',
    XXXY = 'XXXY',
    XXXX = 'XXXX',
    XYY = 'XYY',
    OTHER_KARYOTYPE = 'Other karyotype'
}

export class Gender {
    static VALUES = [new OntologyClass('LOINC:LA22878-5', 'Identifies as male'),
            new OntologyClass('LOINC:LA22879-3', 'Identifies as female'),
            new OntologyClass('LOINC:LA22880-1', 'Female-to-male transsexual'),
            new OntologyClass('LOINC:LA22881-9', 'Male-to-female transsexual'),
            new OntologyClass('LOINC:LA22882-7', 'Identifies as non-conforming'),
            new OntologyClass('LOINC:LA46-8', 'other'),
            new OntologyClass('LOINC:LA20384-6', 'Asked but unknown')];

}
