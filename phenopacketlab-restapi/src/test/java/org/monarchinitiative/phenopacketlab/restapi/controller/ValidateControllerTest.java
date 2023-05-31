package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.monarchinitiative.phenopacketlab.core.ValidateService;

import org.phenopackets.phenopackettools.validator.core.ValidationLevel;
import org.phenopackets.phenopackettools.validator.core.ValidationResult;
import org.phenopackets.phenopackettools.validator.core.ValidationResults;
import org.phenopackets.phenopackettools.validator.core.ValidatorInfo;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ValidateControllerTest {

    private static final RestResponseEntityExceptionHandler HANDLER = new RestResponseEntityExceptionHandler();

    @Mock(lenient = true)
    public ValidateService validateService;

    @InjectMocks
    public ValidateController validateController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(validateController)
                .addPlaceholderValue("api.version", "/api/v1")
                .setControllerAdvice(HANDLER)
                .build();
    }

    @Test
    public void validateSuccess() throws Exception {
        when(validateService.validate(TestData.CORRECT_PHENOPACKET))
                .thenReturn(getCorrectResult());

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/validate")
                        .contentType("text/plain")
                        .content(TestData.CORRECT_PHENOPACKET))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertThat(response.getContentAsString(), equalTo("{\"validators\":[{\"validatorId\":\"BaseValidator\",\"validatorName\":\"Base syntax validator\",\"description\":\"The base syntax validation of a phenopacket, family, or cohort\"},{\"validatorId\":\"MetaDataValidator\",\"validatorName\":\"MetaData validator\",\"description\":\"Validate that the MetaData section describes all used ontologies\"}],\"validationResults\":[]}"));
    }

    @Test
    public void validateFail() throws Exception {
        when(validateService.validate(TestData.INCORRECT_PHENOPACKET))
                .thenReturn(getIncorrectResult());

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/validate")
                .contentType("text/plain")
                .content(TestData.INCORRECT_PHENOPACKET))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertThat(response.getContentAsString(), equalTo("{\"validators\":[{\"validatorId\":\"BaseValidator\",\"validatorName\":\"Base syntax validator\",\"description\":\"The base syntax validation of a phenopacket, family, or cohort\"},{\"validatorId\":\"MetaDataValidator\",\"validatorName\":\"MetaData validator\",\"description\":\"Validate that the MetaData section describes all used ontologies\"}],\"validationResults\":[{\"validatorInfo\":{\"validatorId\":\"MetaDataValidator\",\"validatorName\":\"MetaData validator\",\"description\":\"Validate that the MetaData section describes all used ontologies\"},\"level\":\"ERROR\",\"category\":\"Ontology Not In MetaData\",\"message\":\"No ontology corresponding to ID 'OMIM:154700 ' found in MetaData\"},{\"validatorInfo\":{\"validatorId\":\"MetaDataValidator\",\"validatorName\":\"MetaData validator\",\"description\":\"Validate that the MetaData section describes all used ontologies\"},\"level\":\"ERROR\",\"category\":\"Ontology Not In MetaData\",\"message\":\"No ontology corresponding to ID 'DrugCentral:1610' found in MetaData\"},{\"validatorInfo\":{\"validatorId\":\"MetaDataValidator\",\"validatorName\":\"MetaData validator\",\"description\":\"Validate that the MetaData section describes all used ontologies\"},\"level\":\"ERROR\",\"category\":\"Ontology Not In MetaData\",\"message\":\"No ontology corresponding to ID 'NCIT:C38288' found in MetaData\"},{\"validatorInfo\":{\"validatorId\":\"MetaDataValidator\",\"validatorName\":\"MetaData validator\",\"description\":\"Validate that the MetaData section describes all used ontologies\"},\"level\":\"ERROR\",\"category\":\"Ontology Not In MetaData\",\"message\":\"No ontology corresponding to ID 'UO:0000022' found in MetaData\"},{\"validatorInfo\":{\"validatorId\":\"MetaDataValidator\",\"validatorName\":\"MetaData validator\",\"description\":\"Validate that the MetaData section describes all used ontologies\"},\"level\":\"ERROR\",\"category\":\"Ontology Not In MetaData\",\"message\":\"No ontology corresponding to ID 'NCIT:C64496' found in MetaData\"}]}"));
    }

    @Test
    public void validateBadRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/validate"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }





    private ValidationResults getCorrectResult() {
        ValidatorInfo baseValidator = ValidatorInfo.baseSyntaxValidation();
        ValidatorInfo metadataValidator = ValidatorInfo.of("MetaDataValidator", "MetaData validator", "Validate that the MetaData section describes all used ontologies");

        ValidationResults.Builder builder = ValidationResults.builder();
        builder.addResults(baseValidator, List.of());
        builder.addResults(metadataValidator, List.of()).build();
        return builder.build();
    }

    private ValidationResults getIncorrectResult() {
        ValidationResult result0 = ValidationResult.of(ValidatorInfo.of("MetaDataValidator", "MetaData validator", "Validate that the MetaData section describes all used ontologies"),
                ValidationLevel.ERROR, "Ontology Not In MetaData", "No ontology corresponding to ID 'OMIM:154700 ' found in MetaData");

        ValidationResult result1 = ValidationResult.of(ValidatorInfo.of("MetaDataValidator", "MetaData validator", "Validate that the MetaData section describes all used ontologies"),
                ValidationLevel.ERROR, "Ontology Not In MetaData", "No ontology corresponding to ID 'DrugCentral:1610' found in MetaData");

        ValidationResult result2 = ValidationResult.of(ValidatorInfo.of("MetaDataValidator", "MetaData validator", "Validate that the MetaData section describes all used ontologies"),
                ValidationLevel.ERROR, "Ontology Not In MetaData", "No ontology corresponding to ID 'NCIT:C38288' found in MetaData");
        ValidationResult result3 = ValidationResult.of(ValidatorInfo.of("MetaDataValidator", "MetaData validator", "Validate that the MetaData section describes all used ontologies"),
                ValidationLevel.ERROR, "Ontology Not In MetaData", "No ontology corresponding to ID 'UO:0000022' found in MetaData");

        ValidationResult result4 = ValidationResult.of(ValidatorInfo.of("MetaDataValidator", "MetaData validator", "Validate that the MetaData section describes all used ontologies"),
                ValidationLevel.ERROR, "Ontology Not In MetaData", "No ontology corresponding to ID 'NCIT:C64496' found in MetaData");

        ValidatorInfo baseValidator = ValidatorInfo.baseSyntaxValidation();
        ValidatorInfo metadataValidator = ValidatorInfo.of("MetaDataValidator", "MetaData validator", "Validate that the MetaData section describes all used ontologies");

        ValidationResults.Builder builder = ValidationResults.builder();
        builder.addResults(baseValidator, List.of());
        builder.addResults(metadataValidator, Arrays.asList(result0, result1, result2, result3, result4)).build();
        return builder.build();
    }
}
