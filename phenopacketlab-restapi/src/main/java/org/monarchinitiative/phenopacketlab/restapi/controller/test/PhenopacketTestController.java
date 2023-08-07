package org.monarchinitiative.phenopacketlab.restapi.controller.test;

import org.monarchinitiative.phenopacketlab.restapi.util.Examples;
import org.phenopackets.schema.v2.Phenopacket;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "${api.version}/test/phenopacket")
public class PhenopacketTestController {

    @GetMapping(value = "/aml", headers = "Accept=application/json")
    public ResponseEntity<Phenopacket> aml() {
        return ResponseEntity.ok(Examples.Phenopackets.acuteMyeloidLeukemia());
    }

    @GetMapping(value = "/bethlem-myopathy", headers = "Accept=application/json")
    public ResponseEntity<Phenopacket> bethlemMyopathy() {
        return ResponseEntity.ok(Examples.Phenopackets.bethlemMyopathy());
    }

    @GetMapping(value = "/covid", headers = "Accept=application/json")
    public ResponseEntity<Phenopacket> covid() {
        return ResponseEntity.ok(Examples.Phenopackets.covid());
    }

    @GetMapping(value = "/marfan", headers = "Accept=application/json")
    public ResponseEntity<Phenopacket> marfan() {
        return ResponseEntity.ok(Examples.Phenopackets.marfan());
    }

    @GetMapping(value = "/squamous-cell-esophageal-carcinoma", headers = "Accept=application/json")
    public ResponseEntity<Phenopacket> squamousCellEsophagealCarcinoma() {
        return ResponseEntity.ok(Examples.Phenopackets.squamousCellEsophagealCarcinoma());
    }

    @GetMapping(value = "/thrombocytopenia2", headers = "Accept=application/json")
    public ResponseEntity<Phenopacket> thrombocytopenia2() {
        return ResponseEntity.ok(Examples.Phenopackets.thrombocytopenia2());
    }

    @GetMapping(value = "/urothelialCancer", headers = "Accept=application/json")
    public ResponseEntity<Phenopacket> urothelialCancer() {
        return ResponseEntity.ok(Examples.Phenopackets.urothelialCancer());
    }

}
