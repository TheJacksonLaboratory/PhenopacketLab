package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.monarchinitiative.phenol.annotations.formats.hpo.HpoDisease;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.disease.DiseaseService;
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
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DiseaseControllerTest {

    @Mock
    public DiseaseService diseaseService;
    @InjectMocks
    public DiseaseController controller;
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller)
                .addPlaceholderValue("api.version", "/api/v1")
                .build();
    }

    @Test
    public void diseaseById() throws Exception {
        TermId diseaseId = TermId.of("OMIM:123456");
        when(diseaseService.diseaseById(diseaseId))
                .thenReturn(Optional.of(createDisease(diseaseId.getValue(), "First")));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/diseases/OMIM:123456"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertThat(response.getContentAsString(), equalTo("{\"id\":\"OMIM:123456\",\"name\":\"First\"}"));
    }

    @Test
    public void getAllDiseases() throws Exception {
        when(diseaseService.diseases())
                .thenReturn(Stream.of(
                        createDisease("OMIM:123456", "First"),
                        createDisease("OMIM:987654", "Second")
                ));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/diseases"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertThat(response.getContentAsString(), equalTo("[{\"id\":\"OMIM:123456\",\"name\":\"First\"},{\"id\":\"OMIM:987654\",\"name\":\"Second\"}]"));
    }

    private static HpoDisease createDisease(String diseaseId, String diseaseName) {
        return HpoDisease.of(TermId.of(diseaseId), diseaseName, List.of(), List.of(), List.of(), List.of(), List.of());
    }
}