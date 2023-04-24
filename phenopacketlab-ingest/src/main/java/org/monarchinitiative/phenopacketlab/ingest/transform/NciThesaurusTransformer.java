package org.monarchinitiative.phenopacketlab.ingest.transform;

import org.apache.commons.csv.*;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.zip.GZIPOutputStream;
import java.util.zip.ZipFile;

public class NciThesaurusTransformer {

    /*\
     This may be a dead end. We can use NCIT OWL file instead of flat file parsing. Evaluate..
    \*/

    private static final Charset CHARSET = StandardCharsets.UTF_8;
    private static final String[] INPUT_HEADER = {"code", "concept_iri", "parents",
            "synonyms", "definition", "display_name",
            "concept_status", "semantic_type"};

    private NciThesaurusTransformer() {
    }

    public static void transform(Path thesaurusZip, Path destinationPath, String url, String version) throws IOException {
        try (ZipFile zipFile = new ZipFile(thesaurusZip.toFile());
             CSVParser parser = openThesaurus(openReaderForZipEntry(zipFile, "Thesaurus.txt"));
             BufferedWriter writer = openWriterForOutput(destinationPath);
             CSVPrinter printer = CSVFormat.TDF.builder()
                     .setHeader("code", "name", "definition", "synonyms", "semantic_types")
                     .setCommentMarker('#')
                     .setHeaderComments(String.format("url=%s;version=%s", url, version))
                     .build()
                     .print(writer)) {

            for (CSVRecord record : parser) {
                String code = record.get(0);
                String synonyms = record.get(3);
                String definition = record.get(4);
                String semanticTypes = record.get(7);

                SynonymData label = parseSynonyms(synonyms);

                printer.print(code);
                printer.print(label.name);
                printer.print(definition);
                printer.print(String.join("|", label.synonyms));
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
    private static SynonymData parseSynonyms(String synonyms) {
        String[] tokens = synonyms.split("\\|");
        String[] syn = Arrays.copyOfRange(tokens, 1, tokens.length);
        return new SynonymData(tokens[0], syn);
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

    private static class SynonymData {
        private final String name;
        private final String[] synonyms;

        private SynonymData(String name, String[] synonyms) {
            this.name = name;
            this.synonyms = synonyms;
        }
    }

}
