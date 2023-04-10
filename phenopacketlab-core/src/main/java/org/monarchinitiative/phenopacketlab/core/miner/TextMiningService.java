package org.monarchinitiative.phenopacketlab.core.miner;

import org.monarchinitiative.phenopacketlab.core.model.MinedText;

public interface TextMiningService {

    MinedText mineText(String payload, TextMiningOptions options);

    // REMOVE(v0.1)
    @Deprecated(forRemoval = true)
    default MinedText mineText(String payload) {
        return mineText(payload, TextMiningOptions.defaultOptions());
    }

}
