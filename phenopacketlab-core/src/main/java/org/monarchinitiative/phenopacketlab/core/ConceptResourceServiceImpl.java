package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.OntologyConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;
import org.phenopackets.phenopackettools.validator.core.ValidationResult;
import org.phenopackets.phenopackettools.validator.core.ValidationResults;
import org.phenopackets.phenopackettools.validator.core.ValidationWorkflowRunner;
import org.phenopackets.phenopackettools.validator.jsonschema.JsonSchemaValidationWorkflowRunner;
import org.phenopackets.schema.v2.PhenopacketOrBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

public class ConceptResourceServiceImpl implements ConceptResourceService {

    private final OntologyConceptResource efo;
    private final OntologyConceptResource geno;
    private final OntologyConceptResource hp;
    private final OntologyConceptResource mondo;
    private final OntologyConceptResource so;
    private final OntologyConceptResource uberon;
    private final IdentifiedConceptResource hgnc;
    private final OntologyConceptResource ncit;
    private final OntologyConceptResource gsso;
    private final OntologyConceptResource eco;

    ValidationWorkflowRunner<PhenopacketOrBuilder> runner;

    public ConceptResourceServiceImpl(OntologyConceptResource efo,
                                      OntologyConceptResource geno,
                                      OntologyConceptResource hp,
                                      OntologyConceptResource mondo,
                                      OntologyConceptResource so,
                                      OntologyConceptResource uberon,
                                      IdentifiedConceptResource hgnc,
                                      OntologyConceptResource ncit,
                                      OntologyConceptResource gsso,
                                      OntologyConceptResource eco) {
        this.efo = Objects.requireNonNull(efo);
        this.geno = Objects.requireNonNull(geno);
        this.hp = Objects.requireNonNull(hp);
        this.mondo = Objects.requireNonNull(mondo);
        this.so = Objects.requireNonNull(so);
        this.uberon = Objects.requireNonNull(uberon);
        this.hgnc = Objects.requireNonNull(hgnc);
        this.ncit = Objects.requireNonNull(ncit);
        this.gsso = Objects.requireNonNull(gsso);
        this.eco = Objects.requireNonNull(eco);

        runner = JsonSchemaValidationWorkflowRunner.phenopacketBuilder().build();
    }

    @Override
    public Optional<IdentifiedConceptResource> forPrefix(String prefix) {
        return switch (prefix.toUpperCase()) {
            case "EFO" -> Optional.of(efo);
            case "GENO" -> Optional.of(geno);
            case "HP" -> Optional.of(hp);
            case "MONDO" -> Optional.of(mondo);
            case "SO" -> Optional.of(so);
            case "UBERON" -> Optional.of(uberon);
            case "HGNC" -> Optional.of(hgnc);
            case "NCIT" -> Optional.of(ncit);
            case "GSSO" -> Optional.of(gsso);
            case "ECO" -> Optional.of(eco);
            default -> Optional.empty();
        };
    }

    @Override
    public Stream<Resource> conceptResources() {
        return Stream.of(efo, geno, hp, mondo, so, uberon, hgnc, ncit, gsso, eco)
                .map(IdentifiedConceptResource::getResource);
    }

    @Override
    public Stream<IdentifiedConceptResource> conceptResourcesForPhenopacket(String phenopacketString) {
        ValidationResults results = runner.validate(phenopacketString);
        List<IdentifiedConceptResource> resourcesFound = new ArrayList<>();
        for (ValidationResult result:results.validationResults()) {
            if (result.validatorInfo().validatorId().equals("MetaDataValidator") && result.category().equals("Ontology Not In MetaData")) {
                String missingId = result.message().split("'")[1];
                if (missingId.startsWith("EFO")) {
                    if (!resourcesFound.contains(efo))
                        resourcesFound.add(efo);
                } else if (missingId.startsWith("GENO")) {
                    if (!resourcesFound.contains(geno))
                        resourcesFound.add(geno);
                } else if (missingId.startsWith("HP")) {
                    if (!resourcesFound.contains(hp))
                        resourcesFound.add(hp);
                } else if (missingId.startsWith("MONDO") || missingId.startsWith("OMIM") || missingId.startsWith("ORPHA")) {
                    if (!resourcesFound.contains(mondo))
                        resourcesFound.add(mondo);
                } else if (missingId.startsWith("SO")) {
                    if (!resourcesFound.contains(so))
                        resourcesFound.add(so);
                } else if (missingId.startsWith("UBERON")) {
                    if (!resourcesFound.contains(uberon))
                        resourcesFound.add(uberon);
                } else if (missingId.startsWith("HGNC") || missingId.startsWith("DrugCentral")) {
                    if (!resourcesFound.contains(hgnc))
                        resourcesFound.add(hgnc);
                } else if (missingId.startsWith("NCIT")) {
                    if (!resourcesFound.contains(ncit))
                        resourcesFound.add(ncit);
                } else if (missingId.startsWith("GSSO")) {
                    if (!resourcesFound.contains(gsso))
                        resourcesFound.add(gsso);
                } else if (missingId.startsWith("ECO")) {
                    if (!resourcesFound.contains(eco))
                        resourcesFound.add(eco);
                }
            }
        }
        return resourcesFound.stream();
    }
}
