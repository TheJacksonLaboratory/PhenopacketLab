import { Convert, ExternalReference, OntologyClass, Procedure, TimeElement, TimeInterval } from "./base";
import { Quantity } from "./measurement";


export class MedicalAction extends Convert {
    // can be Procedure, Treatment, RadiationTherapy or TherapeuticRegimen
    action: any;
    treatmentTarget: OntologyClass;
    treatmentIntent: OntologyClass;
    responseToTreatment: OntologyClass;
    adverseEvents: OntologyClass[];
    treatmentTerminationReason: OntologyClass;

    static create(obj: any): MedicalAction {
        const medicalAction = new MedicalAction();
        // action
        let action = obj['action'];
        if (action['code']) {
            medicalAction.action = Procedure.convert(action);
        } else if (action['agent']) {
            medicalAction.action = Treatment.convert(action);
        } else if (action['modality']) {
            medicalAction.action = RadiationTherapy.convert(action);
        } else if (action['identifier']) {
            medicalAction.action = TherapeuticRegimen.convert(action);
        }
        medicalAction.treatmentTarget = OntologyClass.convert(obj['treatmentTarget']);
        medicalAction.treatmentIntent = OntologyClass.convert(obj['treatmentIntent']);
        medicalAction.adverseEvents = OntologyClass.convert(obj['adversEvents']);
        medicalAction.treatmentTerminationReason = OntologyClass.convert(obj['treatmentTerminationReason']);
        return medicalAction;
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

    static convert(obj: any): Treatment {
        const treatment = new Treatment();
        treatment.agent = OntologyClass.convert(obj['agent']);
        treatment.routeOfAdministration = OntologyClass.convert(obj['routeOfAdministration']);
        treatment.doseIntervals = DoseInterval.convert(obj['doseIntervals']);
        treatment.drugType = obj['drugType'];
        treatment.cumulativeDose = Quantity.convert(obj['cumulativeDose']);
        return treatment;
    } 
}
export class DoseInterval extends Convert {
    quantity: Quantity;
    scheduleFrequency: OntologyClass;
    interval: TimeInterval;

    static create(obj: any): DoseInterval {
        const doseInterval = new DoseInterval();
        doseInterval.quantity = Quantity.convert(obj['quantity']);
        doseInterval.scheduleFrequency = OntologyClass.convert(obj['scheduleFrequency']);
        doseInterval.interval = TimeInterval.convert(obj['interval']);
        return doseInterval;
    }
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

    toString() {
        return "Radiation therapy";
    }

    static convert(obj: any): RadiationTherapy {
        const radiationTherapy = new RadiationTherapy();
        radiationTherapy.modality = OntologyClass.convert(obj['modality']);
        radiationTherapy.bodySite = OntologyClass.convert(obj['bodySite']);
        radiationTherapy.dosage = obj['dosage'];
        radiationTherapy.fractions = obj['fractions'];
        return radiationTherapy;
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
    status: RegimenStatus;

    toString() {
        return "Therapeutic regimen";
    }

    static convert(obj: any): TherapeuticRegimen {
        const therapeuticRegimen = new TherapeuticRegimen();
        let identifier = obj['identifier'];
        if (identifier['label']) {
            therapeuticRegimen.identifier = OntologyClass.convert(identifier);
        } else {
            therapeuticRegimen.identifier = ExternalReference.convert(identifier);
        }
        therapeuticRegimen.startTime = TimeElement.convert(obj['startTime']);
        therapeuticRegimen.endTime = TimeElement.convert(obj['endTime']);
        therapeuticRegimen.status = obj['status'];
        return therapeuticRegimen;
    }
}