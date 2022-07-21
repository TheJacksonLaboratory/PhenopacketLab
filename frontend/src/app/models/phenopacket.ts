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
        phenopacket.id = obj['id'];
        phenopacket.subject = Individual.convert(obj['subject']);
        phenopacket.measurements = Measurement.convert(obj['measurements']);
        phenopacket.diseases = Disease.convert(obj['diseases']);
        phenopacket.biosamples = BioSample.convert(obj['bioSamples']);
        phenopacket.medicalActions = MedicalAction.convert(obj['medicalActions']);
        phenopacket.interpretations = Interpretation.convert(obj['interpretations']);
        phenopacket.files = File.convert(obj['files']);
        phenopacket.phenotypicFeatures = PhenotypicFeature.convert(obj['phenotypicFeatures']);
        phenopacket.metadata = MetaData.convert(obj['metaData']);
        return phenopacket;
    }

}