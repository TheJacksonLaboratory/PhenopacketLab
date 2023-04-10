package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.monarchinitiative.phenol.annotations.io.hpo.DiseaseDatabase;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

import java.util.Set;

@ConfigurationProperties(prefix = "phenopacketlab")
public class PhenopacketLabProperties {

    private String dataDirectory;
    private int loaderThreads = 2;
    private Set<DiseaseDatabase> diseaseDatabases = DiseaseDatabase.allKnownDiseaseDatabases();

    private String phenopacketSchemaVersion;
    @NestedConfigurationProperty
    private TextMiningConfiguration textMining = new TextMiningConfiguration();

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

    public String phenopacketSchemaVersion() {
        return phenopacketSchemaVersion;
    }

    public void setPhenopacketSchemaVersion(String phenopacketSchemaVersion) {
        this.phenopacketSchemaVersion = phenopacketSchemaVersion;
    }

    public TextMiningConfiguration getTextMining() {
        return textMining;
    }

    public void setTextMining(TextMiningConfiguration textMining) {
        this.textMining = textMining;
    }

    @Override
    public String toString() {
        return "PhenopacketLabProperties{" +
                "dataDirectory='" + dataDirectory + '\'' +
                ", loaderThreads=" + loaderThreads +
                ", diseaseDatabases=" + diseaseDatabases +
                ", phenopacketSchemaVersion='" + phenopacketSchemaVersion + '\'' +
                ", textMining=" + textMining +
                '}';
    }
}
