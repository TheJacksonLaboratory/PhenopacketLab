package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.monarchinitiative.phenopacketlab.core.miner.TextMiningService;
import org.monarchinitiative.phenopacketlab.core.model.MinedText;
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
    public TextMiningService textMiningService;
    @InjectMocks
    public TextMiningController controller;
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller)
                .addPlaceholderValue("api.version", "/api/v1")
                .setControllerAdvice(HANDLER)
                .build();
    }

    @Test
    public void mineText() throws Exception {
        when(textMiningService.mineText("This is an example text", "", true))
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
        when(textMiningService.mineText(null, "", true))
                .thenReturn(new MinedText(null, null));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/textminer"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertThat(response.getStatus(), equalTo(HttpStatus.BAD_REQUEST.value()));
    }


}