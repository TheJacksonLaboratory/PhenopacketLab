package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.DiseaseService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DiseaseControllerTest {

    private static final RestResponseEntityExceptionHandler HANDLER = new RestResponseEntityExceptionHandler();

    @Mock
    public DiseaseService diseaseService;
    @InjectMocks
    public DiseaseController controller;
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller)
                .addPlaceholderValue("api.version", "/api/v1")
                .setControllerAdvice(HANDLER)
                .build();
    }

    @Test
    public void diseaseById() throws Exception {
        TermId diseaseId = TermId.of("OMIM:123456");
        when(diseaseService.diseaseConceptById(diseaseId))
                .thenReturn(Optional.of(createDisease(diseaseId.getValue(), "First", "Blaaaaah", List.of("A", "B"))));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/diseases/OMIM:123456"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertThat(response.getContentAsString(), equalTo("""
                {"id":"OMIM:123456","lbl":"First","def":"Blaaaaah","syn":["A","B"]}"""));
    }

    @Test
    public void diseaseById_missingDisease() throws Exception {
        TermId diseaseId = TermId.of("OMIM:123456");
        when(diseaseService.diseaseConceptById(diseaseId))
                .thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/diseases/OMIM:123456"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    public void diseaseById_InvalidId() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/diseases/INVALID"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    public void getAllDiseases() throws Exception {
        when(diseaseService.allDiseaseConcepts())
                .thenReturn(Stream.of(
                        createDisease("OMIM:123456", "First", "Something should be here", List.of("A", "B")),
                        createDisease("OMIM:987654", "Second", "Something else", List.of("C", "D"))
                ));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/diseases"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertThat(response.getContentAsString(),
                equalTo("""
                        [{"id":"OMIM:123456","lbl":"First","def":"Something should be here",""" + """
                        "syn":["A","B"]},""" + """
                        {"id":"OMIM:987654","lbl":"Second","def":"Something else",""" + """
                        "syn":["C","D"]}]"""));
    }

    private static IdentifiedConcept createDisease(String diseaseId, String diseaseName,
                                                   String definition, List<String> synonyms) {
        return IdentifiedConcept.of(TermId.of(diseaseId),
                diseaseName,
                definition,
                synonyms);
    }
}