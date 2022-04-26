import { OntologyClass } from "./base";
import { Measurement } from "./measurement";
import { PhenotypicFeature } from "./phenotypic-feature";

export class BioSample {
    id: string;
    individualId: string;
    derivedFromId: string;
    description: string;

    sampledTissue: OntologyClass;
    sampleType: OntologyClass;
    phenotypicFeatures: PhenotypicFeature;
    measurements: Measurement;
}