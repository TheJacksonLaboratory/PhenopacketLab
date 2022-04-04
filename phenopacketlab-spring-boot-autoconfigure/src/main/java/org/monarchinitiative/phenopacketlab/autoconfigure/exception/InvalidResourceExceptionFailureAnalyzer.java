package org.monarchinitiative.phenopacketlab.autoconfigure.exception;

import org.springframework.boot.diagnostics.AbstractFailureAnalyzer;
import org.springframework.boot.diagnostics.FailureAnalysis;

public class InvalidResourceExceptionFailureAnalyzer extends AbstractFailureAnalyzer<InvalidResourceException> {
    @Override
    protected FailureAnalysis analyze(Throwable rootFailure, InvalidResourceException cause) {
        return new FailureAnalysis(String.format("PhenopacketLab could not be auto-configured properly: '%s'", cause.getMessage()),
                "The issue should be solved by re-downloading or re-creating the PhenopacketLab data directory. Contact the developers if the problem persists even after re-download.",
                cause);
    }
}
