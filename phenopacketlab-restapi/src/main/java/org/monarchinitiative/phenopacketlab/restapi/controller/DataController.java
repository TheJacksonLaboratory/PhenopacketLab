package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.phenopackets.schema.v2.Cohort;
import org.phenopackets.schema.v2.Family;
import org.phenopackets.schema.v2.Phenopacket;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "${api.version}/reports")
public class DataController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataController.class);

    @GetMapping(value = "ids", headers = "Accept=application/json")
    public List<String> getIds() {
        return List.of();
    }

    @GetMapping(value = "cohort/{id}")
    public Cohort getCohortById(@PathVariable("id") String id) {
        return Cohort.newBuilder()
                .setId("ABC")
                .build();
    }

    @PostMapping(value = "save_cohort", headers = "Accept=application/json")
    public void saveCohort(@RequestBody Map<String, Object> payload) {
        // TODO - implement

    }

    @PostMapping(value = "save_family", headers = "Accept=application/json")
    public void saveFamily(@RequestBody String fileName, Family family) {
        // TODO - implement
    }

    @PostMapping(value = "save_phenopacket", headers = "Accept=application/json")
    public void savePhenopacket(String fileName, Phenopacket phenopacket) {
        // TODO - implement
    }

}
