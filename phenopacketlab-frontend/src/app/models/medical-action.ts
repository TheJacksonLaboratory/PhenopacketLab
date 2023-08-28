import { Utils } from '../component/shared/utils';
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
            throw new Error(`'procedure', 'treatment', 'radiationTherapy' or 'therapeuticRegimen' field is missing from 'medicalActions'.`);
        }
        if (obj['treatmentTarget']) {
            medicalAction.treatmentTarget = OntologyClass.convert(obj['treatmentTarget']);
        }
        if (obj['treatmentIntent']) {
            medicalAction.treatmentIntent = OntologyClass.convert(obj['treatmentIntent']);
        }
        if (obj['adverseEvents']) {
            medicalAction.adverseEvents = OntologyClass.convert(obj['adverseEvents']);
            medicalAction.adverseEventNodes = [];
            for (const event of medicalAction.adverseEvents) {
                event.termUrl = Utils.getUrlForId(event.id);
                const node = new OntologyTreeNode();
                node.label = event.label;
                node.key = event.id;
                medicalAction.adverseEventNodes.push(node);
            }
        }
        if (obj['responseToTreatment']) {
            medicalAction.responseToTreatment = OntologyClass.convert(obj['responseToTreatment']);
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
            throw new Error(`'agent' is missing from 'treatment'.`);
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
            throw new Error(`'quantity' is missing from 'doseInterval'.`);
        }
        if (obj['scheduleFrequency']) {
            doseInterval.scheduleFrequency = OntologyClass.convert(obj['scheduleFrequency']);
        } else {
            throw new Error(`'scheduleFrequency' is missing from 'doseInterval'.`);
        }
        if (obj['interval']) {
            doseInterval.interval = TimeInterval.convert(obj['interval']);
        } else {
            throw new Error(`'interval' is missing from 'doseInterval'.`);
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
            throw new Error(`'modality' is missing from 'radiationTherapy'.`);
        }
        if (obj['bodySite']) {
            radiationTherapy.bodySite = OntologyClass.convert(obj['bodySite']);
        } else {
            throw new Error(`'bodySite' is missing from 'radiationTherapy'.`);
        }
        if (obj['dosage']) {
            radiationTherapy.dosage = obj['dosage'];
        } else {
            throw new Error(`'dosage' is missing from 'radiationTherapy'.`);
        }
        if (obj['fractions']) {
            radiationTherapy.fractions = obj['fractions'];
        } else {
            throw new Error(`'fractions' is missing from 'radiationTherapy'.`);
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
    UNKNOWN_STATUS,
    STARTED,
    COMPLETED,
    DISCONTINUED
}
export class TherapeuticRegimen {
    static actionName = 'Therapeutic regimen';
    // identifier as ontologyClass
    ontologyClass: OntologyClass;
    // identifier as ExternalReference
    externalReference: ExternalReference;
    startTime: TimeElement;
    endTime: TimeElement;
    regimenStatus: RegimenStatus;

    static convert(obj: any): TherapeuticRegimen {
        const therapeuticRegimen = new TherapeuticRegimen();
        if (obj['ontologyClass']) {
            therapeuticRegimen.ontologyClass = OntologyClass.convert(obj['ontologyClass']);
        } else if (obj['externalReference']) {
            therapeuticRegimen.externalReference = ExternalReference.convert(obj['externalReference']);
        } else {
            throw new Error(`'ontologyClass' or 'externalReference' is missing from 'therapeuticRegimen'.`);
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
            throw new Error(`'regimenStatus' is missing from 'therapeuticRegimen'.`);
        }
        return therapeuticRegimen;
    }

    toString() {
        if (this.ontologyClass) {
            return this.ontologyClass.toString();
        } else if (this.externalReference) {
            return this.externalReference.toString();
        }
        return '';
    }
}
