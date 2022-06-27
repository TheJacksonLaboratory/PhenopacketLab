package org.monarchinitiative.phenopacketlab.ingest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.GZIPInputStream;

public class TestBase {

    public static final Path TEST_BASE = Path.of("src/test/resources/org/monarchinitiative/phenopacketlab/ingest");

    /**
     * Read the entire content of the text file into a list of lines. The file is assumed to be gzipped if the file name
     * ends with <code>.gz</code>.
     */
    public static List<String> readLines(Path source) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(openStream(source)))) {
            return reader.lines().collect(Collectors.toList());
        }
    }

    private static InputStream openStream(Path source) throws IOException {
        return source.toFile().getName().endsWith(".gz")
                ? new GZIPInputStream(Files.newInputStream(source))
                : Files.newInputStream(source);
    }

}
