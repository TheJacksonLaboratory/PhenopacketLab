package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.PhenotypicFeatureService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "${api.version}/phenotypic-features")
public class PhenotypicFeatureController {

    private final PhenotypicFeatureService phenotypicFeatureService;

    public PhenotypicFeatureController(PhenotypicFeatureService phenotypicFeatureService) {
        this.phenotypicFeatureService = phenotypicFeatureService;
    }

    @GetMapping("{id}")
    public ResponseEntity<IdentifiedConcept> phenotypicFeatureById(@PathVariable("id") String id) {
        TermId phenotypicFeatureId = TermId.of(id);
        return ResponseEntity.of(phenotypicFeatureService.phenotypeConceptById(phenotypicFeatureId));
    }

    @GetMapping
    public ResponseEntity<List<IdentifiedConcept>> allPhenotypicFeatures() {
        return ResponseEntity.ok(phenotypicFeatureService.allPhenotypeConcepts()
                .toList());
    }

}
