package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.model.Resource;

import java.util.*;
import java.util.stream.Stream;

public class PhenopacketLabMetadata {

    private final String phenopacketSchemaVersion;
    private final Resource hpoResource;
    private final Resource efoResource;
    private final Resource genoResource;
    private final Resource mondoResource;
    private final Resource soResource;
    private final Resource uberonResource;
    private final Resource hgncResource;
    private final Resource ncitResource;
    private final Resource gssoResource;

    public PhenopacketLabMetadata(String phenopacketSchemaVersion) {
        this(phenopacketSchemaVersion, null, null, null, null, null, null, null, null, null);
    }

    public PhenopacketLabMetadata(String phenopacketSchemaVersion,
                            Resource hpoResource,
                            Resource efoResource,
                            Resource genoResource,
                            Resource mondoResource,
                            Resource soResource,
                            Resource uberonResource,
                            Resource hgncResource,
                            Resource ncitResource,
                            Resource gssoResource) {
        this.phenopacketSchemaVersion = phenopacketSchemaVersion;
        this.hpoResource = hpoResource;
        this.efoResource = efoResource;
        this.genoResource = genoResource;
        this.mondoResource = mondoResource;
        this.soResource = soResource;
        this.uberonResource = uberonResource;
        this.hgncResource = hgncResource;
        this.ncitResource = ncitResource;
        this.gssoResource = gssoResource;
    }

    public Stream<Resource> resources() {
        List<Resource> resourceList = new ArrayList<>(Arrays.asList(
                this.hpoResource,
                this.efoResource,
                this.genoResource,
                this.mondoResource,
                this.soResource,
                this.uberonResource,
                this.hgncResource,
                this.ncitResource,
                this.gssoResource));
        return resourceList.stream();
    }

    public Optional<Resource> resourceByPrefix(String prefix) {
        return switch (prefix.toUpperCase()) {
            case "HP" -> Optional.of(hpoResource);
            case "EFO" -> Optional.of(efoResource);
            case "GENO" -> Optional.of(genoResource);
            case "MONDO" -> Optional.of(mondoResource);
            case "SO" -> Optional.of(soResource);
            case "UBERON" -> Optional.of(uberonResource);
            case "HGNC" -> Optional.of(hgncResource);
            case "NCIT" -> Optional.of(ncitResource);
            case "GSSO" -> Optional.of(gssoResource);
            default -> Optional.empty();
        };
    }

    public String phenopacketSchemaVersion() {
        return phenopacketSchemaVersion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhenopacketLabMetadata that = (PhenopacketLabMetadata) o;
        return Objects.equals(phenopacketSchemaVersion, that.phenopacketSchemaVersion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(phenopacketSchemaVersion);
    }

    @Override
    public String toString() {
        return "PhenopacketLabMetadata{" +
                "phenopacketSchemaVersion='" + phenopacketSchemaVersion + '\'' +
                '}';
    }
}
