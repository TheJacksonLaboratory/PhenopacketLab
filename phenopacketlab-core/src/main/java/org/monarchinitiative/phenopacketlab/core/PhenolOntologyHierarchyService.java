package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenol.ontology.algo.OntologyAlgorithm;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.Objects;
import java.util.stream.Stream;

public class PhenolOntologyHierarchyService implements OntologyHierarchyService {

    private final String prefix;
    private final Ontology ontology;

    public PhenolOntologyHierarchyService(String prefix, Ontology ontology) {
        this.prefix = Objects.requireNonNull(prefix);
        this.ontology = Objects.requireNonNull(ontology);
    }

    @Override
    public String prefix() {
        return prefix;
    }

    @Override
    public Stream<TermId> parents(TermId source, boolean includeSource) {
        return OntologyAlgorithm.getParentTerms(ontology, source, includeSource).stream();
    }

    @Override
    public Stream<TermId> children(TermId source, boolean includeSource) {
        return OntologyAlgorithm.getChildTerms(ontology, source, includeSource).stream();
    }

    @Override
    public Stream<TermId> ancestors(TermId source, boolean includeSource) {
        return OntologyAlgorithm.getAncestorTerms(ontology, source, includeSource).stream();
    }

    @Override
    public Stream<TermId> descendants(TermId source, boolean includeSource) {
        Stream.Builder<TermId> builder = Stream.builder();
        if (includeSource)
            builder.add(source);

        OntologyAlgorithm.getDescendents(ontology, source)
                .forEach(builder);

        return builder.build();
    }

}
