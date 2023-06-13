export class ValidationResults {
    validators: ValidationInfo[];
    validationResults: ValidationResult[];
}
export class ValidationResult {
    validatorInfo: ValidationInfo;
    level: ValidationLevel;
    category: string;
    message: string;
}
export class ValidationInfo {
    validatorId: string;
    validatorName: string;
    description: string;
}
export enum ValidationLevel {
    WARNING,
    ERROR
}
