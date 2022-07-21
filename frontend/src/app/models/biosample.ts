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
        bioSample.id = obj['id'];
        bioSample.derivedFromId = obj['derivedFromId'];
        bioSample.description = obj['description'];
        bioSample.sampledTissue = OntologyClass.convert(obj['sampledTissue']);
        bioSample.sampleType = OntologyClass.convert(obj['sampleType']);
        bioSample.phenotypicFeatures = PhenotypicFeature.convert(obj['phenotypicFeatures']);
        bioSample.measurements = Measurement.convert(obj['measurements']);
        bioSample.taxonomy = OntologyClass.convert(obj['taxonomy']);
        bioSample.timeOfCollection = TimeElement.convert(obj['timeOfCollection']);
        bioSample.histologicalDiagnosis = OntologyClass.convert(obj['histologicalDiagnosis']);
        bioSample.tumorProgression = OntologyClass.convert(obj['tumorProgression']);
        bioSample.tumorGrade = OntologyClass.convert(obj['tumorGrade']);
        bioSample.pathologicalStage = OntologyClass.convert(obj['pathologicalStage']);
        bioSample.diagnosticMarkers = OntologyClass.convert(obj['diagnosticMarkers']);
        bioSample.files = File.convert(obj['files']);
        bioSample.materialSample = OntologyClass.convert(obj['materialSample']);
        bioSample.sampleProcessing = OntologyClass.convert(obj['sampleProcessing']);
        bioSample.sampleStorage = OntologyClass.convert(obj['sampleStorage']);
        return bioSample;
    }
}