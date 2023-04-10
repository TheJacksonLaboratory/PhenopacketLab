package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.monarchinitiative.phenopacketlab.core.miner.TextMiningOptions;
import org.monarchinitiative.phenopacketlab.core.model.MinedText;
import org.monarchinitiative.phenopacketlab.core.miner.FenominalTextMiningService;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TextMiningControllerTest {

    private static final RestResponseEntityExceptionHandler HANDLER = new RestResponseEntityExceptionHandler();

    @Mock(lenient = true)
    public FenominalTextMiningService textMiningService;

    @InjectMocks
    public TextMiningController textMiningController;
    @InjectMocks
    public PhenotypicFeatureController hpoController;

    private MockMvc mockMvc;

    private TextMiningOptions options = TextMiningOptions.builder()
            .doFuzzyMatching(true)
            .build();

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(textMiningController, hpoController)
                .addPlaceholderValue("api.version", "/api/v1")
                .setControllerAdvice(HANDLER)
                .build();
    }

    @Test
    public void mineText() throws Exception {
        when(textMiningService.mineText("This is an example text", options))
                .thenReturn(new MinedText("This is an example text", new ArrayList<>()));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/textminer")
                        .contentType("text/plain")
                        .content("This is an example text"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertThat(response.getContentAsString(), equalTo("{\"payload\":\"This is an example text\",\"concepts\":[]}"));
    }

    @Test
    public void textMined_missingPayload() throws Exception {
        when(textMiningService.mineText(null, options))
                .thenReturn(new MinedText(null, null));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/textminer"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertThat(response.getStatus(), equalTo(HttpStatus.BAD_REQUEST.value()));
    }


}