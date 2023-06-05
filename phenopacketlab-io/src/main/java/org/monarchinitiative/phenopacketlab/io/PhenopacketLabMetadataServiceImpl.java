package org.monarchinitiative.phenopacketlab.io;

import com.google.protobuf.Message;
import org.apache.commons.io.IOUtils;

import org.monarchinitiative.phenopacketlab.core.ConceptResourceService;
import org.monarchinitiative.phenopacketlab.core.PhenopacketLabMetadataService;
import org.monarchinitiative.phenopacketlab.core.model.Resource;
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

    ConceptResourceService resourceService;

    public PhenopacketLabMetadataServiceImpl(String phenopacketSchemaVersion, ConceptResourceService resourceService) {
        this.phenopacketSchemaVersion = phenopacketSchemaVersion;
        this.parser = PhenopacketParserFactory.getInstance().forFormat(PhenopacketSchemaVersion.V2);
        this.resourceService = resourceService;
    }

    @Override
    public String phenopacketSchemaVersion() {
        return phenopacketSchemaVersion;
    }

    @Override
    public Stream<Resource> resourcesForPhenopacket(String phenopacketString) {
        List<Resource> resourcesFound = new ArrayList<>();

        InputStream targetStream = IOUtils.toInputStream(phenopacketString, Charset.defaultCharset());
        Message message;
        try {
            message = this.parser.parse(PhenopacketElement.PHENOPACKET, targetStream);
        } catch (IOException | SniffException e) {
            throw new RuntimeException(e);
        }
        Stream<OntologyClass> ontologies = MessageUtils.findInstancesOfType(message, OntologyClass.class);
        ontologies.forEach(ontoClass -> {
            if (ontoClass.getId().startsWith("EFO")) {
                Resource res = resourceService.forPrefix("EFO").get().getResource();
                if (!resourcesFound.contains(res))
                    resourcesFound.add(res);
            } else if (ontoClass.getId().startsWith("GENO")) {
                Resource res = resourceService.forPrefix("GENO").get().getResource();
                if (!resourcesFound.contains(res))
                    resourcesFound.add(res);
            } else if (ontoClass.getId().startsWith("HP")) {
                Resource res = resourceService.forPrefix("HP").get().getResource();
                if (!resourcesFound.contains(res))
                    resourcesFound.add(res);
            } else if (ontoClass.getId().startsWith("MONDO")) {
                Resource res = resourceService.forPrefix("MONDO").get().getResource();
                if (!resourcesFound.contains(res))
                    resourcesFound.add(res);
            }
            // TODO
//            else if (ontoClass.getId().startsWith("OMIM")) {
//            Resource res = resourceService.forPrefix("OMIM").get().getResource();
//                if (!resourcesFound.contains(res))
//                    resourcesFound.add(res);
//            } else if (ontoClass.getId().startsWith("ORPHA")) {
//            Resource res = resourceService.forPrefix("ORPHA").get().getResource();
//                if (!resourcesFound.contains(res))
//                    resourcesFound.add(res);
//            }
            else if (ontoClass.getId().startsWith("SO")) {
                Resource res = resourceService.forPrefix("SO").get().getResource();
                if (!resourcesFound.contains(res))
                    resourcesFound.add(res);
            } else if (ontoClass.getId().startsWith("UBERON")) {
                Resource res = resourceService.forPrefix("UBERON").get().getResource();
                if (!resourcesFound.contains(res))
                    resourcesFound.add(res);
            } else if (ontoClass.getId().startsWith("HGNC") || ontoClass.getId().startsWith("DrugCentral")) {
                Resource res = resourceService.forPrefix("HGNC").get().getResource();
                if (!resourcesFound.contains(res))
                    resourcesFound.add(res);
            } else if (ontoClass.getId().startsWith("NCIT")) {
                Resource res = resourceService.forPrefix("NCIT").get().getResource();
                if (!resourcesFound.contains(res))
                    resourcesFound.add(res);
            } else if (ontoClass.getId().startsWith("GSSO")) {
                Resource res = resourceService.forPrefix("GSSO").get().getResource();
                if (!resourcesFound.contains(res))
                    resourcesFound.add(res);
            } else if (ontoClass.getId().startsWith("ECO")) {
                Resource res = resourceService.forPrefix("ECO").get().getResource();
                if (!resourcesFound.contains(res))
                    resourcesFound.add(res);
            } else if (ontoClass.getId().startsWith("CHEBI")) {
                Resource res = resourceService.forPrefix("CHEBI").get().getResource();
                if (!resourcesFound.contains(res))
                    resourcesFound.add(res);
            }
        });
        return resourcesFound.stream();
    }

    @Override
    public String toString() {
        return "PhenopacketLabMetadata{" +
                "phenopacketSchemaVersion='" + phenopacketSchemaVersion + '\'' +
                '}';
    }
}
