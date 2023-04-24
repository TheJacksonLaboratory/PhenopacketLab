package org.monarchinitiative.phenopacketlab.core;

import java.util.Objects;

public class PhenopacketLabMetadata {

    private final String phenopacketSchemaVersion;

    public PhenopacketLabMetadata(String phenopacketSchemaVersion) {
        this.phenopacketSchemaVersion = phenopacketSchemaVersion;
    }

    public String phenopacketSchemaVersion() {
        return phenopacketSchemaVersion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhenopacketLabMetadata that = (PhenopacketLabMetadata) o;
        return Objects.equals(phenopacketSchemaVersion, that.phenopacketSchemaVersion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(phenopacketSchemaVersion);
    }

    @Override
    public String toString() {
        return "PhenopacketLabMetadata{" +
                "phenopacketSchemaVersion='" + phenopacketSchemaVersion + '\'' +
                '}';
    }
}
