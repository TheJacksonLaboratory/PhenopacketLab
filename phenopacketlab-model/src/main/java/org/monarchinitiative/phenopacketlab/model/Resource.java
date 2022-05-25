package org.monarchinitiative.phenopacketlab.model;

public interface Resource {

    String id();

    String name();

    String url();

    String version();

    String namespacePrefix();

    String iriPrefix();

}
