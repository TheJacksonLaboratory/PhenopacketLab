import { Convert, Evidence, OntologyClass, TimeElement } from './base';
import { OntologyTreeNode } from './ontology-treenode';

export class PhenotypicFeature extends Convert {
    // key parameter not part of the phenopacket schema, used for primeng table
    key?: number;
    // parameter no part of phenopacket and that represents the modifiers as TreeNodes
    modifierNodes?: OntologyTreeNode[];
    // parameter no part of phenopacket and that represents the evidences as TreeNodes
    evidenceNodes?: OntologyTreeNode[];

    description: string;
    type: OntologyClass;
    excluded = false;
    severity: OntologyClass;
    modifiers: OntologyClass[];
    onset: TimeElement;
    resolution: TimeElement;
    evidences: Evidence[];
    children: PhenotypicFeature[];
    parent: PhenotypicFeature;

    static create(obj: any): PhenotypicFeature {
        const phenotypicFeature = new PhenotypicFeature();
        if (obj['description']) {
            phenotypicFeature.description = obj['description'];
        }
        if (obj['type']) {
            phenotypicFeature.type = OntologyClass.convert(obj['type']);
        } else {
            throw new Error(`Phenopacket file is missing 'type' field in 'phenotypicFeatures' object.`);
        }
        if (obj['excluded']) {
            phenotypicFeature.excluded = obj['excluded'];
        }
        if (obj['severity']) {
            phenotypicFeature.severity = OntologyClass.convert(obj['severity']);
        }
        if (obj['modifiers']) {
            phenotypicFeature.modifiers = OntologyClass.convert(obj['modifiers']);
        }
        if (obj['onset']) {
            phenotypicFeature.onset = TimeElement.convert(obj['onset']);
        }
        if (obj['resolution']) {
            phenotypicFeature.resolution = TimeElement.convert(obj['resolution']);
        }
        if (obj['evidence']) {
            phenotypicFeature.evidences = Evidence.convert(obj['evidence']);
        }

        return phenotypicFeature;
    }
}
