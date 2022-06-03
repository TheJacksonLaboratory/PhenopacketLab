package org.monarchinitiative.phenopacketlab.io;

import org.monarchinitiative.phenopacketlab.model.Resource;

import java.util.Objects;

class PhenopacketResource implements Resource {

    private final org.phenopackets.schema.v2.core.Resource resource;

    PhenopacketResource(org.phenopackets.schema.v2.core.Resource resource) {
        this.resource = Objects.requireNonNull(resource);
    }

    @Override
    public String getId() {
        return resource.getId();
    }

    @Override
    public String getName() {
        return resource.getName();
    }

    @Override
    public String getUrl() {
        return resource.getUrl();
    }

    @Override
    public String getVersion() {
        return resource.getVersion();
    }

    @Override
    public String getNamespacePrefix() {
        return resource.getNamespacePrefix();
    }

    @Override
    public String getIriPrefix() {
        return resource.getIriPrefix();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhenopacketResource that = (PhenopacketResource) o;
        return Objects.equals(resource, that.resource);
    }

    @Override
    public int hashCode() {
        return Objects.hash(resource);
    }

    @Override
    public String toString() {
        return "PhenopacketResource{" +
                "resource=" + resource +
                '}';
    }
}
