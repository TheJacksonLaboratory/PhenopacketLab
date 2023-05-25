package org.monarchinitiative.phenopacketlab.core.model;

record SimpleResource(
        String id,
        String name,
        String url,
        String version,
        String namespacePrefix,
        String iriPrefix
) implements Resource {
    @Override
    public String getId() {
        return id;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getUrl() {
        return url;
    }

    @Override
    public String getVersion() {
        return version;
    }

    @Override
    public String getNamespacePrefix() {
        return namespacePrefix;
    }

    @Override
    public String getIriPrefix() {
        return iriPrefix;
    }
}
