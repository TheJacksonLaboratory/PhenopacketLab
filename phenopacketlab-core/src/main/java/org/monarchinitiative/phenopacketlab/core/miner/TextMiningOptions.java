package org.monarchinitiative.phenopacketlab.core.miner;

import java.util.Objects;

public class TextMiningOptions {

    private final boolean fuzzyMatching;

    public static TextMiningOptions defaultOptions() {
        return builder().build();
    }

    public static Builder builder() {
        return new Builder();
    }

    private TextMiningOptions(Builder builder) {
        this.fuzzyMatching = builder.fuzzyMatching;
    }

    public boolean isFuzzyMatching() {
        return fuzzyMatching;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TextMiningOptions options = (TextMiningOptions) o;
        return fuzzyMatching == options.fuzzyMatching;
    }

    @Override
    public int hashCode() {
        return Objects.hash(fuzzyMatching);
    }

    @Override
    public String toString() {
        return "TextMiningOptions{" +
                "fuzzyMatching=" + fuzzyMatching +
                '}';
    }

    public static class Builder {

        private boolean fuzzyMatching = true;

        private Builder() {
        }

        public Builder doFuzzyMatching(boolean value) {
            this.fuzzyMatching = value;
            return this;
        }

        public TextMiningOptions build() {
            return new TextMiningOptions(this);
        }
    }
}
