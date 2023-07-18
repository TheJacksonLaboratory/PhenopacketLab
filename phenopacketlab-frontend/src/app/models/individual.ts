import { OntologyClass, TimeElement } from './base';
import { Disease } from './disease';

export class Individual {
    // not part of phenopacket schema
    isPrivateInfoWarnSelected?: boolean;

    id;
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
    id: string;
    name: string;

    constructor(lbl: string, def: string, id?: string, syn?: string[]) {
        this.lbl = lbl;
        this.def = def;
        this.syn = syn;
        this.id = id;
        this.name = `[${this.id}] ${this.lbl}`;
    }
}

export class KaryotypicSex {
    public static VALUES = [new ConstantObject('UNKNOWN_KARYOTYPE', 'Untyped or inconclusive karyotyping'),
        new ConstantObject('XX', 'Female'),
        new ConstantObject('XY', 'Male'),
        new ConstantObject('XO', 'Single X chromosome only'),
        new ConstantObject('XXY', 'Two X and one Y chromosome'),
        new ConstantObject('XXX', 'Three X chromosomes'),
        new ConstantObject('XXYY', 'Two X chromosomes and two Y chromosomes'),
        new ConstantObject('XXXY', 'Three X chromosomes and one Y chromosome'),
        new ConstantObject('XXXX', 'Four X chromosomes'),
        new ConstantObject('XYY', 'One X and two Y chromosomes'),
        new ConstantObject('OTHER_KARYOTYPE', 'None of the above types')];
}
export class Sex {
    public static VALUES = [new ConstantObject('UNKNOWN_SEX', 'Not assessed or not available. Maps to NCIT:C17998'),
        new ConstantObject('FEMALE', 'Female sex. Maps to NCIT:C46113'),
        new ConstantObject('MALE', 'Male sex. Maps to NCIT:C46112'),
        new ConstantObject('OTHER_SEX', 'It is not possible to accurately assess the applicability of MALE/FEMALE. Maps to NCIT:C45908')];
}

