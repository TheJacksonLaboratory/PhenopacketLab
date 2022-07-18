package org.monarchinitiative.phenopacketlab.io;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.monarchinitiative.phenol.base.PhenolRuntimeException;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.model.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class DrugCentralResourceLoader {

    private static final Logger LOGGER = LoggerFactory.getLogger(DrugCentralResourceLoader.class);

    private static final String DRUG_CENTRAL_PREFIX = "DrugCentral";

    // Pattern to match a line like:
    // `# url=https://unmtid-shinyapps.net/download/drugcentral.dump.010_05_2021.sql.gz;version=2021-10-05`
    private static final Pattern URL_VERSION_LINE = Pattern.compile("#\\s*url=(?<url>.*);version=(?<version>[\\w-]+)");

    /**
     * Read <em>DrugCentral</em> concepts from given {@link InputStream} <code>is</code> decoding by {@link StandardCharsets#UTF_8}.
     *
     * @param is input stream to read.
     * @return loaded {@link IdentifiedConceptResource}.
     * @throws IOException               in case of I/O errors.
     * @throws PhenopacketLabIOException in case the DrugCentral file is invalid.
     */
    public static IdentifiedConceptResource load(InputStream is) throws PhenopacketLabIOException, IOException {
        return load(new InputStreamReader(is, StandardCharsets.UTF_8));
    }

    /**
     * Read <em>DrugCentral</em> concepts from given {@link InputStream} <code>is</code> decoding by {@link StandardCharsets#UTF_8}.
     *
     * @param reader reader to read.
     * @return loaded {@link IdentifiedConceptResource}.
     * @throws IOException               in case of I/O errors.
     * @throws PhenopacketLabIOException in case the DrugCentral file is invalid.
     */
    public static IdentifiedConceptResource load(Reader reader) throws PhenopacketLabIOException, IOException {
        BufferedReader br = reader instanceof BufferedReader
                ? (BufferedReader) reader
                : new BufferedReader(reader);

        String urlVersionLine = br.readLine();

        Optional<DrugCentralUrlAndVersion> urlAndVersion = extractUrlAndVersion(urlVersionLine);
        if (urlAndVersion.isEmpty())
            throw new PhenopacketLabIOException("Malformed DrugCentral resource file, invalid URL and version.");


        CSVFormat format = CSVFormat.DEFAULT.builder()
                .setCommentMarker('#')
                .setHeader("id", "label", "definition")
                .setSkipHeaderRecord(true)
                .build();

        CSVParser parser = format.parse(br);

        List<IdentifiedConcept> concepts = parser.stream()
                .map(toConcept())
                .flatMap(Optional::stream)
                .collect(Collectors.toUnmodifiableList());

        return IdentifiedConceptResource.of(concepts, createDrugCentralResource(urlAndVersion.get()));
    }

    /**
     * Fallible conversion of a CSV line into {@link IdentifiedConcept}.
     */
    private static Function<CSVRecord, Optional<IdentifiedConcept>> toConcept() {
        return record -> {
            String id = record.get("id");
            String label = record.get("label");
            String definition = record.get("definition");
            TermId curie;
            try {
                curie = TermId.of(DRUG_CENTRAL_PREFIX, id);
            } catch (PhenolRuntimeException e) {
                LOGGER.warn("Skipping invalid record #{}: {}", record.getRecordNumber(), record);
                return Optional.empty();
            }

            return Optional.of(
                    IdentifiedConcept.of(
                            curie,
                            label,
                            definition.isBlank() ? null : definition,
                            List.of() // No synonyms for now.
                    )
            );
        };
    }

    private static Optional<DrugCentralUrlAndVersion> extractUrlAndVersion(String urlVersionLine) {
        Matcher matcher = URL_VERSION_LINE.matcher(urlVersionLine);
        if (matcher.matches()) {
            return Optional.of(new DrugCentralUrlAndVersion(matcher.group("url"), matcher.group("version")));
        }

        return Optional.empty();
    }


    private static Resource createDrugCentralResource(DrugCentralUrlAndVersion urlAndVersion) {
        org.phenopackets.schema.v2.core.Resource resource = org.phenopackets.schema.v2.core.Resource.newBuilder()
                .setId("drugcentral")
                .setName("DrugCentral: online drug information resource")
                .setUrl(urlAndVersion.url)
                .setVersion(urlAndVersion.version)
                .setNamespacePrefix("DrugCentral")
                .setIriPrefix("https://drugcentral.org/drugcard/")
                .build();
        return new PhenopacketResource(resource);
    }

    private static class DrugCentralUrlAndVersion {
        private final String url, version;

        private DrugCentralUrlAndVersion(String url, String version) {
            this.url = url;
            this.version = version;
        }
    }

}
