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
        if ('id' in obj) {
            phenopacket.id = obj['id'];
        } else {
            throw new Error(`Phenopacket file is missing 'id' field.`);
        }
        if ('subject' in obj) {
            phenopacket.subject = Individual.convert(obj['subject']);
        }
        if ('measurements' in obj) {
            phenopacket.measurements = Measurement.convert(obj['measurements']);
        }
        if ('diseases' in obj) {
            phenopacket.diseases = Disease.convert(obj['diseases']);
        }
        if ('biosamples' in obj) {
            phenopacket.biosamples = BioSample.convert(obj['biosamples']);
        }
        if ('medicalActions' in obj) {
            phenopacket.medicalActions = MedicalAction.convert(obj['medicalActions']);
        }
        if ('interpretations' in obj) {
            phenopacket.interpretations = Interpretation.convert(obj['interpretations']);
        }
        if ('files' in obj) {
            phenopacket.files = File.convert(obj['files']);
        }
        if ('phenotypicFeatures' in obj) {
            phenopacket.phenotypicFeatures = PhenotypicFeature.convert(obj['phenotypicFeatures']);
        }
        if ('metaData' in obj) {
            phenopacket.metaData = MetaData.convert(obj['metaData']);
        } else {
            throw new Error(`Phenopacket file is missing 'metaData' field.`);
        }
        return phenopacket;
    }

}
