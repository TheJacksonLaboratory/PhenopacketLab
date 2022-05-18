package org.monarchinitiative.phenopacketlab.model;

import org.monarchinitiative.phenol.ontology.data.Identified;

import java.util.List;
import java.util.Optional;

public interface Concept extends Identified {

    String name();

    Optional<String> definition();

    List<String> synonyms();

}
