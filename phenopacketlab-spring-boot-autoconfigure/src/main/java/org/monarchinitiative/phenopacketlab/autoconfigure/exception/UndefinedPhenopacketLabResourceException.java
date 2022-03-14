package org.monarchinitiative.phenopacketlab.autoconfigure.exception;

import org.monarchinitiative.phenopacketlab.core.PhenopacketLabException;

public class UndefinedPhenopacketLabResourceException extends PhenopacketLabException {

    public UndefinedPhenopacketLabResourceException() {
        super();
    }

    public UndefinedPhenopacketLabResourceException(String message) {
        super(message);
    }

    public UndefinedPhenopacketLabResourceException(String message, Throwable cause) {
        super(message, cause);
    }

    public UndefinedPhenopacketLabResourceException(Throwable cause) {
        super(cause);
    }

    protected UndefinedPhenopacketLabResourceException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
