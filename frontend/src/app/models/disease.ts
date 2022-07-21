import { Convert, OntologyClass, TimeElement } from "./base";

export class Disease extends Convert {
    term: OntologyClass;
    excluded: boolean;
    onset: TimeElement;
    resolution: TimeElement;
    diseaseStage: OntologyClass[];
    clinicalTnmFinding: OntologyClass[];
    primarySite: OntologyClass;
    laterality: OntologyClass;
    // not from the phenopacket schema
    description: string;
    isA: string;

    constructor(id?: string, label?: string) {
        super();
        this.term = {id: id, label: label};
        this.onset = new TimeElement();
        this.resolution = new TimeElement();
        this.diseaseStage = [];
        this.clinicalTnmFinding = [];
    }

    static create(obj: any): Disease {
        const disease = new Disease();
        disease.term = OntologyClass.convert(obj['term']);
        disease.excluded = obj['excluded'];
        disease.onset = TimeElement.convert(obj['onset']);
        disease.resolution = TimeElement.convert(obj['resolution']);
        disease.diseaseStage = OntologyClass.convert(obj['diseaseStage']);
        disease.clinicalTnmFinding = OntologyClass.convert(obj['clinicalTnmFinding']);
        disease.primarySite = OntologyClass.convert(obj['primarySite']);
        disease.laterality = OntologyClass.convert(obj['laterality']);
        disease.description = obj['description'];
        return disease;
    }
}