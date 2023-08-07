import { BioSample } from './biosample';
import { Disease } from './disease';
import { Individual } from './individual';
import { Interpretation } from './interpretation';
import { Measurement } from './measurement';
import { MedicalAction } from './medical-action';
import { MetaData } from './metadata';
import { File } from './base';
import { PhenotypicFeature } from './phenotypic-feature';

export class Phenopacket {
    dbId?: string;
    id;
    subject: Individual = new Individual();
    phenotypicFeatures: PhenotypicFeature[];
    measurements: Measurement[];
    biosamples: BioSample[];
    interpretations: Interpretation[];
    diseases: Disease[];
    medicalActions: MedicalAction[];
    metaData: MetaData;
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
        if (obj['id']) {
            phenopacket.id = obj['id'];
        } else {
            throw new Error(`Phenopacket file is missing 'id' field.`);
        }
        if (obj['subject']) {
            phenopacket.subject = Individual.convert(obj['subject']);
        }
        if (obj['measurements']) {
            phenopacket.measurements = Measurement.convert(obj['measurements']);
        }
        if (obj['diseases']) {
            phenopacket.diseases = Disease.convert(obj['diseases']);
        }
        if (obj['biosamples']) {
            phenopacket.biosamples = BioSample.convert(obj['biosamples']);
        }
        if (obj['medicalActions']) {
            phenopacket.medicalActions = MedicalAction.convert(obj['medicalActions']);
        }
        if (obj['interpretations']) {
            phenopacket.interpretations = Interpretation.convert(obj['interpretations']);
        }
        if (obj['files']) {
            phenopacket.files = File.convert(obj['files']);
        }
        if (obj['phenotypicFeatures']) {
            phenopacket.phenotypicFeatures = PhenotypicFeature.convert(obj['phenotypicFeatures']);
        }
        if (obj['metaData']) {
            phenopacket.metaData = MetaData.convert(obj['metaData']);
        } else {
            throw new Error(`Phenopacket file is missing 'metaData' field.`);
        }
        return phenopacket;
    }

}
