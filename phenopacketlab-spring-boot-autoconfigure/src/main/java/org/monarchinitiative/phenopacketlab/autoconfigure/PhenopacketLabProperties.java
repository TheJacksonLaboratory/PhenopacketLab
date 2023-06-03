package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;

import java.util.List;

@ConfigurationProperties(prefix = "phenopacketlab")
public class PhenopacketLabProperties {

    private String dataDirectory;
    private int loaderThreads = 2;
    private List<String> diseaseDatabasePrefixes = List.of();
    private List<String> phenotypePrefixes = List.of();

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

    public List<String> getDiseaseDatabasePrefixes() {
        return diseaseDatabasePrefixes;
    }

    public void setDiseaseDatabasePrefixes(List<String> diseaseDatabasePrefixes) {
        this.diseaseDatabasePrefixes = diseaseDatabasePrefixes;
    }

    public List<String> getPhenotypePrefixes() {
        return phenotypePrefixes;
    }

    public void setPhenotypePrefixes(List<String> phenotypePrefixes) {
        this.phenotypePrefixes = phenotypePrefixes;
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
                ", diseaseDatabasePrefixes=" + diseaseDatabasePrefixes +
                ", phenotypePrefixes=" + phenotypePrefixes +
                ", phenopacketSchemaVersion='" + phenopacketSchemaVersion + '\'' +
                ", textMining=" + textMining +
                '}';
    }
}
