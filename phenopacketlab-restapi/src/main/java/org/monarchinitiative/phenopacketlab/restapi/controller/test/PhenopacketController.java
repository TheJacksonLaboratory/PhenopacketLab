package org.monarchinitiative.phenopacketlab.restapi.controller.test;

import org.monarchinitiative.phenopacketlab.restapi.util.Examples;
import org.phenopackets.schema.v2.Phenopacket;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "${api.version}/test/phenopacket")
public class PhenopacketController {

    @GetMapping(value = "/aml", headers = "Accept=application/json")
    public Phenopacket aml() {
        return Examples.Phenopackets.acuteMyeloidLeukemia();
    }

    @GetMapping(value = "/bethlem-myopathy", headers = "Accept=application/json")
    public Phenopacket bethlemMyopathy() {
        return Examples.Phenopackets.bethlemMyopathy();
    }

    @GetMapping(value = "/covid", headers = "Accept=application/json")
    public Phenopacket covid() {
        return Examples.Phenopackets.covid();
    }

    @GetMapping(value = "/marfan", headers = "Accept=application/json")
    public Phenopacket marfan() {
        return Examples.Phenopackets.marfan();
    }

    @GetMapping(value = "/squamous-cell-esophageal-carcinoma", headers = "Accept=application/json")
    public Phenopacket squamousCellEsophagealCarcinoma() {
        return Examples.Phenopackets.squamousCellEsophagealCarcinoma();
    }

    @GetMapping(value = "/thrombocytopenia2", headers = "Accept=application/json")
    public Phenopacket thrombocytopenia2() {
        return Examples.Phenopackets.thrombocytopenia2();
    }

    @GetMapping(value = "/urothelialCancer", headers = "Accept=application/json")
    public Phenopacket urothelialCancer() {
        return Examples.Phenopackets.urothelialCancer();
    }

}
