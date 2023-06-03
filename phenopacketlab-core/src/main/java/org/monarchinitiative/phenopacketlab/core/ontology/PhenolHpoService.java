package org.monarchinitiative.phenopacketlab.core.ontology;

import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;

import java.util.Collection;
import java.util.Iterator;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class PhenolHpoService implements IdentifiedConceptResource {

    private static final TermId SEVERITY = TermId.of("HP:0012824");
    private static final TermId ONSET = TermId.of("HP:0003674");
    private final Ontology hpo;
    private final Resource resource;
    private final int nNonObsoleteTermCount;

    public PhenolHpoService(Ontology hpo) {
        this.hpo = hpo;
        this.resource = null;
        this.nNonObsoleteTermCount = hpo.countNonObsoleteTerms();
    }

    public PhenolHpoService(Ontology hpo, Resource resource) {
        this.hpo = Objects.requireNonNull(hpo);
        this.resource = Objects.requireNonNull(resource);
        this.nNonObsoleteTermCount = hpo.countNonObsoleteTerms();
    }

//    @Override
//    public Stream<Term> phenotypicFeatures() {
//        return hpo.getTerms().stream();
//    }
//    @Override
//    public Optional<Term> phenotypicFeatureById(TermId id) {
//        return Optional.ofNullable(hpo.getTermMap().get(id));
//    }
//    @Override
//    public Collection<Term> severities() {
//        // TODO - sort by increasing severity?
//        return hpo.subOntology(SEVERITY).getTerms().stream()
//                .filter(term -> !term.id().equals(SEVERITY))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public Collection<Term> onsets() {
//        return hpo.subOntology(ONSET).getTerms().stream()
//                .filter(term -> !term.id().equals(ONSET))
//                .collect(Collectors.toList());
//    }

    @Override
    public Resource resource() {
        return resource;
    }

    @Override
    public int size() {
        return nNonObsoleteTermCount;
    }

    @Override
    public Iterator<IdentifiedConcept> iterator() {
        return null;
    }
}
