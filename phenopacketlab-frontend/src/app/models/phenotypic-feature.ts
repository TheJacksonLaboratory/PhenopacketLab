import { Convert, Evidence, OntologyClass, TimeElement } from './base';
import { OntologyTreeNode } from './ontology-treenode';

export class PhenotypicFeature extends Convert {
    // key parameter not part of the phenopacket schema, used for primeng table
    key?: number;
    // parameter no part of phenopacket and that represents the modifiers as TreeNodes
    modifierNodes?: OntologyTreeNode[];
    // parameter no part of phenopacket and that represents the evidences as TreeNodes
    evidenceNodes?: OntologyTreeNode[];
    // parameter no part of phenopacket and used for text-mining state
    textMiningState: MiningState;

    description: string;
    type: OntologyClass;
    excluded = false;
    severity: OntologyClass;
    modifiers: OntologyClass[];
    onset: TimeElement;
    resolution: TimeElement;
    evidence: Evidence[];
    children: PhenotypicFeature[];
    parent: PhenotypicFeature;

    constructor(id?: string, label?: string, excluded?: boolean, state?: MiningState, key?: number) {
        super();
        this.type = new OntologyClass(id, label);
        this.excluded = excluded;
        this.textMiningState = state;
        this.key = key;
    }

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
            phenotypicFeature.severity.termUrl = `https://hpo.jax.org/app/browse/term/${phenotypicFeature.severity.id}`;
        }
        if (obj['modifiers']) {
            phenotypicFeature.modifiers = OntologyClass.convert(obj['modifiers']);
            phenotypicFeature.modifierNodes = [];
            for (const modifier of phenotypicFeature.modifiers) {
                modifier.termUrl = `https://hpo.jax.org/app/browse/term/${modifier.id}`;
                const node = new OntologyTreeNode();
                node.label = modifier.label;
                node.key = modifier.id;
                phenotypicFeature.modifierNodes.push(node);
            }
        }
        if (obj['onset']) {
            phenotypicFeature.onset = TimeElement.convert(obj['onset']);
        }
        if (obj['resolution']) {
            phenotypicFeature.resolution = TimeElement.convert(obj['resolution']);
        }
        if (obj['evidence']) {
            phenotypicFeature.evidence = Evidence.convert(obj['evidence']);
            phenotypicFeature.evidenceNodes = [];
            for (const evidence of phenotypicFeature.evidence) {
                const node = new OntologyTreeNode();
                node.label = evidence.evidenceCode.label;
                node.key = evidence.evidenceCode.id;
                phenotypicFeature.evidenceNodes.push(node);
            }
        }

        return phenotypicFeature;
    }
}

export enum MiningState {
    UNKNOWN,
    APPROVED,
    REJECTED
}
