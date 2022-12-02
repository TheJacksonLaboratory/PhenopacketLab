/**
 * Class to convert to list or list of phenopacket model objects.
 * the Phenopacket model objects that can have more than one instance should
 * extend this class.
 */
export class Convert {

    public static convert(obj: any): any {
        if (Array.isArray(obj)) {
            const array = [];
            for (const item of obj) {
                const it = this.create(item);
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
        return new Error('this function needs to be overriden');
    }
}

export class OntologyClass extends Convert {

    constructor(id?: string, label?: string) {
        super();
        this.id = id;
        this.label = label;
    }
    id = '';
    label = '';

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

    toString() {
        if (this.label && this.id) {
            return `${this.label} [${this.id}]`;
        }
        return '';

    }
    toLowerCase() {
        return this.toString().toLowerCase();
    }

}
export class ExternalReference extends Convert {
    id: string;
    reference: string;
    description: string;

    static create(obj: any): ExternalReference {
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

    toString() {
        if (this.id && this.reference) {
            return `${this.reference} [${this.id}]`;
        } else if (this.id && this.reference === undefined) {
            return this.id;
        } else if (this.id === undefined && this.reference) {
            return this.reference;
        }
        return '';
    }
}
export class Evidence extends Convert {

    constructor(evidenceCode?: OntologyClass, reference?: ExternalReference) {
        super();
        this.evidenceCode = evidenceCode;
        this.reference = reference;
    }

    static VALUES = [
        new OntologyClass('ECO:0006016', 'author statement from published clinical study'),
        new OntologyClass('ECO:0007539', 'author statement from published clinical study used in automatic assertion'),
        new OntologyClass('ECO:0006017', 'author statement from published clinical study used in manual assertion'),
        new OntologyClass('ECO:0000033', 'author statement supported by traceable reference'),
        new OntologyClass('ECO:0006154', 'self-reported patient statement evidence')
    ];
    evidenceCode: OntologyClass;
    reference: ExternalReference;

    public static create(obj: any): Evidence {
        const evidence = new Evidence();
        if (obj['evidenceCode']) {
            evidence.evidenceCode = OntologyClass.convert(obj['evidenceCode']);
        } else {
            throw new Error(`Phenopacket file is missing 'evidenceCode' field in 'evidence' object.`);
        }
        if (obj['reference']) {
            evidence.reference = ExternalReference.convert(obj['reference']);
        }
        return evidence;
    }
}
export class Procedure {

    constructor() {
        this.code = new OntologyClass('', '');
    }
    static actionName = 'Procedure';
    code: OntologyClass;
    bodySite: OntologyClass;
    performed: TimeElement;

    static convert(obj: any): Procedure {
        const procedure = new Procedure();
        if (obj['code']) {
            procedure.code = OntologyClass.convert(obj['code']);
        } else {
            throw new Error(`Phenopacket file is missing 'code' field in 'procedure' object.`);
        }
        if (obj['bodySite']) {
            procedure.bodySite = OntologyClass.convert(obj['bodySite']);
        }
        if (obj['performed']) {
            procedure.performed = TimeElement.convert(obj['performed']);
        }

        return procedure;
    }

    toString() {
        if (this.code) {
            return this.code.toString();
        }
        return '';
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

    public getYears() {
        if (this.iso8601duration) {
            const prefix = this.iso8601duration.split('Y');
            if (prefix) {
                // tslint:disable-next-line:radix
                return parseInt(prefix[0]?.substring(1));
            }
        }
    }
    public getMonths() {
        if (this.iso8601duration) {
            let prefix = this.iso8601duration.split('M');
            if (prefix.length > 0) {
                prefix = prefix[0].split('Y');
                if (prefix.length > 0) {
                    // tslint:disable-next-line:radix
                    return parseInt(prefix[1]);
                }
            } else {
                return null;
            }
        }
    }
    public getDays() {
        if (this.iso8601duration) {
            const prefix = this.iso8601duration.split('M');
            if (prefix.length > 0) {
                // tslint:disable-next-line:radix
                return parseInt(prefix[1]?.substring(0, prefix[1]?.length - 1));
            }  else {
                return null;
            }
        }
    }
}

export class AgeRange {
    start: Age;
    end: Age;
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
        } else {
            throw new Error(`Phenopacket file is missing 'start' field in 'timeInterval' object.`);
        }
        if (obj['end']) {
            interval.end = obj['end'];
        } else {
            throw new Error(`Phenopacket file is missing 'end' field in 'timeInterval' object.`);
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
        } else {
            throw new Error(`Phenopacket file is missing 'weeks' field in 'gestationalAge' object.`);
        }
        if (obj['days']) {
            gestationalAge.days = obj['days'];
        }
        return gestationalAge;
    }
}
export class TimeElement extends Convert {

    /**
     *
     * @param element can be instance of GestationalAge, Age, AgeRange, string or TimeInterval
     */
    constructor(element?: any) {
        super();
        this.element = element;
    }
    element: any;

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

}
export enum TimeElementType {
    AGE = 'Age',
    AGE_RANGE = 'Age range',
    GESTATIONAL_AGE = 'Gestational age',
    ONTOLOGY_CLASS = 'Ontology class'
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
        } else {
            throw new Error(`Phenopacket file is missing 'uri' field in 'file' object.`);
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

