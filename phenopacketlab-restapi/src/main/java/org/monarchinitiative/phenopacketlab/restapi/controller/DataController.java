package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.phenopackets.schema.v2.Cohort;
import org.phenopackets.schema.v2.Family;
import org.phenopackets.schema.v2.Phenopacket;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "${api.version}/reports")
public class DataController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataController.class);

    @GetMapping(value = "ids", headers = "Accept=application/json")
    public ResponseEntity<List<String>> getIds() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body(List.of());
    }

    @GetMapping(value = "cohort/{id}")
    public ResponseEntity<Cohort> getCohortById(@PathVariable("id") String id) {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body(Cohort.getDefaultInstance());
    }

    @PostMapping(value = "save_cohort", headers = "Accept=application/json")
    public ResponseEntity<?> saveCohort(@RequestBody Map<String, Object> payload) {
        return new ResponseEntity<>("Method not yet implemented.", HttpStatus.NOT_IMPLEMENTED);

    }

    @PostMapping(value = "save_family", headers = "Accept=application/json")
    public ResponseEntity<?> saveFamily(@RequestBody String fileName, Family family) {
        return new ResponseEntity<>("Method not yet implemented.", HttpStatus.NOT_IMPLEMENTED);
    }

    @PostMapping(value = "save_phenopacket", headers = "Accept=application/json")
    public ResponseEntity<?> savePhenopacket(String fileName, Phenopacket phenopacket) {
        return new ResponseEntity<>("Method not yet implemented.", HttpStatus.NOT_IMPLEMENTED);
    }

}
