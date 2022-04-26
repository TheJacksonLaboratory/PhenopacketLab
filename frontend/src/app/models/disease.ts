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

}