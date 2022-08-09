import { OntologyClass, TimeElement, File, Convert } from "./base";
import { Measurement } from "./measurement";
import { PhenotypicFeature } from "./phenotypic-feature";

export class BioSample extends Convert {
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
        if (obj['id']) {
            bioSample.id = obj['id'];
        } else {
            throw new Error(`Phenopacket file is missing 'id' field in 'bioSample' object.`)
        }
        if (obj['derivedFromId']) {
            bioSample.derivedFromId = obj['derivedFromId'];
        }
        if (obj['description']) {
            bioSample.description = obj['description'];
        }
        if (obj['sampledTissue']) {
            bioSample.sampledTissue = OntologyClass.convert(obj['sampledTissue']);
        }
        if (obj['sampleType']) {
            bioSample.sampleType = OntologyClass.convert(obj['sampleType']);
        }
        if (obj['phenotypicFeatures']) {
            bioSample.phenotypicFeatures = PhenotypicFeature.convert(obj['phenotypicFeatures']);
        }
        if (obj['measurements']) {
            bioSample.measurements = Measurement.convert(obj['measurements']);
        }
        if (obj['taxonomy']) {
            bioSample.taxonomy = OntologyClass.convert(obj['taxonomy']);
        }
        if (obj['timeOfCollection']) {
            bioSample.timeOfCollection = TimeElement.convert(obj['timeOfCollection']);
        }
        if (obj['histologicalDiagnosis']) {
            bioSample.histologicalDiagnosis = OntologyClass.convert(obj['histologicalDiagnosis']);
        }
        if (obj['tumorProgression']) {
            bioSample.tumorProgression = OntologyClass.convert(obj['tumorProgression']);
        }
        if (obj['tumorGrade']) {
            bioSample.tumorGrade = OntologyClass.convert(obj['tumorGrade']);
        }
        if (obj['pathologicalStage']) {
            bioSample.pathologicalStage = OntologyClass.convert(obj['pathologicalStage']);
        }
        if (obj['diagnosticMarkers']) {
            bioSample.diagnosticMarkers = OntologyClass.convert(obj['diagnosticMarkers']);
        }
        if (obj['files']) {
            bioSample.files = File.convert(obj['files']);
        }
        if (obj['materialSample']) {
            bioSample.materialSample = OntologyClass.convert(obj['materialSample']);
        }
        if (obj['sampleProcessing']) {
            bioSample.sampleProcessing = OntologyClass.convert(obj['sampleProcessing']);
        }
        if (obj['sampleStorage']) {
            bioSample.sampleStorage = OntologyClass.convert(obj['sampleStorage']);
        }
        
        return bioSample;
    }
}