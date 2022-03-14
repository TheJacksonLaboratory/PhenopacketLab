package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.monarchinitiative.phenopacketlab.autoconfigure.exception.MissingPhenopacketLabResourceException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class PhenopacketLabDataResolver {

    private final Path phenopacketLabDataDirectory;

    public PhenopacketLabDataResolver(Path phenopacketLabDataDirectory) throws MissingPhenopacketLabResourceException {
        this.phenopacketLabDataDirectory = phenopacketLabDataDirectory;

        List<Path> paths = List.of(hpoJsonPath());
        for (Path path : paths) {
            if (!(Files.isRegularFile(path) && Files.isReadable(path))) {
                throw new MissingPhenopacketLabResourceException(String.format("The file `%s` is missing in the data directory", path.toFile().getName()));
            }
        }
    }

    public Path hpoJsonPath() {
        return phenopacketLabDataDirectory.resolve("hp.json");
    }
}
