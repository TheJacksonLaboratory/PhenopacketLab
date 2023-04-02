package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.OntologyConceptResource;

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
    private final OntologyConceptResource ncit;
    private final OntologyConceptResource gsso;

    public ConceptResourceServiceImpl(OntologyConceptResource efo,
                                      OntologyConceptResource geno,
                                      OntologyConceptResource hp,
                                      OntologyConceptResource mondo,
                                      OntologyConceptResource so,
                                      OntologyConceptResource uberon,
                                      IdentifiedConceptResource hgnc,
                                      OntologyConceptResource ncit,
                                      OntologyConceptResource gsso) {
        this.efo = Objects.requireNonNull(efo);
        this.geno = Objects.requireNonNull(geno);
        this.hp = Objects.requireNonNull(hp);
        this.mondo = Objects.requireNonNull(mondo);
        this.so = Objects.requireNonNull(so);
        this.uberon = Objects.requireNonNull(uberon);
        this.hgnc = Objects.requireNonNull(hgnc);
        this.ncit = Objects.requireNonNull(ncit);
        this.gsso = Objects.requireNonNull(gsso);
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
            case "NCIT":
                return Optional.of(ncit);
            case "GSSO":
                return Optional.of(gsso);
            default:
                return Optional.empty();
        }
    }
}
