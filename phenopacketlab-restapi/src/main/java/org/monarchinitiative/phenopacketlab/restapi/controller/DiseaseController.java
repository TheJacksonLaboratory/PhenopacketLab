package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.DiseaseService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class DiseaseController {

    private final DiseaseService diseaseService;

    public DiseaseController(DiseaseService diseaseService) {
        this.diseaseService = diseaseService;
    }

    @RequestMapping(value = {"${api.version}/diseases/{id}"}, method = RequestMethod.GET)
    public ResponseEntity<IdentifiedConcept> diseaseById(@PathVariable("id") String id) {
        TermId diseaseId = TermId.of(id);
        return ResponseEntity.of(diseaseService.diseaseConceptById(diseaseId));
    }

    @RequestMapping(value = {"${api.version}/diseases/search"}, method = RequestMethod.GET)
    public ResponseEntity<List<IdentifiedConcept>> searchFeature(@RequestParam("query") String query,
                                                                 @RequestParam("max") Optional<Integer> max) {
        if (query == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        int maxResults = 10;
        if (max.isPresent()) {
            maxResults = max.get();
        }
        return ResponseEntity.ok(diseaseService.searchDiseaseConcepts(query, maxResults).toList());
    }

    @RequestMapping(value = {"${api.version}/diseases/all"}, method = RequestMethod.GET)
    public ResponseEntity<List<IdentifiedConcept>> allDiseases() {
        return ResponseEntity.ok(diseaseService.allDiseaseConcepts()
                .toList());
    }

}
