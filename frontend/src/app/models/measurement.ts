import { Convert, OntologyClass, Procedure, TimeElement } from "./base";

export class Measurement extends Convert {
    description: string;
    assay: OntologyClass;
    measurementValue: Value | ComplexValue;
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
            throw new Error(`Phenopacket file is missing 'assay' field in 'measurements' object.`)
        }
        // measurement value
        if (obj['value']) {
            measurement.measurementValue = Value.convert(obj['value']);
        } else if (obj['complexValue']) {
            measurement.measurementValue = ComplexValue.convert(obj['complexValue']);
        } else {
            throw new Error(`Phenopacket file is missing 'value' or 'complexValue' field in 'measurements' object.`)
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
    value: Quantity | OntologyClass;

    toString() {
        if (this.value instanceof Quantity) {
            let unit = this.value.unit;
            let val = this.value.value;
            return `${val} ${unit?.label} [${unit?.id}]`;
        } else if (this.value instanceof OntologyClass) {
            let label = this.value?.label;
            let id = this.value?.id;
            return `${label} [${id}]`;
        }
        return '';
    }

    static convert(obj: any): Value {
        const val = new Value();
        // if value is quantity
        if (obj['quantity']) {
            val.value = Quantity.convert(obj['quantity']);
        } else if (obj['ontologyClass']) {
            // value is ontology class
            val.value = OntologyClass.convert(obj['ontologyClass']);
        } else {
            throw new Error(`Phenopacket file is missing 'quantity' or 'ontologyClass' field in 'value' object.`)
        }
        return val;
    }
}

export class ComplexValue {
    typedQuantities: TypedQuantity[];

    toString() {
        let quantities = this.typedQuantities;
        let result = '';
        for (let typedQuantity of quantities) {
            let unit = typedQuantity?.quantity?.unit;
            let val = typedQuantity?.quantity?.value;
            // let type = typedQuantity?.type
            result += `${val} ${unit?.label} [${unit?.id}], `;
        }
        return result;
    }
    static convert(obj: any): ComplexValue {
        const complexValue = new ComplexValue();
        if (obj['typedQuantities']) {
            complexValue.typedQuantities = TypedQuantity.convert(obj['typedQuantities']);
        } else {
            throw new Error(`Phenopacket file is missing 'typedQuantities' field in 'complexValue' object.`)
        }
        return complexValue;
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
            throw new Error(`Phenopacket file is missing 'unit' field in 'quantity' object.`)
        }
        if (obj['value']) {
            quantity.value = obj['value'];
        } else {
            throw new Error(`Phenopacket file is missing 'value' field in 'quantity' object.`)
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
            for (let typed of obj) {
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
            throw new Error(`Phenopacket file is missing 'type' field in 'typedQuantities' object.`)
        }
        if (obj['quantity']) {
            typedQuantity.quantity = Quantity.convert(obj['quantity']);
        } else {
            throw new Error(`Phenopacket file is missing 'quantity' field in 'typedQuantities' object.`)
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
            throw new Error(`Phenopacket file is missing 'unit' field in 'referenceRange' object.`)
        }
        if (obj['low']) {
            referenceRange.low = obj['low'];
        } else {
            throw new Error(`Phenopacket file is missing 'low' field in 'referenceRange' object.`)
        }
        if (obj['high']) {
            referenceRange.high = obj['high'];
        } else {
            throw new Error(`Phenopacket file is missing 'high' field in 'referenceRange' object.`)
        }
        return referenceRange;
    }
}