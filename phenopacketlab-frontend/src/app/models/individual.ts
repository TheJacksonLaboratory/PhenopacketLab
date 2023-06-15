import { OntologyClass, TimeElement } from './base';
import { Disease } from './disease';

export class Individual {
    id = '';
    alternateIds: string[];
    dateOfBirth: string; // timestamp
    timeAtLastEncounter: TimeElement;
    vitalStatus: VitalStatus;
    sex: string;
    karyotypicSex: string;
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
        if (obj['alternateIds']) {
            individual.alternateIds = obj['alternateIds'];
        }
        if (obj['dateOfBirth']) {
            individual.dateOfBirth = obj['dateOfBirth'];
        }
        if (obj['timeAtLastEncounter']) {
            individual.timeAtLastEncounter = TimeElement.convert(obj['timeAtLastEncounter']);
        }
        if (obj['vitalStatus']) {
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

    public constructor(status?: Status, timeOfDeath?: TimeElement, causeOfDeath?: OntologyClass, survivalTimeInDays?: number) {
        this.status = status;
        this.timeOfDeath = timeOfDeath;
        this.causeOfDeath = causeOfDeath;
        this.survivalTimeInDays = survivalTimeInDays;
    }

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
            vitalSatus.causeOfDeath.termUrl = Disease.getDiseaseURL(vitalSatus.causeOfDeath.id);
        }
        if (obj['survivalTimeInDays']) {
            vitalSatus.survivalTimeInDays = obj['survivalTimeInDays'];
        }
        return vitalSatus;
    }
}

export class ConstantObject {
    lbl: string;
    def: string;
    syn: string[];
    id: Id;
}
export class Id {
    value: string;
    prefix: string;
    id: string;
}
export class KaryotypicSex {
    public static VALUES = [new KaryotypicSex('UNKNOWN_KARYOTYPE', 'Untyped or inconclusive karyotyping'),
        new KaryotypicSex('XX', 'Female'),
        new KaryotypicSex('XY', 'Male'),
        new KaryotypicSex('XO', 'Single X chromosome only'),
        new KaryotypicSex('XXY', 'Two X and one Y chromosome'),
        new KaryotypicSex('XXX', 'Three X chromosomes'),
        new KaryotypicSex('XXYY', 'Two X chromosomes and two Y chromosomes'),
        new KaryotypicSex('XXXY', 'Three X chromosomes and one Y chromosome'),
        new KaryotypicSex('XXXX', 'Four X chromosomes'),
        new KaryotypicSex('XYY', 'One X and two Y chromosomes'),
        new KaryotypicSex('OTHER_KARYOTYPE', 'None of the above types')];

    name: string;
    definition;
    id: Id;

    constructor(name: string, definition: string, id?: Id) {
        this.name = name;
        this.definition = definition;
        this.id = id;
    }
}

