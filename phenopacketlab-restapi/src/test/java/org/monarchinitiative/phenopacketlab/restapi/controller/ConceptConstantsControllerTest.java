package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.ConceptConstantsService;
import org.monarchinitiative.phenopacketlab.core.TaxonomyService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ConceptConstantsControllerTest {


    private static final RestResponseEntityExceptionHandler HANDLER = new RestResponseEntityExceptionHandler();

    @Mock
    public ConceptConstantsService conceptConstantsService;
    @Mock
    public TaxonomyService taxonomyService;
    @InjectMocks
    public ConceptConstantsController controller;
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller)
                .addPlaceholderValue("api.version", "/api/v1")
                .setControllerAdvice(HANDLER)
                .build();
    }

    @Test
    public void homoSapiensIsServed() throws Exception {
        IdentifiedConcept homo = IdentifiedConcept.of(
                TermId.of("NCBITaxon:9606"), "Homo sapiens", "", List.of()
        );
        when(taxonomyService.homoSapiensNCBIConcept())
                .thenReturn(Optional.of(homo));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/constants/homosapiens"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertThat(response.getContentAsString(), equalTo("""
                {"id":"NCBITaxon:9606","lbl":"Homo sapiens","def":"","syn":[]}"""));
    }
}