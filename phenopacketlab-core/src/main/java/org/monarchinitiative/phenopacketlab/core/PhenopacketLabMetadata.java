package org.monarchinitiative.phenopacketlab.core;

public class PhenopacketLabMetadata {

    private final String phenopacketSchemaVersion;

    public PhenopacketLabMetadata(String phenopacketSchemaVersion) {
        this.phenopacketSchemaVersion = phenopacketSchemaVersion;
    }

    public String phenopacketSchemaVersion() {
        return phenopacketSchemaVersion;
    }

    @Override
    public String toString() {
        return "PhenopacketLabMetadata{" +
                "phenopacketSchemaVersion='" + phenopacketSchemaVersion + '\'' +
                '}';
    }
}
