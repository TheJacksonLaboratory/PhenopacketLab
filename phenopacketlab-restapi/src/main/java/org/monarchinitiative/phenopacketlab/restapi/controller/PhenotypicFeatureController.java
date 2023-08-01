package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.PhenotypicFeatureService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.SearchIdentifiedConcept;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class PhenotypicFeatureController {

    private final PhenotypicFeatureService phenotypicFeatureService;

    public PhenotypicFeatureController(PhenotypicFeatureService phenotypicFeatureService) {
        this.phenotypicFeatureService = phenotypicFeatureService;
    }

    @RequestMapping(value = {"${api.version}/phenotypic-features/{id}"}, method = RequestMethod.GET)
    public ResponseEntity<IdentifiedConcept> phenotypicFeatureById(@PathVariable("id") String id) {
        TermId phenotypicFeatureId = TermId.of(id);
        return ResponseEntity.of(phenotypicFeatureService.phenotypeConceptById(phenotypicFeatureId));
    }

    @RequestMapping(value = {"${api.version}/phenotypic-features/search"}, method = RequestMethod.GET)
    public ResponseEntity<SearchIdentifiedConcept> searchFeature(@RequestParam("query") String query,
                                                                 @RequestParam("max") Optional<Integer> max) {
        if (query == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        int maxResults = 10;
        if (max.isPresent()) {
            maxResults = max.get();
        }
        return ResponseEntity.ok(phenotypicFeatureService.searchPhenotypeConcepts(query, maxResults));
    }

}
