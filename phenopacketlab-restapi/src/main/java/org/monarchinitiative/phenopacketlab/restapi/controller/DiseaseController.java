package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.monarchinitiative.phenol.annotations.formats.hpo.HpoDisease;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.disease.DiseaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "${api.version}/reports")
public class DiseaseController {

    private final DiseaseService diseaseService;

    public DiseaseController(DiseaseService diseaseService) {
        this.diseaseService = diseaseService;
    }

    // TODO - implement our own Disease entity, so that we do not pass so much unnecessary information downstream
//    public ResponseEntity<HpoDisease> diseaseById(@PathVariable("id") TermId id) {
//        return ResponseEntity.of(diseaseService.diseaseById(id));
//    }
//
//    public ResponseEntity<List<HpoDisease>>

}
