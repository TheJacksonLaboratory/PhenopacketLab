import { Convert, OntologyClass, Procedure, TimeElement } from "./base";

export class Measurement extends Convert {
    description: string;
    assay: OntologyClass;
    measurementValue: Value | ComplexValue;
    timeObserved: TimeElement;
    procedure: Procedure;


    static create(obj: any): Measurement {
        const measurement = new Measurement();
        measurement.description = obj['description'];
        measurement.assay = OntologyClass.convert(obj['assay']);
        // measurement value
        let value = obj['measurementValue'];
        if (value['value']) {
            measurement.measurementValue = Value.convert(value);
        } else {
            measurement.measurementValue = ComplexValue.convert(value);
        }
        measurement.timeObserved = TimeElement.convert(obj['timeObserved']);
        measurement.procedure = Procedure.convert(obj['procedure']);
        return measurement;
    }
}

export class Value {
    value: Quantity | OntologyClass;

    static convert(obj: any): Value {
        const val = new Value();
        // if value is quantity
        if (obj['unit']) {
            val.value = Quantity.convert(obj['value']);
        } else {
            // value is ontology class
            val.value = OntologyClass.convert(obj['value']);
        }
        return val;
    }
}

export class ComplexValue {
    typedQuantities: TypedQuantity[];

    static convert(obj: any): ComplexValue {
        const complexValue = new ComplexValue();
        complexValue.typedQuantities = TypedQuantity.convert(obj['typedQuantities']);
        return complexValue;
    }
}

export class Quantity {
    unit: OntologyClass;
    value: number;
    referenceRange: ReferenceRange;

    static convert(obj: any): Quantity {
        const quantity = new Quantity();
        quantity.unit = OntologyClass.convert(obj['unit']);
        quantity.value = obj['value'];
        quantity.referenceRange = ReferenceRange.convert(obj['referenceRange']);
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
                const typedQuantity = this.create(typed);;
                typedQuantities.push(typedQuantity);
            }
            return typedQuantities;
        } else {
            return this.create(obj);
        }
    }

    static create(obj: any): TypedQuantity {
        const typedQuantity = new TypedQuantity();
        typedQuantity.type = OntologyClass.convert(obj['type']);
        typedQuantity.quantity = Quantity.convert(obj['quantity']);
        return typedQuantity;
    }
}

export class ReferenceRange {
    unit: OntologyClass;
    low: number;
    high: number;

    static convert(obj: any): ReferenceRange {
        const referenceRange = new ReferenceRange();
        referenceRange.unit = OntologyClass.convert(obj['unit']);
        referenceRange.low = obj['low'];
        referenceRange.high = obj['high'];
        return referenceRange;
    }
}