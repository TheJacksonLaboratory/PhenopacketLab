package org.monarchinitiative.phenopacketlab.io;

import com.google.protobuf.Message;
import org.monarchinitiative.phenopacketlab.core.ConceptResourceService;
import org.monarchinitiative.phenopacketlab.core.PhenopacketResourceService;
import org.monarchinitiative.phenopacketlab.core.model.PrefixResource;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.phenopackets.phenopackettools.core.PhenopacketFormat;
import org.phenopackets.phenopackettools.core.PhenopacketSchemaVersion;
import org.phenopackets.phenopackettools.io.PhenopacketParser;
import org.phenopackets.phenopackettools.io.PhenopacketParserFactory;
import org.phenopackets.phenopackettools.util.message.MessageUtils;
import org.phenopackets.schema.v2.core.OntologyClass;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import java.util.List;

public class PhenopacketResourceServiceImpl implements PhenopacketResourceService {

    private static final PhenopacketSchemaVersion PHENOPACKET_SCHEMA_VERSION = PhenopacketSchemaVersion.V2;
    private static final PhenopacketFormat PHENOPACKET_FORMAT = PhenopacketFormat.JSON;

    private final ConceptResourceService conceptResourceService;
    private final PhenopacketParser parser;

    public PhenopacketResourceServiceImpl(ConceptResourceService conceptResourceService) {
        this.conceptResourceService = conceptResourceService;
        this.parser = PhenopacketParserFactory.getInstance().forFormat(PHENOPACKET_SCHEMA_VERSION);
    }

    @Override
    public List<PrefixResource> getPrefixResourcesForPhenopacketElement(String jsonMessage) throws IOException {
        Message message = decodeMessage(jsonMessage);
        // get each ontology class instance
        List<OntologyClass> ontologyClasses = MessageUtils.findInstancesOfType(message, OntologyClass.class).toList();
        // get all unique prefixes (not IDs, ie: NCIT:12345 -> NCIT)
        List<String> prefixes = ontologyClasses.stream()
                .map(ontologyClass -> ontologyClass.getId().split(":")[0])
                .distinct()
                .toList();
        // return all PrefixResource corresponding to the Prefix list
        return prefixes.stream()
                .map(prefix -> conceptResourceService.forPrefix(prefix)
                        .map(IdentifiedConceptResource::resource)
                        .map(resource -> PrefixResource.of(prefix, resource))
                        .orElse(PrefixResource.missing(prefix)))
                .toList();
    }

    private Message decodeMessage(String jsonMessage) throws IOException {
        try (ByteArrayInputStream is = new ByteArrayInputStream(jsonMessage.getBytes())) {
            return parser.parse(PHENOPACKET_FORMAT, is);
        }
    }

}
