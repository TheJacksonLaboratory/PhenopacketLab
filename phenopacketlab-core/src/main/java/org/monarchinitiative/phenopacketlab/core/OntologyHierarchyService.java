package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.stream.Stream;

/**
 * {@linkplain OntologyHierarchyService} provides parents, children, ancestors, and descendants for the member concepts.
 */
public interface OntologyHierarchyService {

    /**
     * @return get the prefix of
     */
    String prefix();

    /**
     * Get a {@linkplain Stream} with the parent terms of the {@code source} term.
     *
     * @param includeSource set to {@code true} if the {@code source} should be included in the resulting
     *                      {@linkplain Stream}
     */
    Stream<TermId> parents(TermId source, boolean includeSource);


    /**
     * Get a {@linkplain Stream} with the child terms of the {@code source} term.
     *
     * @param includeSource set to {@code true} if the {@code source} should be included in the resulting
     *                      {@linkplain Stream}
     */
    Stream<TermId> children(TermId source, boolean includeSource);

    /**
     * Get a {@linkplain Stream} with the ancestor terms of the {@code source} term.
     *
     * @param includeSource set to {@code true} if the {@code source} should be included in the resulting
     *                      {@linkplain Stream}
     */
    Stream<TermId> ancestors(TermId source, boolean includeSource);

    /**
     * Get a {@linkplain Stream} with the descendant terms of the {@code source} term.
     *
     * @param includeSource set to {@code true} if the {@code source} should be included in the resulting
     *                      {@linkplain Stream}
     */
    Stream<TermId> descendants(TermId source, boolean includeSource);

    /* ************************************************************************************************************** */

    /**
     * Get a {@linkplain Stream} with the parent terms of the {@code source} term.
     */
    default Stream<TermId> parents(TermId source) {
        return parents(source, false);
    }

    /**
     * Get a {@linkplain Stream} with the child terms of the {@code source} term.
     */
    default Stream<TermId> children(TermId source) {
        return children(source, false);
    }

    /**
     * Get a {@linkplain Stream} with the ancestor terms of the {@code source} term.
     */
    default Stream<TermId> ancestors(TermId source) {
        return ancestors(source, false);
    }

    /**
     * Get a {@linkplain Stream} with the descendant terms of the {@code source} term.
     */
    default Stream<TermId> descendants(TermId source) {
        return descendants(source, false);
    }
}
