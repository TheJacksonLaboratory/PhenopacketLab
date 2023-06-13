package org.monarchinitiative.phenopacketlab.core.model;

/**
 * The {@link ResourceAware} implementors are aware of a {@link Resource}. The implementors usually provide
 * {@link Concept}s or {@link IdentifiedConcept}s coming from a controlled vocabulary.
 */
public interface ResourceAware {

    Resource resource();

}
