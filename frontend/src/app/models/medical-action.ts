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
}

export class Treatment {
    agent: OntologyClass;
    routeOfAdministration: OntologyClass;
    doseIntervals: DoseInterval[];
    drugType: DrugType;
    cumulativeDose: Quantity;

    constructor() {
        this.agent = new OntologyClass('', '');
    }

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
    UNKNOWN_DRUG_TYPE = "Unknown",
    PRESCRIPTION = "Prescription",
    EHR_MEDICATION_LIST = "EHR medication list",
    ADMINISTRATION_RELATED_TO_PROCEDURE = "Administration related to procedure"
}
export class RadiationTherapy {
    modality: OntologyClass;
    bodySite: OntologyClass;
    dosage: number;
    fractions: number;

    constructor() {
        this.modality = new OntologyClass('', '');
    }
    toString() {
        return "Radiation therapy";
    }
}

export enum RegimenStatus {
    UNKNOWN_STATUS = "Unknown",
    STARTED = "Started",
    COMPLETED = "Completed",
    DISCONTINUED = "Discontinued"
}
export class TherapeuticRegimen {
    identifier: OntologyClass | ExternalReference;
    startTime: TimeElement;
    endTime: TimeElement;
    regimenStatus: RegimenStatus;
    constructor() {
        this.identifier = new OntologyClass('', '');
    }
    toString() {
        return "Therapeutic regimen";
    }
}