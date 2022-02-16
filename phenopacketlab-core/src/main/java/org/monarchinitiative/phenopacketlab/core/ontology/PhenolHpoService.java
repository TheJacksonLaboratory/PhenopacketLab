package org.monarchinitiative.phenopacketlab.core.ontology;

import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.Collection;
import java.util.stream.Collectors;

public class PhenolHpoService implements HpoService {

    private static final TermId SEVERITY = TermId.of("HP:0012824");
    private static final TermId ONSET = TermId.of("HP:0003674");
    private final Ontology hpo;

    public PhenolHpoService(Ontology hpo) {
        this.hpo = hpo;
    }

    @Override
    public Collection<Term> severities() {
        // TODO - sort by increasing severity?
        return hpo.subOntology(SEVERITY).getTerms().stream()
                .filter(term -> !term.id().equals(SEVERITY))
                .collect(Collectors.toList());
    }

    @Override
    public Collection<Term> onsets() {
        return hpo.subOntology(ONSET).getTerms().stream()
                .filter(term -> !term.id().equals(ONSET))
                .collect(Collectors.toList());
    }
}
