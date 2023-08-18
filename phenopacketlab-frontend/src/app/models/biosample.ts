import { OntologyClass, TimeElement, File, Convert } from './base';
import { Measurement } from './measurement';
import { PhenotypicFeature } from './phenotypic-feature';

export class BioSample extends Convert {
    // not part of phenopacket schema
    key?: number;

    id: string;
    individualId: string;
    derivedFromId: string;
    description: string;
    sampledTissue: OntologyClass;
    sampleType: OntologyClass;
    phenotypicFeatures: PhenotypicFeature[];
    measurements: Measurement[];
    taxonomy: OntologyClass;
    timeOfCollection: TimeElement;
    histologicalDiagnosis: OntologyClass;
    tumorProgression: OntologyClass;
    tumorGrade: OntologyClass;
    pathologicalStage: OntologyClass;
    pathologicalTnmFinding: OntologyClass[];
    diagnosticMarkers: OntologyClass[];
    files: File[];
    materialSample: OntologyClass;
    sampleProcessing: OntologyClass;
    sampleStorage: OntologyClass;

    static create(obj: any): BioSample {
        const bioSample = new BioSample();
        if ('id' in obj) {
            bioSample.id = obj['id'];
            bioSample.key = obj['id'];
        } else {
            throw new Error(`Phenopacket file is missing 'id' field in 'bioSample' object.`);
        }
        if ('derivedFromId' in obj) {
            bioSample.derivedFromId = obj['derivedFromId'];
        }
        if ('description' in obj) {
            bioSample.description = obj['description'];
        }
        if ('sampledTissue' in obj) {
            bioSample.sampledTissue = OntologyClass.convert(obj['sampledTissue']);
        }
        if ('sampleType' in obj) {
            bioSample.sampleType = OntologyClass.convert(obj['sampleType']);
        }
        if ('phenotypicFeatures' in obj) {
            bioSample.phenotypicFeatures = PhenotypicFeature.convert(obj['phenotypicFeatures']);
        }
        if ('measurements' in obj) {
            bioSample.measurements = Measurement.convert(obj['measurements']);
        }
        if ('taxonomy' in obj) {
            bioSample.taxonomy = OntologyClass.convert(obj['taxonomy']);
        }
        if ('timeOfCollection' in obj) {
            bioSample.timeOfCollection = TimeElement.convert(obj['timeOfCollection']);
        }
        if ('histologicalDiagnosis' in obj) {
            bioSample.histologicalDiagnosis = OntologyClass.convert(obj['histologicalDiagnosis']);
        }
        if ('tumorProgression' in obj) {
            bioSample.tumorProgression = OntologyClass.convert(obj['tumorProgression']);
        }
        if ('tumorGrade' in obj) {
            bioSample.tumorGrade = OntologyClass.convert(obj['tumorGrade']);
        }
        if ('pathologicalStage' in obj) {
            bioSample.pathologicalStage = OntologyClass.convert(obj['pathologicalStage']);
        }
        if ('diagnosticMarkers' in obj) {
            bioSample.diagnosticMarkers = OntologyClass.convert(obj['diagnosticMarkers']);
        }
        if ('files' in obj) {
            bioSample.files = File.convert(obj['files']);
        }
        if ('materialSample' in obj) {
            bioSample.materialSample = OntologyClass.convert(obj['materialSample']);
        }
        if ('sampleProcessing' in obj) {
            bioSample.sampleProcessing = OntologyClass.convert(obj['sampleProcessing']);
        }
        if ('sampleStorage' in obj) {
            bioSample.sampleStorage = OntologyClass.convert(obj['sampleStorage']);
        }

        return bioSample;
    }
}
