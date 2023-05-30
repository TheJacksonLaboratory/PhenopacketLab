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
import java.util.Optional;

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
        when(validateService.validate(CORRECT_PHENOPACKET))
                .thenReturn(Optional.of(getCorrectResult()));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/validate")
                        .contentType("text/plain")
                        .content(CORRECT_PHENOPACKET))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertThat(response.getContentAsString(), equalTo("{\"validators\":[],\"validationResults\":[]}"));
    }

    @Test
    public void validateFail() throws Exception {
        when(validateService.validate(INCORRECT_PHENOPACKET))
                .thenReturn(Optional.of(getIncorrectResult()));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/validate")
                .contentType("text/plain")
                .content(INCORRECT_PHENOPACKET))
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

    private final static String CORRECT_PHENOPACKET =
            """
                    {
                      "id": "arbitrary.id",
                      "subject": {
                        "id": "proband A",
                        "timeAtLastEncounter": {
                          "age": {
                            "iso8601duration": "P38Y"
                          }
                        },
                        "sex": "MALE"
                      },
                      "biosamples": [{
                        "id": "biosample 1",
                        "individualId": "proband A",
                        "sampledTissue": {
                          "id": "NCIT:C12389",
                          "label": "Esophagus"
                        },
                        "timeOfCollection": {
                          "age": {
                            "iso8601duration": "P49Y2M"
                          }
                        },
                        "tumorProgression": {
                          "id": "NCIT:C4813",
                          "label": "Recurrent Malignant Neoplasm"
                        },
                        "procedure": {
                          "code": {
                            "id": "NCIT:C15189",
                            "label": "Biopsy"
                          }
                        }
                      }, {
                        "id": "biosample 2",
                        "individualId": "proband A",
                        "sampledTissue": {
                          "id": "NCIT:C139196",
                          "label": "Esophageal Lymph Node"
                        },
                        "timeOfCollection": {
                          "age": {
                            "iso8601duration": "P48Y3M"
                          }
                        },
                        "histologicalDiagnosis": {
                          "id": "NCIT:C4024",
                          "label": "Esophageal Squamous Cell Carcinoma"
                        },
                        "tumorProgression": {
                          "id": "NCIT:C84509",
                          "label": "Primary Malignant Neoplasm"
                        },
                        "diagnosticMarkers": [{
                          "id": "NCIT:C131711",
                          "label": "Human Papillomavirus-18 Positive"
                        }],
                        "procedure": {
                          "code": {
                            "id": "NCIT:C15189",
                            "label": "Biopsy"
                          }
                        }
                      }, {
                        "id": "biosample 3",
                        "individualId": "proband A",
                        "sampledTissue": {
                          "id": "NCIT:C12468",
                          "label": "Lung"
                        },
                        "timeOfCollection": {
                          "age": {
                            "iso8601duration": "P50Y7M"
                          }
                        },
                        "tumorProgression": {
                          "id": "NCIT:C3261",
                          "label": "Metastatic Neoplasm"
                        },
                        "procedure": {
                          "code": {
                            "id": "NCIT:C15189",
                            "label": "Biopsy"
                          }
                        }
                      }],
                      "diseases": [{
                        "term": {
                          "id": "NCIT:C4024",
                          "label": "Esophageal Squamous Cell Carcinoma"
                        },
                        "clinicalTnmFinding": [{
                          "id": "NCIT:C48724",
                          "label": "T2 Stage Finding"
                        }, {
                          "id": "NCIT:C48706",
                          "label": "N1 Stage Finding"
                        }, {
                          "id": "NCIT:C48699",
                          "label": "M0 Stage Finding"
                        }]
                      }],
                      "metaData": {
                        "created": "2021-05-14T10:35:00Z",
                        "createdBy": "anonymous biocurator",
                        "resources": [{
                          "id": "ncit",
                          "name": "NCI Thesaurus",
                          "url": "http://purl.obolibrary.org/obo/ncit.owl",
                          "version": "21.05d",
                          "namespacePrefix": "NCIT",
                          "iriPrefix": "http://purl.obolibrary.org/obo/NCIT_"
                        }, {
                          "id": "efo",
                          "name": "Experimental Factor Ontology",
                          "url": "http://www.ebi.ac.uk/efo/efo.owl",
                          "version": "3.34.0",
                          "namespacePrefix": "EFO",
                          "iriPrefix": "http://purl.obolibrary.org/obo/EFO_"
                        }, {
                          "id": "uberon",
                          "name": "Uber-anatomy ontology",
                          "url": "http://purl.obolibrary.org/obo/uberon.owl",
                          "version": "2021-07-27",
                          "namespacePrefix": "UBERON",
                          "iriPrefix": "http://purl.obolibrary.org/obo/UBERON_"
                        }, {
                          "id": "ncbitaxon",
                          "name": "NCBI organismal classification",
                          "url": "http://purl.obolibrary.org/obo/ncbitaxon.owl",
                          "version": "2021-06-10",
                          "namespacePrefix": "NCBITaxon",
                          "iriPrefix": "http://purl.obolibrary.org/obo/NCBITaxon_"
                        }],
                        "phenopacketSchemaVersion": "2.0"
                      }
                    }""";

    private final static String INCORRECT_PHENOPACKET =
            """
                    {
                      "id": "id-C",
                      "subject": {
                        "id": "proband C",
                        "timeAtLastEncounter": {
                          "age": {
                            "iso8601duration": "P27Y"
                          }
                        },
                        "sex": "FEMALE"
                      },
                      "diseases": [{
                        "term": {
                          "id": "OMIM:154700 ",
                          "label": "Marfan syndrome"
                        }
                      }],
                      "medicalActions": [{
                        "treatment": {
                          "agent": {
                            "id": "DrugCentral:1610",
                            "label": "losartan"
                          },
                          "routeOfAdministration": {
                            "id": "NCIT:C38288",
                            "label": "Oral Route of Administration"
                          },
                          "doseIntervals": [{
                            "quantity": {
                              "unit": {
                                "id": "UO:0000022",
                                "label": "milligram"
                              },
                              "value": 30.0
                            },
                            "scheduleFrequency": {
                              "id": "NCIT:C64496",
                              "label": "Twice Daily"
                            },
                            "interval": {
                              "start": "2019-03-20T00:00:00Z",
                              "end": "2021-03-20T00:00:00Z"
                            }
                          }]
                        }
                      }],
                      "metaData": {
                        "created": "2021-05-14T10:35:00Z",
                        "createdBy": "anonymous biocurator",
                        "resources": [{
                          "id": "hp",
                          "name": "human phenotype ontology",
                          "url": "http://purl.obolibrary.org/obo/hp.owl",
                          "version": "2021-08-02",
                          "namespacePrefix": "HP",
                          "iriPrefix": "http://purl.obolibrary.org/obo/HP_"
                        }],
                        "phenopacketSchemaVersion": "2.0"
                      }
                    }""";

    private ValidationResults getCorrectResult() {
        return ValidationResults.empty();
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
