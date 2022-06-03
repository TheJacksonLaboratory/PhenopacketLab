package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.model.OntologyConceptResource;

import java.util.Objects;
import java.util.Optional;

public class ConceptResourceServiceImpl implements ConceptResourceService {

    private final OntologyConceptResource efo;
    private final OntologyConceptResource geno;
    private final OntologyConceptResource hp;
    private final OntologyConceptResource mondo;
    private final OntologyConceptResource so;
    private final OntologyConceptResource uberon;
    private final IdentifiedConceptResource hgnc;

    public ConceptResourceServiceImpl(OntologyConceptResource efo,
                                      OntologyConceptResource geno,
                                      OntologyConceptResource hp,
                                      OntologyConceptResource mondo,
                                      OntologyConceptResource so,
                                      OntologyConceptResource uberon,
                                      IdentifiedConceptResource hgnc) {
        this.efo = Objects.requireNonNull(efo);
        this.geno = Objects.requireNonNull(geno);
        this.hp = Objects.requireNonNull(hp);
        this.mondo = Objects.requireNonNull(mondo);
        this.so = Objects.requireNonNull(so);
        this.uberon = Objects.requireNonNull(uberon);
        this.hgnc = Objects.requireNonNull(hgnc);
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

    @Override
    public Optional<IdentifiedConceptResource> forPrefix(String prefix) {
        switch (prefix.toUpperCase()) {
            case "EFO":
                return Optional.of(efo);
            case "GENO":
                return Optional.of(geno);
            case "HP":
                return Optional.of(hp);
            case "MONDO":
                return Optional.of(mondo);
            case "SO":
                return Optional.of(so);
            case "UBERON":
                return Optional.of(uberon);
            case "HGNC":
                return Optional.of(hgnc);
            default:
                return Optional.empty();
        }
    }
}
