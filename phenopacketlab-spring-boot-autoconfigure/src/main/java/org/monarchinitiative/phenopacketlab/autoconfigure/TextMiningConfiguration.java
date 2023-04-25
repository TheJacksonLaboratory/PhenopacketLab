package org.monarchinitiative.phenopacketlab.autoconfigure;

public class TextMiningConfiguration {

    private Provider provider = Provider.FENOMINAL;

    public Provider getProvider() {
        return provider;
    }

    public void setProvider(Provider provider) {
        this.provider = provider;
    }

    @Override
    public String toString() {
        return "TextMiningConfiguration{" + "provider='" + provider + '\'' + '}';
    }

    public enum Provider {
        FENOMINAL
    }
}
