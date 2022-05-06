import { OntologyClass, TimeElement } from "./base";

export class Disease {
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
        this.term = new OntologyClass(id?? '', label?? '');
    }
}