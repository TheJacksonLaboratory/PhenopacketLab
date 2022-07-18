package org.monarchinitiative.phenopacketlab.io;

import org.monarchinitiative.phenopacketlab.core.PhenopacketLabException;

public class PhenopacketLabIOException extends PhenopacketLabException {
    public PhenopacketLabIOException() {
        super();
    }

    public PhenopacketLabIOException(String message) {
        super(message);
    }

    public PhenopacketLabIOException(String message, Throwable cause) {
        super(message, cause);
    }

    public PhenopacketLabIOException(Throwable cause) {
        super(cause);
    }

    protected PhenopacketLabIOException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
