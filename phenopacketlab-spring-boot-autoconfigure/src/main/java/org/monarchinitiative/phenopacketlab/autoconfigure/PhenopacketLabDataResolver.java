package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.monarchinitiative.phenopacketlab.autoconfigure.exception.MissingPhenopacketLabResourceException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class PhenopacketLabDataResolver {

    private final Path phenopacketLabDataDirectory;

    public PhenopacketLabDataResolver(Path phenopacketLabDataDirectory) throws MissingPhenopacketLabResourceException {
        this.phenopacketLabDataDirectory = phenopacketLabDataDirectory;

        List<String> errors = new LinkedList<>();
        List<Path> paths = List.of(efoJsonPath(), genoJsonPath(), hgncCompleteSetPath(), hpJsonPath(), mondoJsonPath(),
                hpoAnnotationPath(), soJsonPath(), uberonJsonPath(), uoJsonPath(), ncitJsonPath(), gssoJsonPath(),
                drugCentralPath(), ecoJsonPath(), chebiJsonPath());
        for (Path path : paths) {
            if (!(Files.isRegularFile(path) && Files.isReadable(path))) {
                errors.add(path.toFile().getName());
            }
        }

        if (!errors.isEmpty()) {
            String missing = errors.stream().collect(Collectors.joining("', '", "'", "'"));
            String message = String.format("The following files are missing in the data directory: %s.", missing);
            throw new MissingPhenopacketLabResourceException(message);
        }
    }

    public Path hpJsonPath() {
        return phenopacketLabDataDirectory.resolve("hp.json");
    }

    public Path hpoAnnotationPath() {
        return phenopacketLabDataDirectory.resolve("phenotype.hpoa");
    }

    public Path hgncCompleteSetPath() {
        return phenopacketLabDataDirectory.resolve("hgnc_complete_set.txt");
    }

    public Path efoJsonPath() {
        return phenopacketLabDataDirectory.resolve("efo.json");
    }

    public Path genoJsonPath() {
        return phenopacketLabDataDirectory.resolve("geno.json");
    }

    public Path mondoJsonPath() {
        return phenopacketLabDataDirectory.resolve("mondo.json");
    }

    public Path soJsonPath() {
        return phenopacketLabDataDirectory.resolve("so.json");
    }

    public Path uberonJsonPath() {
        return phenopacketLabDataDirectory.resolve("uberon.json");
    }

    public Path uoJsonPath() {
        return phenopacketLabDataDirectory.resolve("uo.json");
    }

    public Path ncitJsonPath() {
        return phenopacketLabDataDirectory.resolve("ncit.json");
    }

    public Path gssoJsonPath() {
        return phenopacketLabDataDirectory.resolve("gsso.json");
    }

    public Path ecoJsonPath() {
        return phenopacketLabDataDirectory.resolve("eco.json");
    }

    public Path chebiJsonPath() {
        return phenopacketLabDataDirectory.resolve("chebi.json");
    }

    public Path oaeJsonPath() { return phenopacketLabDataDirectory.resolve("oae.json"); }

    public Path drugCentralPath() {
        return phenopacketLabDataDirectory.resolve("drugcentral.csv");
    }
}
