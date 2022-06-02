package org.monarchinitiative.phenopacketlab.ingest.transform;

import org.apache.commons.csv.*;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.zip.GZIPOutputStream;
import java.util.zip.ZipFile;

public class NciThesaurusTransformer {

    private static final Charset CHARSET = StandardCharsets.UTF_8;
    private static final String[] INPUT_HEADER = {"code", "concept_iri", "parents",
            "synonyms", "definition", "display_name",
            "concept_status", "semantic_type"};

    private NciThesaurusTransformer() {
    }

    public static void transform(Path thesaurusZip, Path destinationPath) throws IOException {
        String format = "04.D";

        try (ZipFile zipFile = new ZipFile(thesaurusZip.toFile());
             CSVParser parser = openThesaurus(openReaderForZipEntry(zipFile, "Thesaurus.txt"));
             BufferedWriter writer = openWriterForOutput(destinationPath);
             CSVPrinter printer = CSVFormat.DEFAULT.builder()
                     .setHeader("code", "label", "definition")
                     .setCommentMarker('#')
                     .setHeaderComments(String.format("version: %s", format))
                     .build()
                     .print(writer)) {

            for (CSVRecord record : parser) {
                String code = record.get(0);
                String synonyms = record.get(3);
                String definition = record.get(4);
                String semanticTypes = record.get(7);

                String label = parseLabel(synonyms);

                printer.print(code);
                printer.print(label);
                printer.print(definition);
                printer.print(semanticTypes);
                printer.println();
            }
        }
    }

    /**
     * Based on the <a href="https://evs.nci.nih.gov/ftp1/NCI_Thesaurus/ReadMe.txt">README</a>, the label is the first
     * of the synonyms. The synonyms are delimited by the pipe (<code>|</code>) character.
     * <p>
     * As of version <em>22.04</em>, there are no rows with empty synonym column.
     *
     * @param synonyms string with synonyms.
     * @return label string.
     */
    private static String parseLabel(String synonyms) {
        String[] tokens = synonyms.split("\\|");
        return tokens[0];
    }

    private static BufferedWriter openWriterForOutput(Path destinationPath) throws IOException {
        return new BufferedWriter(new OutputStreamWriter(new GZIPOutputStream(Files.newOutputStream(destinationPath)), CHARSET));
    }

    private static CSVParser openThesaurus(BufferedReader reader) throws IOException {
        return CSVFormat.TDF.builder()
                .setHeader(INPUT_HEADER)
                // otherwise we can get an error `invalid char between encapsulated token and delimiter`
                .setQuote(null)
                .build().parse(reader);
    }

    private static BufferedReader openReaderForZipEntry(ZipFile zipFile, String zipEntryName) throws IOException {
        return new BufferedReader(new InputStreamReader(zipFile.getInputStream(zipFile.getEntry(zipEntryName)), CHARSET));
    }

}
