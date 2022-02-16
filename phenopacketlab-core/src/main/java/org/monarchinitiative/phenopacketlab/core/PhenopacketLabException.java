package org.monarchinitiative.phenopacketlab.core;

public class PhenopacketLabException extends Exception {

    public PhenopacketLabException() {
        super();
    }

    public PhenopacketLabException(String message) {
        super(message);
    }

    public PhenopacketLabException(String message, Throwable cause) {
        super(message, cause);
    }

    public PhenopacketLabException(Throwable cause) {
        super(cause);
    }

    protected PhenopacketLabException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
