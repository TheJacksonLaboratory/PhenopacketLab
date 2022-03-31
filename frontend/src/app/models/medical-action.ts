import { ExternalReference, OntologyClass, Procedure, TimeElement, TimeInterval } from "./base";
import { Quantity } from "./measurement";

export class Action {
    procedure: Procedure;
    treatment: Treatment;
    radiationTherapy: RadiationTherapy;
    therapeuticRegimen: TherapeuticRegimen;
}

export class MedicalAction extends Action {
    treatmentTarget: OntologyClass;
    treatmentIntent: OntologyClass;
    responseToTreatment: OntologyClass;
    adverseEvents: OntologyClass;
    treatmentTerminationReason: OntologyClass;
}

export class Treatment {
    agent: OntologyClass;
    routeOfAdministration: OntologyClass;
    doseIntervals: DoseInterval;
    drugType: DrugType;
}
export class DoseInterval {
    quantity: Quantity;
    scheduleFrequency: OntologyClass;
    interval: TimeInterval;
}
export enum DrugType {
    UNKNOWN_DRUG_TYPE,
    PRESCRIPTION,
    EHR_MEDICATION_LIST,
    ADMINISTRATION_RELATED_TO_PROCEDURE
}
export class RadiationTherapy {
    modality: OntologyClass;
    bodySite: OntologyClass;
    dosage: number;
    fractions: number;
}
export class Identifier {
    externalReference: ExternalReference;
    ontologyClass: OntologyClass;
}
export enum RegimenStatus {
    UNKNOWN_STATUS,
    STARTED,
    COMPLETED,
    DISCONTINUED
}
export class TherapeuticRegimen extends Identifier {
    startTime: TimeElement;
    endTime: TimeElement;
    regimenStatus: RegimenStatus;
}