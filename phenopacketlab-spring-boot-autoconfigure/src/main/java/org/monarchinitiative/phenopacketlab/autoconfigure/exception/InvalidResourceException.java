package org.monarchinitiative.phenopacketlab.autoconfigure.exception;

import org.monarchinitiative.phenopacketlab.core.PhenopacketLabException;

public class InvalidResourceException extends PhenopacketLabException {

    public InvalidResourceException() {
        super();
    }

    public InvalidResourceException(String message) {
        super(message);
    }

    public InvalidResourceException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidResourceException(Throwable cause) {
        super(cause);
    }

    protected InvalidResourceException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
