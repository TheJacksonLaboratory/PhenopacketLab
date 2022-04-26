import { Evidence, OntologyClass, TimeElement } from "./base";

export class PhenotypicFeature {

    description: string;
    type: OntologyClass;
    excluded: boolean;
    severity: OntologyClass;
    modifiers: OntologyClass;
    onset: TimeElement;
    resolution: TimeElement;
    evidence: Evidence;
    children: PhenotypicFeature[];
    parent: PhenotypicFeature;
}