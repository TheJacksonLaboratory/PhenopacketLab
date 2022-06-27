package org.monarchinitiative.phenopacketlab.ingest.transform;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.GZIPInputStream;


/**
 * Static class for extracting <em>DrugCentral</em> concepts from SQL dump downloadable
 * from <em><u>www.drugcentral.com</u></em>.
 */
public class DrugCentralTransformer {

    private static final Logger LOGGER = LoggerFactory.getLogger(DrugCentralTransformer.class);

    /**
     * Pattern for matching the SQL statement that delimits the target table in DrugCentral SQL dump.
     */
    private static final Pattern TABLE_HEADER = Pattern.compile("^COPY\\spublic.structures");

    /**
     * Pattern for matching a line of the `public.structures` table.
     */
    private static final Pattern PUBLIC_STRUCTURES_LINE = Pattern.compile("\\d+\\s");

    private DrugCentralTransformer() {
        // non-instantiable
    }

    public static void transform(Path drugCentralSqlDumpPath, Path destinationPath, String url, String version) throws IOException {
        LOGGER.info("Extracting DrugCentral concepts from {}", drugCentralSqlDumpPath.toAbsolutePath());
        List<String> structuresLines = readPublicStructuresLines(drugCentralSqlDumpPath);
        LOGGER.info("Read {} structures lines", structuresLines.size());
        LOGGER.info("Writing the DrugCentral concepts to {}", destinationPath.toAbsolutePath());

        CSVFormat csvFormat = CSVFormat.DEFAULT.builder()
                .setCommentMarker('#')
                .setHeaderComments(String.format("url=%s;version=%s", url, version))
                .setHeader("id", "label", "definition")
                .build();
        try (BufferedWriter writer = Files.newBufferedWriter(destinationPath);
             CSVPrinter printer = csvFormat.print(writer)) {
            structuresLines.stream()
                    .map(toDrugCentralTuple())
                    .flatMap(Optional::stream)
                    .forEach(tuple -> {
                        try {
                            printer.print(tuple.id);
                            printer.print(tuple.label);
                            printer.print(tuple.definition);
                            printer.println();
                        } catch (IOException e) {
                            LOGGER.error("Error writing {}: ", tuple);
                            throw new RuntimeException(e);
                        }
                    });
        }

        LOGGER.info("Done!");
    }

    private static List<String> readPublicStructuresLines(Path drugCentralSqlDumpPath) throws IOException {
        List<String> lines = new LinkedList<>();
        try (BufferedReader reader = openReader(drugCentralSqlDumpPath)) {
            boolean inPublicStructuresTable = false;
            String line;
            while ((line = reader.readLine()) != null) {
                if (!inPublicStructuresTable) {
                    Matcher matcher = TABLE_HEADER.matcher(line);
                    if (matcher.find())
                        // We finally got to the relevant lines of the `public.structures` table!
                        inPublicStructuresTable = true;

                    continue;
                }

                Matcher matcher = PUBLIC_STRUCTURES_LINE.matcher(line);
                if (matcher.find())
                    lines.add(line);
                else
                    // We do not need the rest of the file.
                    break;
            }
        }

        return lines;
    }

    private static BufferedReader openReader(Path drugCentralSqlDumpPath) throws IOException {
        return new BufferedReader(new InputStreamReader(new GZIPInputStream(Files.newInputStream(drugCentralSqlDumpPath))));
    }

    private static Function<String, Optional<DrugCentralTuple>> toDrugCentralTuple() {
        return line -> {
            String[] column = line.split("\\t");
            if (column.length < 14) {
                LOGGER.warn("DrugCentral line did not have 13 or more columns: '{}'", line);
                return Optional.empty();
            }

            // Drug ID, e.g. 5392, as required for DrugCentral CURIE `DrugCentral:5392`.
            // The CURIE can be resolved into IRI: `https://drugcentral.org/drugcard/5392`.
            String id = column[3];

            // Label, e.g. `capmatinib`
            String label = column[9];
            // Definition, e.g. `Capmatinib is a kinase inhibitor indicated for the treatment
            // of adult patients with metastatic non-small cell lung cancer (NSCLC) whose tumors
            // have a mutation that leads to mesenchymal-epithelial transition
            // (MET) exon 14 skipping as detected by an FDA-approved test.`
            String definition = column[13];
            if ("\\N".equals(definition))
                definition = "";

            return Optional.of(new DrugCentralTuple(id, label, definition));
        };
    }

    private static class DrugCentralTuple {
        private final String id;
        private final String label;
        private final String definition;

        private DrugCentralTuple(String id, String label, String definition) {
            this.id = id;
            this.label = label;
            this.definition = definition;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            DrugCentralTuple that = (DrugCentralTuple) o;
            return Objects.equals(id, that.id) && Objects.equals(label, that.label) && Objects.equals(definition, that.definition);
        }

        @Override
        public int hashCode() {
            return Objects.hash(id, label, definition);
        }

        @Override
        public String toString() {
            return "DrugCentralTuple{" +
                    "id='" + id + '\'' +
                    ", label='" + label + '\'' +
                    ", definition='" + definition + '\'' +
                    '}';
        }
    }
}
