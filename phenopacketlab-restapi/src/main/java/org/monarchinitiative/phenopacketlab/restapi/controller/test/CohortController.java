package org.monarchinitiative.phenopacketlab.restapi.controller.test;

import org.monarchinitiative.phenopacketlab.restapi.util.Examples;
import org.phenopackets.schema.v2.Cohort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "${api.version}/test/cohort")
public class CohortController {

    @GetMapping(value = "/neurofibromatosis-cohort", headers = "Accept=application/json")
    public Cohort toyNeurofibromatosisCohort() {
        return Examples.Cohorts.toyNeurofibromatosisCohort();
    }

}
