import { OntologyClass } from "./base";

export class Interpretation {
    id: string;
    progressStatus: ProgressStatus;
    diagnosis: Diagnosis;
    summary: string;
}

export enum ProgressStatus {
    UNKNOWN_PROGRESS,
    IN_PROGRESS,
    COMPLETED,
    SOLVED,
    UNSOLVED
}

export class Diagnosis {
    disease: OntologyClass;
    genomicInterpretations: GenomicInterpretation;
}

export enum InterpretationStatus {
    UNKNOWN_STATUS,
    REJECTED,
    CANDIDATE,
    CONTRIBUTORY,
    CAUSATIVE
}
export class GenomicInterpretation {
    subjectOfBiosampleId: string;
    interpretationStatus: InterpretationStatus;
}
export enum AcmgPathogenicityClassification {
    NOT_PROVIDED,
    BENIGN,
    LIKELY_BENIGN,
    UNCERTAIN_SIGNIFICANCE,
    LIKELY_PATHOGENIC,
    PATHOGENIC
}

export enum TherapeuticActionability {
    UNKNOWN_ACTIONABILITY,
    NOT_ACTIONABLE,
    ACTIONABLE
}
export class VariantInterpretation {
    acmgPathogenicityClassification: AcmgPathogenicityClassification;
    therapeuticActionability: TherapeuticActionability;
    variationDescriptor: string;
}