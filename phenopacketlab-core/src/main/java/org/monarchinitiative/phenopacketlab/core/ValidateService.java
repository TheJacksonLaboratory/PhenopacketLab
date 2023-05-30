package org.monarchinitiative.phenopacketlab.core;

import org.phenopackets.phenopackettools.validator.core.ValidationResults;
import org.phenopackets.phenopackettools.validator.core.ValidationWorkflowRunner;
import org.phenopackets.phenopackettools.validator.jsonschema.JsonSchemaValidationWorkflowRunner;
import org.phenopackets.schema.v2.PhenopacketOrBuilder;

import java.util.Optional;

public class ValidateService {

    ValidationWorkflowRunner<PhenopacketOrBuilder> runner;
    public ValidateService() {
        runner = JsonSchemaValidationWorkflowRunner.phenopacketBuilder()
                .build();
    }

    public Optional<ValidationResults> validate(String phenopacketString) {
        ValidationResults results = runner.validate(phenopacketString);
        return Optional.of(results);
    }
}
