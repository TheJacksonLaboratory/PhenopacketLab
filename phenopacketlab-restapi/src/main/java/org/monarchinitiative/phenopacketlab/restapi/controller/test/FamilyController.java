package org.monarchinitiative.phenopacketlab.restapi.controller.test;

import org.monarchinitiative.phenopacketlab.restapi.util.Examples;
import org.phenopackets.schema.v2.Family;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "${api.version}/test/family")
public class FamilyController {

    @GetMapping(value = "/leigh-syndrome", headers = "Accept=application/json")
    public ResponseEntity<Family> toyLeighSyndromeTrio() {
        return ResponseEntity.ok(Examples.Families.toyLeighSyndromeTrio());

    }

}
