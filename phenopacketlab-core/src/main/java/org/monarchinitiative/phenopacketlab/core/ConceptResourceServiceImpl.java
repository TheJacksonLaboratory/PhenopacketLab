package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.OntologyConceptResource;

import java.util.*;
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
    private final OntologyConceptResource chebi;

    public ConceptResourceServiceImpl(OntologyConceptResource efo,
                                      OntologyConceptResource geno,
                                      OntologyConceptResource hp,
                                      OntologyConceptResource mondo,
                                      OntologyConceptResource so,
                                      OntologyConceptResource uberon,
                                      IdentifiedConceptResource hgnc,
                                      OntologyConceptResource ncit,
                                      OntologyConceptResource gsso,
                                      OntologyConceptResource eco,
                                      OntologyConceptResource chebi) {
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
        this.chebi = Objects.requireNonNull(chebi);
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

    public OntologyConceptResource chebi() { return chebi; }

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
            case "CHEBI" -> Optional.of(chebi);
            default -> Optional.empty();
        };
    }

    @Override
    public Stream<IdentifiedConceptResource> conceptResources() {
        return Stream.of(efo, geno, hp, mondo, so, uberon, hgnc, ncit, gsso, eco, chebi);
    }

    @Override
    public Stream<IdentifiedConceptResource> conceptResourcesForPrefixes(List<String> prefixes) {
        List<IdentifiedConceptResource> resourcesFound = new ArrayList<>();
        for (String prefix:prefixes) {
            prefix = prefix.toUpperCase();
            if (prefix.startsWith("EFO")) {
                if (!resourcesFound.contains(efo))
                    resourcesFound.add(efo);
            } else if (prefix.startsWith("GENO")) {
                if (!resourcesFound.contains(geno))
                    resourcesFound.add(geno);
            } else if (prefix.startsWith("HP")) {
                if (!resourcesFound.contains(hp))
                    resourcesFound.add(hp);
            } else if (prefix.startsWith("MONDO")) {
                if (!resourcesFound.contains(mondo))
                    resourcesFound.add(mondo);
            }
            // TODO
//            else if (ontoClass.getId().startsWith("OMIM")) {
//                if (!resourcesFound.contains(omim))
//                    resourcesFound.add(omim);
//            } else if (ontoClass.getId().startsWith("ORPHA")) {
//                if (!resourcesFound.contains(orpha))
//                    resourcesFound.add(orpha);
//            }
            else if (prefix.startsWith("SO")) {
                if (!resourcesFound.contains(so))
                    resourcesFound.add(so);
            } else if (prefix.startsWith("UBERON")) {
                if (!resourcesFound.contains(uberon))
                    resourcesFound.add(uberon);
            } else if (prefix.startsWith("HGNC") || prefix.startsWith("DrugCentral")) {
                if (!resourcesFound.contains(hgnc))
                    resourcesFound.add(hgnc);
            } else if (prefix.startsWith("NCIT")) {
                if (!resourcesFound.contains(ncit))
                    resourcesFound.add(ncit);
            } else if (prefix.startsWith("GSSO")) {
                if (!resourcesFound.contains(gsso))
                    resourcesFound.add(gsso);
            } else if (prefix.startsWith("ECO")) {
                if (!resourcesFound.contains(eco))
                    resourcesFound.add(eco);
            } else if (prefix.startsWith("CHEBI")) {
                if (!resourcesFound.contains(chebi))
                    resourcesFound.add(chebi);
            }
        }
        return resourcesFound.stream();
    }
}
