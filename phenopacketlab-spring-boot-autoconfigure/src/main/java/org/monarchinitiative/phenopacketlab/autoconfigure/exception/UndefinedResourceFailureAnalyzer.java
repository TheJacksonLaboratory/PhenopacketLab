package org.monarchinitiative.phenopacketlab.autoconfigure.exception;

import org.springframework.boot.diagnostics.AbstractFailureAnalyzer;
import org.springframework.boot.diagnostics.FailureAnalysis;

public class UndefinedResourceFailureAnalyzer extends AbstractFailureAnalyzer<UndefinedPhenopacketLabResourceException> {

    @Override
    protected FailureAnalysis analyze(Throwable rootFailure, UndefinedPhenopacketLabResourceException cause) {
        // TODO - verify that adding `--phenopacketlab.data-directory` to CLI actually works
        return new FailureAnalysis(
                String.format("PhenopacketLab could not be auto-configured properly: '%s'", cause.getMessage()),
                "You need to define 'phenopacketlab.data-directory'. You can include them in your application.properties or supply your application with '-Dphenopacketlab.data-directory=', etc.. as a startup argument.",
                cause);
    }
}
