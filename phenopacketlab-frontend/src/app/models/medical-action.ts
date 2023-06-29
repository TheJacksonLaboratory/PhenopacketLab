import { Convert, ExternalReference, OntologyClass, Procedure, TimeElement, TimeInterval } from './base';
import { Quantity } from './measurement';
import { OntologyTreeNode } from './ontology-treenode';


export class MedicalAction extends Convert {
    key?: number;
    // parameter no part of phenopacket and that represents the adverse events as TreeNodes
    adverseEventNodes?: OntologyTreeNode[];
    // can be Procedure, Treatment, RadiationTherapy or TherapeuticRegimen
    // action
    procedure: Procedure;
    treatment: Treatment;
    radiationTherapy: RadiationTherapy;
    therapeuticRegimen: TherapeuticRegimen;

    treatmentTarget: OntologyClass;
    treatmentIntent: OntologyClass;
    responseToTreatment: OntologyClass;
    adverseEvents: OntologyClass[];
    treatmentTerminationReason: OntologyClass;

    static create(obj: any): MedicalAction {
        const medicalAction = new MedicalAction();
        // action
        if (obj['procedure']) {
            medicalAction.procedure = Procedure.convert(obj['procedure']);
        } else if (obj['treatment']) {
            medicalAction.treatment = Treatment.convert(obj['treatment']);
        } else if (obj['radiationTherapy']) {
            medicalAction.radiationTherapy = RadiationTherapy.convert(obj['radiationTherapy']);
        } else if (obj['therapeuticRegimen']) {
            medicalAction.therapeuticRegimen = TherapeuticRegimen.convert(obj['therapeuticRegimen']);
        } else {
            throw new Error(`Phenopacket file is missing 'procedure', 'treatment', 'radiationTherapy' or 'therapeuticRegimen' field in 'medicalActions' object.`);
        }
        if (obj['treatmentTarget']) {
            medicalAction.treatmentTarget = OntologyClass.convert(obj['treatmentTarget']);
        }
        if (obj['treatmentIntent']) {
            medicalAction.treatmentIntent = OntologyClass.convert(obj['treatmentIntent']);
        }
        if (obj['adverseEvents']) {
            medicalAction.adverseEvents = OntologyClass.convert(obj['adverseEvents']);
        }
        if (obj['treatmentTerminationReason']) {
            medicalAction.treatmentTerminationReason = OntologyClass.convert(obj['treatmentTerminationReason']);
        }
        return medicalAction;
    }
}

export class Treatment {
    static actionName = 'Treatment';
    agent: OntologyClass;
    routeOfAdministration: OntologyClass;
    doseIntervals: DoseInterval[];
    drugType: DrugType;
    cumulativeDose: Quantity;

    static convert(obj: any): Treatment {
        const treatment = new Treatment();
        if (obj['agent']) {
            treatment.agent = OntologyClass.convert(obj['agent']);
        } else {
            throw new Error(`Phenopacket file is missing 'agent' field in 'treatment' object.`);
        }
        if (obj['routeOfAdministration']) {
            treatment.routeOfAdministration = OntologyClass.convert(obj['routeOfAdministration']);
        }
        if (obj['doseIntervals']) {
            treatment.doseIntervals = DoseInterval.convert(obj['doseIntervals']);
        }
        if (obj['drugType']) {
            treatment.drugType = obj['drugType'];
        }
        if (obj['cumulativeDose']) {
            treatment.cumulativeDose = Quantity.convert(obj['cumulativeDose']);
        }

        return treatment;
    }

    toString() {
        if (this.agent) {
            return this.agent.toString();
        }
       return '';
    }
}
export class DoseInterval extends Convert {
    key?: number;
    quantity: Quantity;
    scheduleFrequency: OntologyClass;
    interval: TimeInterval;

    static create(obj: any): DoseInterval {
        const doseInterval = new DoseInterval();
        if (obj['quantity']) {
            doseInterval.quantity = Quantity.convert(obj['quantity']);
        } else {
            throw new Error(`Phenopacket file is missing 'quantity' field in 'doseInterval' object.`);
        }
        if (obj['scheduleFrequency']) {
            doseInterval.scheduleFrequency = OntologyClass.convert(obj['scheduleFrequency']);
        } else {
            throw new Error(`Phenopacket file is missing 'scheduleFrequency' field in 'doseInterval' object.`);
        }
        if (obj['interval']) {
            doseInterval.interval = TimeInterval.convert(obj['interval']);
        } else {
            throw new Error(`Phenopacket file is missing 'interval' field in 'doseInterval' object.`);
        }
        return doseInterval;
    }
}
export class ScheduleFrequency {
    static VALUES = [new OntologyClass('NCIT:C64576', 'Once'),
                new OntologyClass('NCIT:C125004', 'Once Daily'),
                new OntologyClass('NCIT:C64496', 'Twice Daily'),
                new OntologyClass('NCIT:C64527', 'Three Times Daily'),
                new OntologyClass('NCIT:C64530', 'Four Times Daily')];
}
export enum DrugType {
    UNKNOWN_DRUG_TYPE = 'Unknown',
    PRESCRIPTION = 'Prescription',
    EHR_MEDICATION_LIST = 'EHR medication list',
    ADMINISTRATION_RELATED_TO_PROCEDURE = 'Administration related to procedure'
}
export class RadiationTherapy {
   static actionName = 'Radiation therapy';
    modality: OntologyClass;
    bodySite: OntologyClass;
    dosage: number;
    fractions: number;

    static convert(obj: any): RadiationTherapy {
        const radiationTherapy = new RadiationTherapy();
        if (obj['modality']) {
            radiationTherapy.modality = OntologyClass.convert(obj['modality']);
        } else {
            throw new Error(`Phenopacket file is missing 'modality' field in 'radiationTherapy' object.`);
        }
        if (obj['bodySite']) {
            radiationTherapy.bodySite = OntologyClass.convert(obj['bodySite']);
        } else {
            throw new Error(`Phenopacket file is missing 'bodySite' field in 'radiationTherapy' object.`);
        }
        if (obj['dosage']) {
            radiationTherapy.dosage = obj['dosage'];
        } else {
            throw new Error(`Phenopacket file is missing 'dosage' field in 'radiationTherapy' object.`);
        }
        if (obj['fractions']) {
            radiationTherapy.fractions = obj['fractions'];
        } else {
            throw new Error(`Phenopacket file is missing 'fractions' field in 'radiationTherapy' object.`);
        }
        return radiationTherapy;
    }

    toString() {
        if (this.modality) {
            return this.modality.toString();
        }
        return '';
    }
}

export enum RegimenStatus {
    UNKNOWN_STATUS = 'Unknown',
    STARTED = 'Started',
    COMPLETED = 'Completed',
    DISCONTINUED = 'Discontinued'
}
export class TherapeuticRegimen {
    static actionName = 'Therapeutic regimen';
    identifier: OntologyClass | ExternalReference;
    startTime: TimeElement;
    endTime: TimeElement;
    regimenStatus: RegimenStatus;

    static convert(obj: any): TherapeuticRegimen {
        const therapeuticRegimen = new TherapeuticRegimen();
        if (obj['ontologyClass']) {
            therapeuticRegimen.identifier = OntologyClass.convert(obj['ontologyClass']);
        } else if (obj['externalReference']) {
            therapeuticRegimen.identifier = ExternalReference.convert(obj['externalReference']);
        } else {
            throw new Error(`Phenopacket file is missing 'ontologyClass' or 'externalReference' field in 'therapeuticRegimen' object.`);
        }
        if (obj['startTime']) {
            therapeuticRegimen.startTime = TimeElement.convert(obj['startTime']);
        }
        if (obj['endTime']) {
            therapeuticRegimen.endTime = TimeElement.convert(obj['endTime']);
        }
        if (obj['regimenStatus']) {
            therapeuticRegimen.regimenStatus = obj['regimenStatus'];
        } else {
            throw new Error(`Phenopacket file is missing 'regimenStatus' field in 'therapeuticRegimen' object.`);
        }
        return therapeuticRegimen;
    }

    toString() {
        if (this.identifier) {
            return this.identifier.toString();
        }
        return '';
    }
}
