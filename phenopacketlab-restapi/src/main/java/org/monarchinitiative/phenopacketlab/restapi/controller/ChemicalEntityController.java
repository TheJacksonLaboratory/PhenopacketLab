package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.ChemicalEntityService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.SearchIdentifiedConcept;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class ChemicalEntityController {

    private final ChemicalEntityService chemicalEntityService;

    public ChemicalEntityController(ChemicalEntityService chemicalEntityService) {
        this.chemicalEntityService = chemicalEntityService;
    }

    @RequestMapping(value = {"${api.version}/chemical-entities/{id}"}, method = RequestMethod.GET)
    public ResponseEntity<IdentifiedConcept> chemicalEntityById(@PathVariable("id") String id) {
        TermId chemicalEntityId = TermId.of(id);
        return ResponseEntity.of(chemicalEntityService.chemicalEntityConceptById(chemicalEntityId));
    }

    @RequestMapping(value = {"${api.version}/chemical-entities/search"}, method = RequestMethod.GET)
    public ResponseEntity<SearchIdentifiedConcept> searchChemicalEntity(@RequestParam("query") String query,
                                                                 @RequestParam("max") Optional<Integer> max) {
        if (query == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        int maxResults = 10;
        if (max.isPresent()) {
            maxResults = max.get();
        }
        return ResponseEntity.ok(chemicalEntityService.searchChemicalEntityConcepts(query, maxResults));
    }

}
