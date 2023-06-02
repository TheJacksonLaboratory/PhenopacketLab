package org.monarchinitiative.phenopacketlab.io;

import com.google.protobuf.Message;
import org.apache.commons.io.IOUtils;

import org.monarchinitiative.phenopacketlab.core.PhenopacketLabMetadataService;
import org.phenopackets.phenopackettools.core.PhenopacketElement;
import org.phenopackets.phenopackettools.core.PhenopacketSchemaVersion;
import org.phenopackets.phenopackettools.io.PhenopacketParserFactory;
import org.phenopackets.phenopackettools.util.format.SniffException;
import org.phenopackets.phenopackettools.util.message.MessageUtils;
import org.phenopackets.phenopackettools.io.PhenopacketParser;
import org.phenopackets.schema.v2.core.OntologyClass;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.*;
import java.util.stream.Stream;

public class PhenopacketLabMetadataServiceImpl implements PhenopacketLabMetadataService {

    private final String phenopacketSchemaVersion;
    PhenopacketParser parser;

    public PhenopacketLabMetadataServiceImpl(String phenopacketSchemaVersion) {
        this.phenopacketSchemaVersion = phenopacketSchemaVersion;
        this.parser = PhenopacketParserFactory.getInstance().forFormat(PhenopacketSchemaVersion.V2);
    }

    @Override
    public String phenopacketSchemaVersion() {
        return phenopacketSchemaVersion;
    }

    @Override
    public Stream<String> resourcesPrefixesForPhenopacket(String phenopacketString) {
        InputStream targetStream = IOUtils.toInputStream(phenopacketString, Charset.defaultCharset());
        Message message;
        try {
            message = this.parser.parse(PhenopacketElement.PHENOPACKET, targetStream);
        } catch (IOException | SniffException e) {
            throw new RuntimeException(e);
        }
        Stream<OntologyClass> ontologies = MessageUtils.findInstancesOfType(message, OntologyClass.class);
        List<String> foundPrefixes = new ArrayList<>();
        ontologies.forEach(ontoClass -> {
            if (ontoClass.getId().startsWith("EFO")) {
                if (!foundPrefixes.contains("EFO"))
                    foundPrefixes.add("EFO");
            } else if (ontoClass.getId().startsWith("GENO")) {
                if (!foundPrefixes.contains("GENO"))
                    foundPrefixes.add("GENO");
            } else if (ontoClass.getId().startsWith("HP")) {
                if (!foundPrefixes.contains("HP"))
                    foundPrefixes.add("HP");
            } else if (ontoClass.getId().startsWith("MONDO")) {
                if (!foundPrefixes.contains("MONDO"))
                    foundPrefixes.add("MONDO");
            }
            // TODO
//            else if (ontoClass.getId().startsWith("OMIM")) {
//                if (!foundPrefixes.contains("OMIM"))
//                    foundPrefixes.add("OMIM");
//            } else if (ontoClass.getId().startsWith("ORPHA")) {
//                if (!foundPrefixes.contains("ORPHA"))
//                    foundPrefixes.add("ORPHA");
//            }
            else if (ontoClass.getId().startsWith("SO")) {
                if (!foundPrefixes.contains("SO"))
                    foundPrefixes.add("SO");
            } else if (ontoClass.getId().startsWith("UBERON")) {
                if (!foundPrefixes.contains("UBERON"))
                    foundPrefixes.add("UBERON");
            } else if (ontoClass.getId().startsWith("HGNC") || ontoClass.getId().startsWith("DrugCentral")) {
                if (!foundPrefixes.contains("HGNC"))
                    foundPrefixes.add("HGNC");
            } else if (ontoClass.getId().startsWith("NCIT")) {
                if (!foundPrefixes.contains("NCIT"))
                    foundPrefixes.add("NCIT");
            } else if (ontoClass.getId().startsWith("GSSO")) {
                if (!foundPrefixes.contains("GSSO"))
                    foundPrefixes.add("GSSO");
            } else if (ontoClass.getId().startsWith("ECO")) {
                if (!foundPrefixes.contains("ECO"))
                    foundPrefixes.add("ECO");
            } else if (ontoClass.getId().startsWith("CHEBI")) {
                if (!foundPrefixes.contains("CHEBI"))
                    foundPrefixes.add("CHEBI");
            }
        });
        return foundPrefixes.stream();
    }

    @Override
    public String toString() {
        return "PhenopacketLabMetadata{" +
                "phenopacketSchemaVersion='" + phenopacketSchemaVersion + '\'' +
                '}';
    }
}
