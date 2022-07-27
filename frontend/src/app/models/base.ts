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

    toString() {
        if (this.label && this.id) {
            return `${this.label} [${this.id}]`;
        }
        return '';
        
    }

    static create(obj: any): OntologyClass {
        const ontologyClass = new OntologyClass();
        if (obj['id']) {
            ontologyClass.id = obj['id'];
        }
        if (obj['label']) {
            ontologyClass.label = obj['label'];
        }
        return ontologyClass;
    }

}
export class ExternalReference {
    id: string;
    reference: string;
    description: string;

    static convert(obj: any): ExternalReference {
        const externalReference = new ExternalReference();
        if (obj['id']) {
            externalReference.id = obj['id'];
        }
        if (obj['reference']) {
            externalReference.reference = obj['reference'];
        }
        if (obj['description']) {
            externalReference.description = obj['description'];
        }
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
        if (obj['evidenceCode']) {
            evidence.evidenceCode = OntologyClass.convert(obj['evidenceCode']);
        }
        if (obj['reference']) {
            evidence.reference = ExternalReference.convert(obj['reference']);
        }
        return evidence;
    }
}
export class Procedure {
    static actionName = 'Procedure';
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
        if (obj['code']) {
            procedure.code = OntologyClass.convert(obj['code']);
        }
        if (obj['bodySites']) {
            procedure.bodySites = OntologyClass.convert(obj['bodySites']);
        }
        if (obj['performedOn']) {
            procedure.performedOn = TimeElement.convert(obj['performedOn']);
        }

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
        if (obj['iso8601duration']) {
            age.iso8601duration = obj['iso8601duration'];
        }
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
        if (obj['start']) {
            ageRange.start = Age.convert(obj['start']);
        }
        if (obj['end']) {
            ageRange.end = Age.convert(obj['end']);
        }
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
        if (obj['start']) {
            interval.start = obj['start'];
        }
        if (obj['end']) {
            interval.end = obj['end'];
        }
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
        if (obj['weeks']) {
            gestationalAge.weeks = obj['weeks'];
        }
        if (obj['days']) {
            gestationalAge.days = obj['days'];
        }
        return gestationalAge;
    }
}
export class TimeElement extends Convert {
    element: any;

    /**
     * 
     * @param element can be instance of GestationalAge, Age, AgeRange, string or TimeInterval
     */
    constructor(element?: any) {
        super();
        this.element = element;
    }

    toString() {
        if (this.element instanceof GestationalAge) {
            return `${this.element.days} days, ${this.element.weeks} weeks`;
        } else if (this.element instanceof Age) {
            return this.element.iso8601duration;
        } else if (this.element instanceof OntologyClass) {
            return this.element.toString();
        } else if (this.element instanceof AgeRange) {
            return `${this.element.start} - ${this.element.start}`;
        } else if (typeof this.element === 'string') {
            return this.element;
        } else if (this.element instanceof TimeInterval) {
            return `${this.element.start} - ${this.element.end}`;
        }
    }

    static create(obj: any): TimeElement {
        const timeElement = new TimeElement();
        if (obj['age']) {
            timeElement.element = Age.convert(obj['age']);
        } else if (obj['ageRange']) {
            timeElement.element = AgeRange.convert(obj['ageRange']);
        } else if (obj['gestationalAge']) {
            timeElement.element = GestationalAge.convert(obj['gestationalAge']);
        } else if (obj['ontologyClass']) {
            timeElement.element = OntologyClass.convert(obj['ontologyClass']);
        } else if (obj['timestamp']) {
            timeElement.element = obj['timestamp'];
        } else if (obj['interval']) {
            timeElement.element = TimeInterval.convert(obj['interval']);
        }
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
        if (obj['uri']) {
            file.uri = obj['uri'];
        }
        if (obj['individualToFileIdentifier']) {
            file.individualToFileIdentifier = obj['individualToFileIdentifier'];
        }
        if (obj['fileAttribute']) {
            file.fileAttribute = obj['fileAttribute'];
        }
        
        return file;
    }
}

