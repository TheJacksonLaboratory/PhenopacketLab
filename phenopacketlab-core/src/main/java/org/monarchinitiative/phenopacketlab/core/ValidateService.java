package org.monarchinitiative.phenopacketlab.core;

import org.phenopackets.phenopackettools.validator.core.ValidationResult;
import org.phenopackets.phenopackettools.validator.core.ValidationResults;
import org.phenopackets.phenopackettools.validator.core.ValidationWorkflowRunner;
import org.phenopackets.phenopackettools.validator.jsonschema.JsonSchemaValidationWorkflowRunner;
import org.phenopackets.schema.v2.PhenopacketOrBuilder;

public class ValidateService {

    ValidationWorkflowRunner<PhenopacketOrBuilder> runner;
    public ValidateService() {
        runner = JsonSchemaValidationWorkflowRunner.phenopacketBuilder()
                .build();
    }

    public String validate(String phenopacketString) {
        ValidationResults results = runner.validate(phenopacketString);
        if (results.isValid()) {
            return "Phenopacket was successfully validated.";
        } else {
            StringBuilder errorMessages = new StringBuilder("Error messages: ");
            for (ValidationResult result:results.validationResults()) {
                errorMessages.append("\n").append(result.message());
            }
            return errorMessages.toString();
        }
    }
}
