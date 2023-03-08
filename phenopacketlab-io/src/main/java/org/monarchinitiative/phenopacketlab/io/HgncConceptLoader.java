package org.monarchinitiative.phenopacketlab.io;

import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

public class HgncConceptLoader {

    private static final Logger LOGGER = LoggerFactory.getLogger(HgncConceptLoader.class);


    /**
     * Read HGNC concepts from given {@link InputStream} <code>is</code> decoding by {@link StandardCharsets#UTF_8}.
     *
     * @param is input stream to read.
     * @return loaded {@link IdentifiedConceptResource}.
     */
    public static IdentifiedConceptResource load(InputStream is, String version) {
        return load(new InputStreamReader(is, StandardCharsets.UTF_8), version);
    }

    public static IdentifiedConceptResource load(Reader reader, String version) {
        BufferedReader br = reader instanceof BufferedReader
                ? (BufferedReader) reader
                : new BufferedReader(reader);

        List<IdentifiedConcept> concepts = br.lines()
                .skip(1) // header
                .map(toConcept())
                .flatMap(Optional::stream)
                .toList();

        return IdentifiedConceptResource.of(concepts, createHgncResource(version));
    }

    private static Resource createHgncResource(String version) {
        org.phenopackets.schema.v2.core.Resource resource = org.phenopackets.schema.v2.core.Resource.newBuilder()
                .setId("hgnc")
                .setName("HUGO Gene Nomenclature Committee")
                .setUrl("http://ftp.ebi.ac.uk/pub/databases/genenames/hgnc/tsv/hgnc_complete_set.txt")
                .setVersion(version)
                .setNamespacePrefix("HGNC")
                .setIriPrefix("http://identifiers.org/hgnc/HGNC:")
                .build();
        return new PhenopacketResource(resource);
    }

    private static Function<String, Optional<IdentifiedConcept>> toConcept() {
        return line -> {
            String[] token = line.split("\t", 53);
            // 0 - HGNC ID
            String id = token[0];
            if (id.isBlank()) {
                LOGGER.debug("Skipping line with missing HGNC ID '{}'", line);
                return Optional.empty();
            }
            TermId tid = TermId.of(id);

            // 1 - HGVS symbol
            String symbol = token[1];

            // 2 - Name
            String name = token[2];

            // 3 - Synonyms
            String synonyms = token[9];
            List<String> synonymsList = synonyms.isBlank() ? List.of() : Arrays.asList(synonyms.split("\\|"));

            return Optional.of(IdentifiedConcept.of(tid, symbol, name, synonymsList));
        };
    }

    private HgncConceptLoader() {
    }



}
