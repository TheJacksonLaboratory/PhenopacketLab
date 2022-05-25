package org.monarchinitiative.phenopacketlab.model;

import java.util.Objects;

/**
 * Container for {@link ConceptResource}s used in PhenopacketLab.
 */
public class ConceptResources {

    private final OntologyConceptResource efo;
    private final OntologyConceptResource geno;
    private final OntologyConceptResource hp;
    private final OntologyConceptResource mondo;
    private final OntologyConceptResource so;
    private final OntologyConceptResource uberon;
    private final ConceptResource hgnc;

    public ConceptResources(OntologyConceptResource efo,
                            OntologyConceptResource geno,
                            OntologyConceptResource hp,
                            OntologyConceptResource mondo,
                            OntologyConceptResource so,
                            OntologyConceptResource uberon,
                            ConceptResource hgnc) {
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

    public ConceptResource hgnc() {
        return hgnc;
    }
}
