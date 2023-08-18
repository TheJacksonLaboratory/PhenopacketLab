import { Convert, OntologyClass, Procedure, TimeElement } from './base';

export class Measurement extends Convert {
    // key parameter not part of the phenopacket schema, used for primeng table
    key?: number;

    description: string;
    assay: OntologyClass;
    value: Value;
    complexValue: ComplexValue;
    timeObserved: TimeElement;
    procedure: Procedure;


    static create(obj: any): Measurement {
        const measurement = new Measurement();
        if (obj['description']) {
            measurement.description = obj['description'];
        }
        if (obj['assay']) {
            measurement.assay = OntologyClass.convert(obj['assay']);
        } else {
            throw new Error(`Phenopacket file is missing 'assay' field in 'measurements' object.`);
        }
        // measurement value
        if (obj['value']) {
            measurement.value = Value.convert(obj['value']);
        } else if (obj['complexValue']) {
            measurement.complexValue = ComplexValue.convert(obj['complexValue']);
        } else {
            throw new Error(`Phenopacket file is missing 'value' or 'complexValue' field in 'measurements' object.`);
        }
        if (obj['timeObserved']) {
            measurement.timeObserved = TimeElement.convert(obj['timeObserved']);
        }
        if (obj['procedure']) {
            measurement.procedure = Procedure.convert(obj['procedure']);
        }
        return measurement;
    }
}

export class Value {
    quantity: Quantity;
    ontologyClass: OntologyClass;

    static convert(obj: any): Value {
        const val = new Value();
        // if value is quantity
        if (obj['quantity']) {
            val.quantity = Quantity.convert(obj['quantity']);
        } else if (obj['ontologyClass']) {
            // value is ontology class
            val.ontologyClass = OntologyClass.convert(obj['ontologyClass']);
        } else {
            throw new Error(`Phenopacket file is missing 'quantity' or 'ontologyClass' field in 'value' object.`);
        }
        return val;
    }

    toString() {
        if (this.quantity) {
            const unit = this.quantity.unit;
            const val = this.quantity.value;
            return `${val} ${unit?.label} [${unit?.id}]`;
        } else if (this.ontologyClass) {
            const label = this.ontologyClass?.label;
            const id = this.ontologyClass?.id;
            return `${label} [${id}]`;
        }
        return '';
    }
}

export class ComplexValue {
    typedQuantities: TypedQuantity[];
    static convert(obj: any): ComplexValue {
        const complexValue = new ComplexValue();
        if (obj['typedQuantities']) {
            complexValue.typedQuantities = TypedQuantity.convert(obj['typedQuantities']);
        } else {
            throw new Error(`Phenopacket file is missing 'typedQuantities' field in 'complexValue' object.`);
        }
        return complexValue;
    }

    toString() {
        const quantities = this.typedQuantities;
        let result = '';
        for (const typedQuantity of quantities) {
            const unit = typedQuantity?.quantity?.unit;
            const val = typedQuantity?.quantity?.value;
            // let type = typedQuantity?.type
            result += `${val} ${unit?.label} [${unit?.id}], `;
        }
        return result;
    }
}

export class Quantity {
    unit: OntologyClass;
    value: number;
    referenceRange: ReferenceRange;

    static convert(obj: any): Quantity {
        const quantity = new Quantity();
        if (obj['unit']) {
            quantity.unit = OntologyClass.convert(obj['unit']);
        } else {
            throw new Error(`Phenopacket file is missing 'unit' field in 'quantity' object.`);
        }
        if (obj['value'] !== undefined) {
            quantity.value = obj['value'];
        } else {
            throw new Error(`Phenopacket file is missing 'value' field in 'quantity' object.`);
        }
        if (obj['referenceRange']) {
            quantity.referenceRange = ReferenceRange.convert(obj['referenceRange']);
        }
        return quantity;
    }
}

export class TypedQuantity {
    type: OntologyClass;
    quantity: Quantity;

    public static convert(obj: any): any {
        if (Array.isArray(obj)) {
            const typedQuantities = [];
            for (const typed of obj) {
                const typedQuantity = this.create(typed);
                typedQuantities.push(typedQuantity);
            }
            return typedQuantities;
        } else {
            return this.create(obj);
        }
    }

    static create(obj: any): TypedQuantity {
        const typedQuantity = new TypedQuantity();
        if (obj['type']) {
            typedQuantity.type = OntologyClass.convert(obj['type']);
        } else {
            throw new Error(`Phenopacket file is missing 'type' field in 'typedQuantities' object.`);
        }
        if (obj['quantity']) {
            typedQuantity.quantity = Quantity.convert(obj['quantity']);
        } else {
            throw new Error(`Phenopacket file is missing 'quantity' field in 'typedQuantities' object.`);
        }
        return typedQuantity;
    }
}

export class ReferenceRange {
    unit: OntologyClass;
    low: number;
    high: number;

    static convert(obj: any): ReferenceRange {
        const referenceRange = new ReferenceRange();
        if (obj['unit']) {
            referenceRange.unit = OntologyClass.convert(obj['unit']);
        } else {
            throw new Error(`Phenopacket file is missing 'unit' field in 'referenceRange' object.`);
        }
        if (obj['low'] !== undefined) {
            referenceRange.low = obj['low'];
        } else {
            throw new Error(`Phenopacket file is missing 'low' field in 'referenceRange' object.`);
        }
        if (obj['high'] !== undefined) {
            referenceRange.high = obj['high'];
        } else {
            throw new Error(`Phenopacket file is missing 'high' field in 'referenceRange' object.`);
        }
        return referenceRange;
    }
}
