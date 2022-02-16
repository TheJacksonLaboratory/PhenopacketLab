package org.monarchinitiative.phenopacketlab.autoconfigure.exception;

import org.monarchinitiative.phenopacketlab.core.PhenopacketLabException;

public class MissingPhenopacketLabResourceException extends PhenopacketLabException {
    public MissingPhenopacketLabResourceException() {
        super();
    }

    public MissingPhenopacketLabResourceException(String message) {
        super(message);
    }

    public MissingPhenopacketLabResourceException(String message, Throwable cause) {
        super(message, cause);
    }

    public MissingPhenopacketLabResourceException(Throwable cause) {
        super(cause);
    }

    protected MissingPhenopacketLabResourceException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
