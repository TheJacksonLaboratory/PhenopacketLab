import { BioSample } from "./biosample";
import { Disease } from "./disease";
import { Individual } from "./individual";
import { Interpretation } from "./interpretation";
import { Measurement } from "./measurement";
import { MedicalAction } from "./medical-action";
import { MetaData } from "./metadata";
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

    // for Family Phenopacket
    isProband = false;

}