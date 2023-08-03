package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenol.ontology.data.MinimalOntology;
import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.Objects;
import java.util.stream.Stream;

public class PhenolOntologyHierarchyService implements OntologyHierarchyService {

    private final String prefix;
    private final MinimalOntology ontology;

    public PhenolOntologyHierarchyService(String prefix, MinimalOntology ontology) {
        this.prefix = Objects.requireNonNull(prefix);
        this.ontology = Objects.requireNonNull(ontology);
    }

    @Override
    public String prefix() {
        return prefix;
    }

    @Override
    public Stream<TermId> parents(TermId source, boolean includeSource) {
        return ontology.graph()
                .getParentsStream(source, includeSource);
    }

    @Override
    public Stream<TermId> children(TermId source, boolean includeSource) {
        return ontology.graph()
                .getChildrenStream(source, includeSource);
    }

    @Override
    public Stream<TermId> ancestors(TermId source, boolean includeSource) {
        return ontology.graph()
                .getAncestorsStream(source, includeSource);
    }

    @Override
    public Stream<TermId> descendants(TermId source, boolean includeSource) {
        return ontology.graph()
                .getDescendantsStream(source, includeSource);
    }

}
