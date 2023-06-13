package org.monarchinitiative.phenopacketlab.core;

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

    public ValidationResults validate(String phenopacketString) {
        return runner.validate(phenopacketString);
    }
}
