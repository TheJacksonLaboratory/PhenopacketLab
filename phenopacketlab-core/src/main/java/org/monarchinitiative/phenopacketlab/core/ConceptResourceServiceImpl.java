package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.OntologyConceptResource;

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
    }

    public OntologyConceptResource efo() {
        return efo;
    }

    public OntologyConceptResource geno() {
        return geno;
    }

    public OntologyConceptResource hp() {
        return hp;
    }

    public OntologyConceptResource mondo() {
        return mondo;
    }

    public OntologyConceptResource so() {
        return so;
    }

    public OntologyConceptResource uberon() {
        return uberon;
    }

    public IdentifiedConceptResource hgnc() {
        return hgnc;
    }

    public OntologyConceptResource ncit() {
        return ncit;
    }

    public OntologyConceptResource gsso() {
        return gsso;
    }

    public OntologyConceptResource eco() {
        return eco;
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
    public Stream<IdentifiedConceptResource> conceptResources() {
        return Stream.of(efo, geno, hp, mondo, so, uberon, hgnc, ncit, gsso);
    }
}
