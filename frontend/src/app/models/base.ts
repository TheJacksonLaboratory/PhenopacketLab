
export class OntologyClass {
    id: string;
    label: string;
    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }
}
export class ExternalReference {
    id: string;
    reference: string;
    description: string;
}
export class Evidence {
    evidenceCode: OntologyClass;
    reference: ExternalReference;
    bodySite: OntologyClass;
    performed: TimeElement;
    constructor(evidenceCode: OntologyClass, bodySite?: OntologyClass, performed?: TimeElement) {
        this.evidenceCode = evidenceCode;
        this.bodySite = bodySite;
        this.performed = performed;
    }
}
export class Procedure {
    code: OntologyClass;
    bodySites: OntologyClass[];
    performedOn: TimeElement[];

    toString() {
        return "Procedure";
    }
}
export class Age {
    iso8601duration: string;

    constructor(val: string) {
        this.iso8601duration = val;
    }
}

export class AgeRange {
    start = new Age("1");
    end = new Age("2");
    constructor(start: Age, end: Age) {
        this.start = start;
        this.end = end;
    }
}

export class TimeInterval {
    start: string;
    end: string;
    constructor(start: string, end: string) {
        this.start = start;
        this.end = end;
    }
}
export class GestationalAge {
    weeks: number;
    days: number;
    constructor(weeks: number, days: number) {
        this.weeks = weeks;
        this.days = days;
    }

    toString() {
        return `${this.weeks} weeks, ${this.days} days`;
    }
}
export class TimeElement {
    gestationalAge: GestationalAge;
    age: Age;
    ageRange: AgeRange;
    ontologyClass: OntologyClass;
    timestamp: string;
    interval: TimeInterval;
    constructor(gestationalAge?: GestationalAge, age?: Age, ageRange?: AgeRange, ontologyClass?: OntologyClass,
        timestamp?: string, interval?: TimeInterval) {
        this.gestationalAge = gestationalAge;
        this.age = age;
        this.ageRange = ageRange;
        this.ontologyClass = ontologyClass;
        this.timestamp = timestamp;
        this.interval = interval;
    }
}
export class File {
    id: string; // not part of the phenopacket model (used only to distinguish between files)
    uri: string;
    individualToFileIdentifier = new Map<string, string>();
    fileAttribute = new Map<string, string>();

    constructor(uri: string, description: string) {
        this.uri = uri;
        this.fileAttribute.set('description', description);
        
    }
}

