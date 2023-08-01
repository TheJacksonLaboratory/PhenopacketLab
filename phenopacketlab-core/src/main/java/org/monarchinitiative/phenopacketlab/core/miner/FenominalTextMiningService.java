package org.monarchinitiative.phenopacketlab.core.miner;

import org.monarchinitiative.fenominal.core.TermMiner;
import org.monarchinitiative.fenominal.model.MinedTerm;
import org.monarchinitiative.phenol.base.PhenolRuntimeException;
import org.monarchinitiative.phenol.ontology.data.MinimalOntology;
import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.model.MinedConcept;
import org.monarchinitiative.phenopacketlab.core.model.MinedText;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

public class FenominalTextMiningService implements TextMiningService {

    private static final Logger LOGGER = LoggerFactory.getLogger(FenominalTextMiningService.class);

    private final MinimalOntology hpo;
    private final TermMiner fuzzy, nonFuzzy;

    public FenominalTextMiningService(MinimalOntology hpo) {
        this.hpo = Objects.requireNonNull(hpo);
        this.fuzzy = TermMiner.defaultFuzzyMapper(hpo);
        this.nonFuzzy = TermMiner.defaultNonFuzzyMapper(hpo);
    }

    @Override
    public MinedText mineText(String payload, TextMiningOptions options) {
        Collection<MinedTerm> terms = options.isFuzzyMatching()
                ? fuzzy.mineTerms(payload)
                : nonFuzzy.mineTerms(payload);

        List<MinedConcept> concepts = terms.stream()
                .flatMap(this::toMinedConcept)
                .toList();

        return new MinedText(payload, concepts);
    }

    private Stream<MinedConcept> toMinedConcept(MinedTerm term) {
        try {
            TermId termId = TermId.of(term.getTermIdAsString());
            Optional<MinedConcept> concept = hpo.termForTermId(termId)
                    .map(Term::getName)
                    .map(label -> new MinedConcept(
                            term.getTermIdAsString(),
                            label,
                            term.getBegin(), term.getEnd(), term.isPresent()));
            if (concept.isPresent())
                return Stream.of(concept.get());
            else
                LOGGER.warn("{} was not found in HPO version {}", termId.getValue(), hpo.version().orElse("UNKNOWN"));
        } catch (PhenolRuntimeException e) {
            LOGGER.warn("Invalid mined term ID: {}", term.getTermIdAsString());
            LOGGER.debug("{}", e.getMessage(), e);
        }
        return Stream.empty();
    }
}
