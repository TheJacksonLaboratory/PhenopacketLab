package org.monarchinitiative.phenopacketlab.io;

import org.monarchinitiative.phenopacketlab.core.miner.TextMiningService;
import org.monarchinitiative.phenopacketlab.core.model.MinedConcept;
import org.monarchinitiative.phenopacketlab.core.model.MinedText;

import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.io.OntologyLoader;
import org.monarchinitiative.fenominal.core.TermMiner;
import org.monarchinitiative.fenominal.model.MinedTerm;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class FenominalTextMiningService implements TextMiningService {


    @Override
    public MinedText mineText(String payload, String dataPath, boolean doExactMatching) {
        List<MinedConcept> concepts = new ArrayList<>();
        // Use Fenominal to find concepts
        Ontology ontology = OntologyLoader.loadOntology(new File(dataPath));
        TermMiner miner;
        if (doExactMatching) {
            miner = TermMiner.defaultNonFuzzyMapper(ontology);
        } else {
            miner = TermMiner.defaultFuzzyMapper(ontology);
        }
        Collection<MinedTerm> terms = miner.mineTerms(payload);
        terms.forEach(term -> concepts.add(new MinedConcept(term.getTermIdAsString(), "",
                term.getBegin(), term.getEnd(), term.isPresent())));

        return new MinedText(payload, concepts);
    }
}
