import { ExternalReference, OntologyClass, Procedure, TimeElement, TimeInterval } from "./base";
import { Quantity } from "./measurement";


export class MedicalAction {
    // can be Procedure, Treatment, RadiationTherapy or TherapeuticRegimen
    action: any;
    treatmentTarget: OntologyClass;
    treatmentIntent: OntologyClass;
    responseToTreatment: OntologyClass;
    adverseEvents: OntologyClass;
    treatmentTerminationReason: OntologyClass;

    /**
     * 
     * @param action Procedure, Treatment, RadiationTherapy or TherapeuticRegimen
     */
    constructor(action: Procedure | Treatment | RadiationTherapy | TherapeuticRegimen) {
        this.action = action;
    }
}

export class Treatment {
    agent: OntologyClass;
    routeOfAdministration: OntologyClass;
    doseIntervals: DoseInterval[];
    drugType: DrugType;
    cumulativeDose: Quantity;

    toString() {
        return "Treatment";
    }
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

    toString() {
        return "Radiation therapy";
    }
}

export enum RegimenStatus {
    UNKNOWN_STATUS,
    STARTED,
    COMPLETED,
    DISCONTINUED
}
export class TherapeuticRegimen {
    identifier: OntologyClass | ExternalReference;
    startTime: TimeElement;
    endTime: TimeElement;
    regimenStatus: RegimenStatus;

    toString() {
        return "Therapeutic regimen";
    }
}