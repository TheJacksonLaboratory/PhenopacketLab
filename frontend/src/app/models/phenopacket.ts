import { BioSample } from "./biosample";
import { Disease } from "./disease";
import { Individual } from "./individual";
import { Interpretation } from "./interpretation";
import { Measurement } from "./measurement";
import { MedicalAction } from "./medical-action";
import { MetaData } from "./metadata";
import { File } from "./base"
import { PhenotypicFeature } from "./phenotypic-feature";

export class Phenopacket {
    id: string;
    subject: Individual;
    phenotypicFeatures: PhenotypicFeature[];
    measurements: Measurement[];
    biosamples: BioSample[];
    interpretations: Interpretation[];
    diseases: Disease[];
    medicalActions: MedicalAction[];
    metadata: MetaData;
    files: File[];

    // for Family Phenopacket
    isProband = false;

    /**
     * 
     * @param obj 
     * @returns 
     */
    public static convert(obj: any): Phenopacket {
        const phenopacket = new Phenopacket();
        console.log("original obj");
        console.log(obj);
        if (obj['id']) {
            phenopacket.id = obj['id'];
            console.log('converted id');
        }
        if (obj['subject']) {
            phenopacket.subject = Individual.convert(obj['subject']);
            console.log('converted subject');
        }
        if (obj['measurements']) {
            phenopacket.measurements = Measurement.convert(obj['measurements']);
            console.log('converted measurements');
        }
        if (obj['diseases']) {
            phenopacket.diseases = Disease.convert(obj['diseases']);
            console.log('converted diseases');
        }
        if (obj['bioSamples']) {
            phenopacket.biosamples = BioSample.convert(obj['bioSamples']);
            console.log('converted biosamples');
        }
        if (obj['medicalActions']) {
            phenopacket.medicalActions = MedicalAction.convert(obj['medicalActions']);
            console.log('converted medicalActions');
        }
        if (obj['interpretations']) {
            phenopacket.interpretations = Interpretation.convert(obj['interpretations']);
            console.log('converted interpretations');
        }
        if (obj['files']) {
            phenopacket.files = File.convert(obj['files']);
            console.log('converted files');
        }
        if (obj['phenotypicFeatures']) {
            phenopacket.phenotypicFeatures = PhenotypicFeature.convert(obj['phenotypicFeatures']);
            console.log('converted phenotypicFeatures');
        }
        if (obj['metaData']) {
            phenopacket.metadata = MetaData.convert(obj['metaData']);
            console.log('converted metadata');
        }
        return phenopacket;
    }

}