package org.monarchinitiative.phenopacketlab.core.miner;

import org.monarchinitiative.phenopacketlab.core.model.MinedConcept;
import org.monarchinitiative.phenopacketlab.core.model.MinedText;

import java.util.ArrayList;
import java.util.List;

public class TextMiningImpl implements TextMiningService {

    @Override
    public MinedText mineText(String payload) {
        List<MinedConcept> concepts = new ArrayList<>();
        // todo mine the concepts
        return new MinedText(payload, concepts);
    }

}
