package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.monarchinitiative.phenopacketlab.core.PhenopacketLabMetadataService;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class MetadataControllerTest {

    private static final RestResponseEntityExceptionHandler HANDLER = new RestResponseEntityExceptionHandler();

    @Mock
    public PhenopacketLabMetadataService metadataService;

    @InjectMocks
    public MetadataController controller;
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller)
                .addPlaceholderValue("api.version", "/api/v1")
                .setControllerAdvice(HANDLER)
                .build();
    }

    @Test
    public void getResourcePrefixesForPhenopacket_InvalidId() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/metadata"))
                        .andExpect(MockMvcResultMatchers.status().isMethodNotAllowed());
    }

    @Test
    public void getResourceForPhenopacket() throws Exception {
        when(metadataService.resourcesForPhenopacket(TestData.INCORRECT_PHENOPACKET))
                .thenReturn(Stream.of(
                        TestData.createResource("MONDO"),
                        TestData.createResource("HGNC"),
                        TestData.createResource("NCIT")
                ).map(IdentifiedConceptResource::getResource));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/metadata")
                        .contentType("text/plain")
                        .content(TestData.INCORRECT_PHENOPACKET))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        MockHttpServletResponse response = result.getResponse();
        String actual = response.getContentAsString();
        JSONArray jsonActual = new JSONArray(actual);
        Map<String, Map<String, String>> resourcesMap = expectedMissingMetadata();
        // Compare object returned with expected map for each ontology
        for (int i=0; i < jsonActual.length(); i++) {
            JSONObject object = jsonActual.getJSONObject(i);
            String resourcePrefix = (String) object.get("namespacePrefix");
            Map<String, String> resourceMap = resourcesMap.get(resourcePrefix);
            assertEquals(resourceMap.get("name"), object.get("name"));
            assertEquals(resourceMap.get("id"), object.get("id"));
            assertEquals(resourceMap.get("url"), object.get("url"));
            assertEquals(resourceMap.get("namespacePrefix"), object.get("namespacePrefix"));
            assertEquals(resourceMap.get("version"), object.get("version"));
            assertEquals(resourceMap.get("iriPrefix"), object.get("iriPrefix"));
        }
    }

    private Map<String, Map<String, String>> expectedMissingMetadata() {
        Map<String, Map<String, String>> map = new HashMap<>();

        Map<String, String> mondoMap = new HashMap<>();
        mondoMap.put("name", "MONDO Disease Ontology");
        mondoMap.put("id", "mondo");
        mondoMap.put("url", "http://purl.obolibrary.org/obo/mondo.json");
        mondoMap.put("namespacePrefix", "MONDO");
        mondoMap.put("iriPrefix", "http://purl.obolibrary.org/obo/MONDO_");
        mondoMap.put("version", "2022-12-01");
        map.put("MONDO", mondoMap);

        Map<String, String> hgncMap = new HashMap<>();
        hgncMap.put("name", "HUGO Gene Nomenclature Committee");
        hgncMap.put("id", "hgnc");
        hgncMap.put("url", "http://ftp.ebi.ac.uk/pub/databases/genenames/hgnc/tsv/hgnc_complete_set.txt");
        hgncMap.put("namespacePrefix", "HGNC");
        hgncMap.put("iriPrefix", "http://identifiers.org/hgnc/HGNC:");
        hgncMap.put("version", "HGNC_VERSION");
        map.put("HGNC", hgncMap);

        Map<String, String> ncitMap = new HashMap<>();
        ncitMap.put("name", "NCI Thesaurus");
        ncitMap.put("id", "ncit");
        ncitMap.put("url", "http://purl.obolibrary.org/obo/ncit.owl");
        ncitMap.put("namespacePrefix", "NCIT");
        ncitMap.put("iriPrefix", "http://purl.obolibrary.org/obo/NCIT_");
        ncitMap.put("version", "22.07d");
        map.put("NCIT", ncitMap);
        return map;
    }
}