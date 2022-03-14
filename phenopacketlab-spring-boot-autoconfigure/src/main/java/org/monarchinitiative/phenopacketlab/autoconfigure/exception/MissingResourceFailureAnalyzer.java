package org.monarchinitiative.phenopacketlab.autoconfigure.exception;

import org.springframework.boot.diagnostics.AbstractFailureAnalyzer;
import org.springframework.boot.diagnostics.FailureAnalysis;

public class MissingResourceFailureAnalyzer extends AbstractFailureAnalyzer<MissingPhenopacketLabResourceException> {
    @Override
    protected FailureAnalysis analyze(Throwable rootFailure, MissingPhenopacketLabResourceException cause) {
        return new FailureAnalysis(String.format("PhenopacketLab could not be auto-configured properly: '%s'", cause.getMessage()),
                "This issue can likely be solved by re-downloading or re-creating the PhenopacketLab data directory",
                cause);
    }
}
