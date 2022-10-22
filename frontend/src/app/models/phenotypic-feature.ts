import { Convert, Evidence, OntologyClass, TimeElement } from './base';

export class PhenotypicFeature extends Convert {

    description: string;
    type: OntologyClass = new OntologyClass('', '');
    excluded = false;
    severity: OntologyClass = new OntologyClass('', '');
    modifiers: OntologyClass[];
    onset: TimeElement;
    resolution: TimeElement;
    evidence: Evidence[];
    children: PhenotypicFeature[];
    parent: PhenotypicFeature;

    static create(obj: any): PhenotypicFeature {
        const phenotypicFeature = new PhenotypicFeature();
        if (obj['description']) {
            phenotypicFeature.description = obj['description'];
            console.log('pheno description');
        }
        if (obj['type']) {
            phenotypicFeature.type = OntologyClass.convert(obj['type']);
            console.log('pheno type');
        } else {
            throw new Error(`Phenopacket file is missing 'type' field in 'phenotypicFeatures' object.`);
        }
        if (obj['excluded']) {
            phenotypicFeature.excluded = obj['excluded'];
            console.log('pheno excluded');
        }
        if (obj['severity']) {
            phenotypicFeature.severity = OntologyClass.convert(obj['severity']);
            console.log('pheno severity');
        }
        if (obj['modifiers']) {
            phenotypicFeature.modifiers = OntologyClass.convert(obj['modifiers']);
            console.log('pheno modifiers');
        }
        if (obj['onset']) {
            phenotypicFeature.onset = TimeElement.convert(obj['onset']);
            console.log('pheno onset');
        }
        if (obj['resolution']) {
            phenotypicFeature.resolution = TimeElement.convert(obj['resolution']);
            console.log('pheno resolution');
        }
        if (obj['evidence']) {
            phenotypicFeature.evidence = Evidence.convert(obj['evidence']);
            console.log('pheno evidence');
        }

        return phenotypicFeature;
    }
}
