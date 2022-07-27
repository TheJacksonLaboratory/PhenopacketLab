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
        this.onset = new TimeElement('');
        this.resolution = new TimeElement('');
        this.diseaseStage = [];
        this.clinicalTnmFinding = [];
    }

    static create(obj: any): Disease {
        const disease = new Disease();
        if (obj['term']) {
            disease.term = OntologyClass.convert(obj['term']);
        }
        if (obj['excluded']) {
            disease.excluded = obj['excluded'];
        }
        if (obj['onset']) {
            disease.onset = TimeElement.convert(obj['onset']);
        }
        if (obj['resolution']) {
            disease.resolution = TimeElement.convert(obj['resolution']);
        }
        if (obj['diseaseStage']) {
            disease.diseaseStage = OntologyClass.convert(obj['diseaseStage']);
        }
        if (obj['clinicalTnmFinding']) {
            disease.clinicalTnmFinding = OntologyClass.convert(obj['clinicalTnmFinding']);
        }
        if (obj['primarySite']) {
            disease.primarySite = OntologyClass.convert(obj['primarySite']);
        }
        if (obj['laterality']) {
            disease.laterality = OntologyClass.convert(obj['laterality']);
        }
        if (obj['description']) {
            disease.description = obj['description'];
        }
        
        return disease;
    }
}