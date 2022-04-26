import { OntologyClass, Procedure, TimeElement } from "./base";

export class Measurement {
    description: string;

    assay: OntologyClass;

    timeObserved: TimeElement;

    procedure: Procedure;

}

export class Value {
    quantity: Quantity;
    ontologyClass: OntologyClass;
}

export class ComplexValue {
    typedQuantities: TypedQuantity;
}

export class Quantity {
    unit: OntologyClass;
    value: number;
    referenceRange: ReferenceRange;
}

export class TypedQuantity {
    type: OntologyClass;
    quantity: Quantity;
}

export class ReferenceRange {
    unit: OntologyClass;
    low: number;
    high: number;
}