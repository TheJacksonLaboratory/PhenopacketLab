package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.ChemicalEntityService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConcept;
import org.monarchinitiative.phenopacketlab.core.model.SearchIdentifiedConcept;
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
public class ChemicalEntityControllerTest {

    private static final RestResponseEntityExceptionHandler HANDLER = new RestResponseEntityExceptionHandler();

    @Mock
    public ChemicalEntityService chemicalEntityService;
    @InjectMocks
    public ChemicalEntityController controller;
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller)
                .addPlaceholderValue("api.version", "/api/v1")
                .setControllerAdvice(HANDLER)
                .build();
    }

    @Test
    public void chemicalEntityById() throws Exception {
        TermId diseaseId = TermId.of("CHEBI:123456");
        when(chemicalEntityService.chemicalEntityConceptById(diseaseId))
                .thenReturn(Optional.of(createChemicalEntity(diseaseId.getValue(), "First", "Blaaaaah", List.of("A", "B"))));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/chemical-entities/CHEBI:123456"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertThat(response.getContentAsString(), equalTo("""
                {"id":"CHEBI:123456","lbl":"First","def":"Blaaaaah","syn":["A","B"]}"""));
    }

    @Test
    public void chemicalEntityById_missingChemicalEntity() throws Exception {
        TermId diseaseId = TermId.of("CHEBI:123456");
        when(chemicalEntityService.chemicalEntityConceptById(diseaseId))
                .thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/chemical-entities/CHEBI:123456"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    public void chemicalEntityById_InvalidId() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/chemical-entities/INVALID"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    public void getSearchChemicalEntities() throws Exception {
        when(chemicalEntityService.searchChemicalEntityConcepts("first", 10))
                .thenReturn(new SearchIdentifiedConcept(1, Stream.of(
                        createChemicalEntity("CHEBI:123456", "First", "Something should be here", List.of("A", "B"))
                ).toList()));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/chemical-entities/search?query=first"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertThat(response.getContentAsString(), equalTo("""
                        {"numberOfTerms":1,"foundConcepts":[{"id":"CHEBI:123456","lbl":"First","def":"Something should be here","syn":["A","B"]}]}"""));
    }

    private static IdentifiedConcept createChemicalEntity(String chemicalEntityId, String chemicalEntityName,
                                                   String definition, List<String> synonyms) {
        return IdentifiedConcept.of(TermId.of(chemicalEntityId),
                chemicalEntityName,
                definition,
                synonyms);
    }
}