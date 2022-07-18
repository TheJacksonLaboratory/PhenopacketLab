package org.monarchinitiative.phenopacketlab.model;

/**
 * {@link Resource} describes metadata required for sources of {@link IdentifiedConcept}s that are used in the application.
 */
public interface Resource {

    String getId();

    String getName();

    String getUrl();

    String getVersion();

    String getNamespacePrefix();

    String getIriPrefix();

}
