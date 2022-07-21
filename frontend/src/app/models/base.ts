/**
 * Class to convert to list or list of phenopacket model objects.
 * the Phenopacket model objects that can have more than one instance should
 * extend this class.
 */
export class Convert {

    public static convert(obj: any): any {
        if (Array.isArray(obj)) {
            const array = [];
            for (let item of obj) {
                const it = this.create(item);;
                array.push(it);
            }
            return array;
        } else {
            return this.create(obj);
        }
    }

    /**
     * To be overriden
     * @param obj 
     */
    static create(obj: any): any {
        return new Error("this function needs to be overriden");
    }
}

export class OntologyClass extends Convert {
    id: string;
    label: string;

    constructor(id?: string, label?: string) {
        super();
        this.id = id;
        this.label = label;
    }
    static create(obj: any): OntologyClass {
        const ontologyClass = new OntologyClass();
        ontologyClass.id = obj['id'];
        ontologyClass.label = obj['label'];
        return ontologyClass;
    }

}
export class ExternalReference {
    id: string;
    reference: string;
    description: string;

    static convert(obj: any): ExternalReference {
        const externalReference = new ExternalReference();
        externalReference.id = obj['id'];
        externalReference.reference = obj['reference'];
        externalReference.description = obj['description'];
        return externalReference;
    }
}
export class Evidence {
    evidenceCode: OntologyClass;
    reference: ExternalReference;

    constructor(evidenceCode?: OntologyClass, reference?: ExternalReference) {
        this.evidenceCode = evidenceCode;
        this.reference = reference;
    }

    public static convert(obj: any): Evidence {
        const evidence = new Evidence();
        evidence.evidenceCode = OntologyClass.convert(obj['evidenceCode']);
        evidence.reference = ExternalReference.convert(obj['reference']);
        return evidence;
    }
}
export class Procedure {
    code: OntologyClass;
    bodySites: OntologyClass[];
    performedOn: TimeElement[];

    constructor() {
        this.code = { id: '', label: '' };
    }

    toString() {
        return "Procedure";
    }

    static convert(obj: any): Procedure {
        const procedure = new Procedure();
        procedure.code = OntologyClass.convert(obj['code']);
        procedure.bodySites = OntologyClass.convert(obj['bodySites']);
        procedure.performedOn = TimeElement.convert(obj['performedOn']);
        return procedure;
    }
 }
export class Age {
    iso8601duration: string;

    constructor(val?: string) {
        this.iso8601duration = val;
    }

    public static convert(obj: any): Age {
        const age = new Age();
        age.iso8601duration = obj['iso8601duration'];
        return age;
    }
}

export class AgeRange {
    start = new Age("1");
    end = new Age("2");
    constructor(start?: Age, end?: Age) {
        this.start = start;
        this.end = end;
    }

    public static convert(obj: any): AgeRange {
        const ageRange = new AgeRange();
        ageRange.start = Age.convert(obj['start']);
        ageRange.end = Age.convert(obj['end']);
        return ageRange;
    }
}

export class TimeInterval {
    start: string;
    end: string;
    constructor(start?: string, end?: string) {
        this.start = start;
        this.end = end;
    }

    public static convert(obj: any): TimeInterval {
        const interval = new TimeInterval();
        interval.start = obj['start'];
        interval.end = obj['end'];
        return interval;
    }
}

export class GestationalAge {
    weeks: number;
    days: number;
    constructor(weeks?: number, days?: number) {
        this.weeks = weeks;
        this.days = days;
    }

    public static convert(obj: any): GestationalAge {
        const gestationalAge = new GestationalAge();
        gestationalAge.weeks = obj['weeks'];
        gestationalAge.days = obj['days'];
        return gestationalAge;
    }

    toString() {
        return `${this.weeks} weeks, ${this.days} days`;
    }
}
export class TimeElement extends Convert {
    gestationalAge: GestationalAge;
    age: Age;
    ageRange: AgeRange;
    ontologyClass: OntologyClass;
    timestamp: string;
    interval: TimeInterval;
    constructor(gestationalAge?: GestationalAge, age?: Age, ageRange?: AgeRange, ontologyClass?: OntologyClass,
        timestamp?: string, interval?: TimeInterval) {
        super();
        this.gestationalAge = gestationalAge;
        this.age = age;
        this.ageRange = ageRange;
        this.ontologyClass = ontologyClass;
        this.timestamp = timestamp;
        this.interval = interval;
    }

    static create(obj: any): TimeElement {
        const timeElement = new TimeElement();
        timeElement.age = Age.convert(obj['age']);
        timeElement.ageRange = AgeRange.convert(obj['ageRange']);
        timeElement.gestationalAge = GestationalAge.convert(obj['gestationalAge']);
        timeElement.ontologyClass = OntologyClass.convert(obj['ontologyClass']);
        timeElement.timestamp = obj['timestamp'];
        timeElement.interval = TimeInterval.convert(obj['interval']);
        return timeElement;
    }
}
export class File extends Convert {
    id: string; // not part of the phenopacket model (used only to distinguish between files)
    uri: string;
    individualToFileIdentifier = new Map<string, string>();
    fileAttribute = new Map<string, string>();

    constructor(uri?: string, description?: string) {
        super();
        this.uri = uri;
        this.fileAttribute.set('description', description);

    }
    static create(obj: any): File {
        const file = new File();
        file.uri = obj['uri'];
        file.individualToFileIdentifier = obj['individualToFileIdentifier'];
        file.fileAttribute = obj['fileAttribute'];
        return file;
    }
}

