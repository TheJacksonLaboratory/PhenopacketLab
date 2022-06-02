package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.monarchinitiative.phenol.annotations.io.hpo.DiseaseDatabase;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Set;

@ConfigurationProperties(prefix = "phenopacketlab")
public class PhenopacketLabProperties {

    private String dataDirectory;
    private Set<DiseaseDatabase> diseaseDatabases = DiseaseDatabase.allKnownDiseaseDatabases();

    private String phenopacketSchemaVersion;

    public String getDataDirectory() {
        return dataDirectory;
    }

    public void setDataDirectory(String dataDirectory) {
        this.dataDirectory = dataDirectory;
    }

    public Set<DiseaseDatabase> diseaseDatabases() {
        return diseaseDatabases;
    }

    public void setDiseaseDatabases(Set<DiseaseDatabase> diseaseDatabases) {
        this.diseaseDatabases = diseaseDatabases;
    }

    public String phenopacketSchemaVersion() {
        return phenopacketSchemaVersion;
    }

    public void setPhenopacketSchemaVersion(String phenopacketSchemaVersion) {
        this.phenopacketSchemaVersion = phenopacketSchemaVersion;
    }

}
