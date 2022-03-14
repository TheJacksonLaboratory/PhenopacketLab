package org.monarchinitiative.phenopacketlab.restapi.controller;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;
import org.phenopackets.schema.v2.Cohort;
import org.phenopackets.schema.v2.Family;
import org.phenopackets.schema.v2.core.MetaData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "${api.version}/test")
public class TestController {

    private static final JsonFormat.Printer JSON = JsonFormat.printer();

    @GetMapping(value = "/family", headers = "Accept=application/json")
    public String getTestFamily() throws InvalidProtocolBufferException {
        Family family = Family.newBuilder()
                .setId("FAMILY")
                .build();

        return JSON.print(family);
    }

    @GetMapping(value = "/cohort", headers = "Accept=application/json")
    public String getTestCohort() throws InvalidProtocolBufferException {
        Cohort cohort = Cohort.newBuilder()
                .setId("COHORT")
                .setMetaData(MetaData.newBuilder()
                        .setCreatedBy("Mr. D")
                        .build())
                .build();

        return JSON.print(cohort);
    }

}
