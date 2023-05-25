package org.monarchinitiative.phenopacketlab.core.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * {@link Resource} describes metadata required for sources of {@link IdentifiedConcept}s that are used in the application.
 */
@JsonSerialize(as = Resource.class)
public interface Resource {

    static Resource of(String id, String name, String url, String version, String namespacePrefix, String iriPrefix) {
        return new SimpleResource(id, name, url, version, namespacePrefix, iriPrefix);
    }

    String getId();

    String getName();

    String getUrl();

    String getVersion();

    String getNamespacePrefix();

    String getIriPrefix();

}
