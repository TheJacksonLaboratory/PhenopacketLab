package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.json.JSONArray;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.monarchinitiative.phenopacketlab.core.PhenopacketLabMetadataService;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertTrue;
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
    public void getResourcePrefixesForPhenopacket() throws Exception {
        when(metadataService.resourcesPrefixesForPhenopacket(TestData.INCORRECT_PHENOPACKET))
                .thenReturn(Stream.of("MONDO","HGNC","NCIT"));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/metadata")
                        .contentType("text/plain")
                        .content(TestData.INCORRECT_PHENOPACKET))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        MockHttpServletResponse response = result.getResponse();
        String actual = response.getContentAsString();
        JSONArray jsonActual = new JSONArray(actual);
        List<String> prefixes = Arrays.asList("MONDO","HGNC","NCIT");
        for (int i=0; i < jsonActual.length(); i++) {
            String resourcePrefix = jsonActual.getString(i);
            assertTrue(prefixes.contains(resourcePrefix));
        }
    }
}