package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.monarchinitiative.phenopacketlab.core.ValidateService;

import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

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
                .thenReturn("Phenopacket has been successfully validated.");

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/validate")
                        .contentType("text/plain")
                        .content(CORRECT_PHENOPACKET))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertThat(response.getContentAsString(), equalTo("Phenopacket has been successfully validated."));
    }

    @Test
    public void validateFail() throws Exception {
        when(validateService.validate(INCORRECT_PHENOPACKET))
                .thenReturn("Error messages: \n" +
                        "com.google.protobuf.InvalidProtocolBufferException: Cannot find field: isProband in message org.phenopackets.schema.v2.Phenopacket");

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/validate")
                .contentType("text/plain")
                .content(INCORRECT_PHENOPACKET))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertThat(response.getContentAsString(), equalTo("Error messages: \n" +
                "com.google.protobuf.InvalidProtocolBufferException: Cannot find field: isProband in message org.phenopackets.schema.v2.Phenopacket"));
    }

    @Test
    public void validateBadRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/validate"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    private final String CORRECT_PHENOPACKET =
                "{\n" +
                "  \"id\": \"arbitrary.id\",\n" +
                "  \"subject\": {\n" +
                "    \"id\": \"proband A\",\n" +
                "    \"timeAtLastEncounter\": {\n" +
                "      \"age\": {\n" +
                "        \"iso8601duration\": \"P38Y\"\n" +
                "      }\n" +
                "    },\n" +
                "    \"sex\": \"MALE\"\n" +
                "  },\n" +
                "  \"biosamples\": [{\n" +
                "    \"id\": \"biosample 1\",\n" +
                "    \"individualId\": \"proband A\",\n" +
                "    \"sampledTissue\": {\n" +
                "      \"id\": \"NCIT:C12389\",\n" +
                "      \"label\": \"Esophagus\"\n" +
                "    },\n" +
                "    \"timeOfCollection\": {\n" +
                "      \"age\": {\n" +
                "        \"iso8601duration\": \"P49Y2M\"\n" +
                "      }\n" +
                "    },\n" +
                "    \"tumorProgression\": {\n" +
                "      \"id\": \"NCIT:C4813\",\n" +
                "      \"label\": \"Recurrent Malignant Neoplasm\"\n" +
                "    },\n" +
                "    \"procedure\": {\n" +
                "      \"code\": {\n" +
                "        \"id\": \"NCIT:C15189\",\n" +
                "        \"label\": \"Biopsy\"\n" +
                "      }\n" +
                "    }\n" +
                "  }, {\n" +
                "    \"id\": \"biosample 2\",\n" +
                "    \"individualId\": \"proband A\",\n" +
                "    \"sampledTissue\": {\n" +
                "      \"id\": \"NCIT:C139196\",\n" +
                "      \"label\": \"Esophageal Lymph Node\"\n" +
                "    },\n" +
                "    \"timeOfCollection\": {\n" +
                "      \"age\": {\n" +
                "        \"iso8601duration\": \"P48Y3M\"\n" +
                "      }\n" +
                "    },\n" +
                "    \"histologicalDiagnosis\": {\n" +
                "      \"id\": \"NCIT:C4024\",\n" +
                "      \"label\": \"Esophageal Squamous Cell Carcinoma\"\n" +
                "    },\n" +
                "    \"tumorProgression\": {\n" +
                "      \"id\": \"NCIT:C84509\",\n" +
                "      \"label\": \"Primary Malignant Neoplasm\"\n" +
                "    },\n" +
                "    \"diagnosticMarkers\": [{\n" +
                "      \"id\": \"NCIT:C131711\",\n" +
                "      \"label\": \"Human Papillomavirus-18 Positive\"\n" +
                "    }],\n" +
                "    \"procedure\": {\n" +
                "      \"code\": {\n" +
                "        \"id\": \"NCIT:C15189\",\n" +
                "        \"label\": \"Biopsy\"\n" +
                "      }\n" +
                "    }\n" +
                "  }, {\n" +
                "    \"id\": \"biosample 3\",\n" +
                "    \"individualId\": \"proband A\",\n" +
                "    \"sampledTissue\": {\n" +
                "      \"id\": \"NCIT:C12468\",\n" +
                "      \"label\": \"Lung\"\n" +
                "    },\n" +
                "    \"timeOfCollection\": {\n" +
                "      \"age\": {\n" +
                "        \"iso8601duration\": \"P50Y7M\"\n" +
                "      }\n" +
                "    },\n" +
                "    \"tumorProgression\": {\n" +
                "      \"id\": \"NCIT:C3261\",\n" +
                "      \"label\": \"Metastatic Neoplasm\"\n" +
                "    },\n" +
                "    \"procedure\": {\n" +
                "      \"code\": {\n" +
                "        \"id\": \"NCIT:C15189\",\n" +
                "        \"label\": \"Biopsy\"\n" +
                "      }\n" +
                "    }\n" +
                "  }],\n" +
                "  \"diseases\": [{\n" +
                "    \"term\": {\n" +
                "      \"id\": \"NCIT:C4024\",\n" +
                "      \"label\": \"Esophageal Squamous Cell Carcinoma\"\n" +
                "    },\n" +
                "    \"clinicalTnmFinding\": [{\n" +
                "      \"id\": \"NCIT:C48724\",\n" +
                "      \"label\": \"T2 Stage Finding\"\n" +
                "    }, {\n" +
                "      \"id\": \"NCIT:C48706\",\n" +
                "      \"label\": \"N1 Stage Finding\"\n" +
                "    }, {\n" +
                "      \"id\": \"NCIT:C48699\",\n" +
                "      \"label\": \"M0 Stage Finding\"\n" +
                "    }]\n" +
                "  }],\n" +
                "  \"metaData\": {\n" +
                "    \"created\": \"2021-05-14T10:35:00Z\",\n" +
                "    \"createdBy\": \"anonymous biocurator\",\n" +
                "    \"resources\": [{\n" +
                "      \"id\": \"ncit\",\n" +
                "      \"name\": \"NCI Thesaurus\",\n" +
                "      \"url\": \"http://purl.obolibrary.org/obo/ncit.owl\",\n" +
                "      \"version\": \"21.05d\",\n" +
                "      \"namespacePrefix\": \"NCIT\",\n" +
                "      \"iriPrefix\": \"http://purl.obolibrary.org/obo/NCIT_\"\n" +
                "    }, {\n" +
                "      \"id\": \"efo\",\n" +
                "      \"name\": \"Experimental Factor Ontology\",\n" +
                "      \"url\": \"http://www.ebi.ac.uk/efo/efo.owl\",\n" +
                "      \"version\": \"3.34.0\",\n" +
                "      \"namespacePrefix\": \"EFO\",\n" +
                "      \"iriPrefix\": \"http://purl.obolibrary.org/obo/EFO_\"\n" +
                "    }, {\n" +
                "      \"id\": \"uberon\",\n" +
                "      \"name\": \"Uber-anatomy ontology\",\n" +
                "      \"url\": \"http://purl.obolibrary.org/obo/uberon.owl\",\n" +
                "      \"version\": \"2021-07-27\",\n" +
                "      \"namespacePrefix\": \"UBERON\",\n" +
                "      \"iriPrefix\": \"http://purl.obolibrary.org/obo/UBERON_\"\n" +
                "    }, {\n" +
                "      \"id\": \"ncbitaxon\",\n" +
                "      \"name\": \"NCBI organismal classification\",\n" +
                "      \"url\": \"http://purl.obolibrary.org/obo/ncbitaxon.owl\",\n" +
                "      \"version\": \"2021-06-10\",\n" +
                "      \"namespacePrefix\": \"NCBITaxon\",\n" +
                "      \"iriPrefix\": \"http://purl.obolibrary.org/obo/NCBITaxon_\"\n" +
                "    }],\n" +
                "    \"phenopacketSchemaVersion\": \"2.0\"\n" +
                "  }\n" +
                "}";

    private final String INCORRECT_PHENOPACKET =
                "{\n" +
                        "   \"id\": \"phenoacket-id1\",\n" +
                        "   \"subject\": {\n" +
                        "      \"id\": \"\",\n" +
                        "      \"alternateIds\": [],\n" +
                        "      \"vitalStatus\": {\n" +
                        "         \"status\": \"DECEASED\"\n" +
                        "      },\n" +
                        "      \"sex\": \"OTHER_SEX\"\n" +
                        "   },\n" +
                        "   \"phenotypicFeatures\": [\n" +
                        "      {\n" +
                        "         \"excluded\": false,\n" +
                        "         \"type\": {\n" +
                        "            \"id\": \"HP:0003198\",\n" +
                        "            \"label\": \"Myopathy\"\n" +
                        "         },\n" +
                        "         \"onset\": {\n" +
                        "            \"age\": {\n" +
                        "               \"iso8601duration\": \"P12Y5M\"\n" +
                        "            }\n" +
                        "         }\n" +
                        "      },\n" +
                        "      {\n" +
                        "         \"excluded\": false,\n" +
                        "         \"type\": {\n" +
                        "            \"id\": \"HP:0002033\",\n" +
                        "            \"label\": \"Poor suck\"\n" +
                        "         },\n" +
                        "         \"onset\": {\n" +
                        "            \"age\": {\n" +
                        "               \"iso8601duration\": \"P12Y5M\"\n" +
                        "            }\n" +
                        "         }\n" +
                        "      },\n" +
                        "      {\n" +
                        "         \"excluded\": false,\n" +
                        "         \"type\": {\n" +
                        "            \"id\": \"HP:0001388\",\n" +
                        "            \"label\": \"Joint laxity\"\n" +
                        "         },\n" +
                        "         \"onset\": {\n" +
                        "            \"age\": {\n" +
                        "               \"iso8601duration\": \"P12Y5M\"\n" +
                        "            }\n" +
                        "         }\n" +
                        "      },\n" +
                        "      {\n" +
                        "         \"excluded\": true,\n" +
                        "         \"type\": {\n" +
                        "            \"id\": \"HP:0001373\",\n" +
                        "            \"label\": \"Joint dislocation\"\n" +
                        "         },\n" +
                        "         \"onset\": {\n" +
                        "            \"age\": {\n" +
                        "               \"iso8601duration\": \"P12Y5M\"\n" +
                        "            }\n" +
                        "         }\n" +
                        "      }\n" +
                        "   ],\n" +
                        "   \"measurements\": [],\n" +
                        "   \"biosamples\": [],\n" +
                        "   \"interpretations\": [],\n" +
                        "   \"diseases\": [],\n" +
                        "   \"medicalActions\": [],\n" +
                        "   \"files\": [],\n" +
                        "   \"isProband\": false,\n" +
                        "   \"metadata\": {\n" +
                        "      \"created\": \"2023-01-23T17:49:53.841Z\",\n" +
                        "      \"resources\": [],\n" +
                        "      \"externalReferences\": [],\n" +
                        "      \"phenopacketSchemaVersion\": \"2.0\"\n" +
                        "   }\n" +
                        "}";
}
