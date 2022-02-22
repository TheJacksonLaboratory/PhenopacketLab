package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenopacketlab.core.ontology.HpoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

// @CrossOrigin // TODO - do we need this here?
@RestController
@RequestMapping(value = "${api.version}/ontology")
public class OntologyConstantsController {

    private final HpoService ontologyService;

    public OntologyConstantsController(HpoService hpoService) {
        this.ontologyService = hpoService;
    }

    @GetMapping(value = "severities", headers = "Accept=application/json")
    public List<Term> getSeverityValues() {
        return new ArrayList<>(ontologyService.severities());
    }

    @GetMapping(value = "onsets", headers = "Accept=application/json")
    public List<Term> getOnsetValues() {
        return new ArrayList<>(ontologyService.onsets());
    }

}
