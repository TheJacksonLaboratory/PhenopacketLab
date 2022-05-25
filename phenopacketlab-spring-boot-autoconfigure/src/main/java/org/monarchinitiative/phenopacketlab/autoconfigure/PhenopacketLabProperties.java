package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.monarchinitiative.phenol.annotations.io.hpo.DiseaseDatabase;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Set;

@ConfigurationProperties(prefix = "phenopacketlab")
public class PhenopacketLabProperties {

    private String dataDirectory;
    private int loaderThreads = 2;
    private Set<DiseaseDatabase> diseaseDatabases = DiseaseDatabase.allKnownDiseaseDatabases();

    public String getDataDirectory() {
        return dataDirectory;
    }

    public void setDataDirectory(String dataDirectory) {
        this.dataDirectory = dataDirectory;
    }

    public int getLoaderThreads() {
        return loaderThreads;
    }

    public void setLoaderThreads(int loaderThreads) {
        this.loaderThreads = loaderThreads;
    }

    public Set<DiseaseDatabase> diseaseDatabases() {
        return diseaseDatabases;
    }

    public void setDiseaseDatabases(Set<DiseaseDatabase> diseaseDatabases) {
        this.diseaseDatabases = diseaseDatabases;
    }
}
