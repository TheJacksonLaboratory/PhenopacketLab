package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.junit.jupiter.api.Test;
import org.monarchinitiative.phenopacketlab.test.PhenopacketLabStubDataConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.web.SpringJUnitWebConfig;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;


@ActiveProfiles(value = "test")
@SpringJUnitWebConfig(classes = PhenopacketLabStubDataConfig.class)
@WebMvcTest(OntologyConstantsController.class)
public class OntologyConstantsControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void severities() throws Exception {
        // TODO - implement real tests, the code below does not work
        MvcResult result = mvc.perform(MockMvcRequestBuilders.get("/api/v1/ontology/severities"))
                .andReturn();
        System.err.println(result);
        System.err.println(result.getResponse());
        System.err.println(result.getResponse().getContentAsString());
    }
}