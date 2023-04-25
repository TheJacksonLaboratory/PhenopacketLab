package org.monarchinitiative.phenopacketlab.restapi.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.monarchinitiative.phenol.annotations.base.Ratio;
import org.monarchinitiative.phenol.annotations.base.Sex;
import org.monarchinitiative.phenol.annotations.base.temporal.Age;
import org.monarchinitiative.phenol.annotations.base.temporal.PointInTime;
import org.monarchinitiative.phenol.annotations.base.temporal.TemporalInterval;
import org.monarchinitiative.phenol.annotations.constants.hpo.HpoModeOfInheritanceTermIds;
import org.monarchinitiative.phenol.annotations.formats.AnnotationReference;
import org.monarchinitiative.phenol.annotations.formats.EvidenceCode;
import org.monarchinitiative.phenol.annotations.formats.hpo.*;
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
        when(diseaseService.diseaseById(diseaseId))
                .thenReturn(Optional.of(createDisease(diseaseId.getValue(), "First", List.of())));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/diseases/OMIM:123456"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertThat(response.getContentAsString(), equalTo("{\"id\":\"OMIM:123456\",\"label\":\"First\"}"));
    }

    @Test
    public void diseaseById_missingDisease() throws Exception {
        TermId diseaseId = TermId.of("OMIM:123456");
        when(diseaseService.diseaseById(diseaseId))
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
        when(diseaseService.diseases())
                .thenReturn(Stream.of(
                        createDisease("OMIM:123456", "First", List.of(arachnodactyly())),
                        createDisease("OMIM:987654", "Second", List.of(hypertension()))
                ));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/diseases"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertThat(response.getContentAsString(), equalTo("[{\"id\":\"OMIM:123456\",\"label\":\"First\"},{\"id\":\"OMIM:987654\",\"label\":\"Second\"}]"));
    }

    private static HpoDisease createDisease(String diseaseId, String diseaseName, List<HpoDiseaseAnnotation> diseaseAnnotations) {
        return HpoDisease.of(TermId.of(diseaseId),
                diseaseName,
                HpoOnset.CHILDHOOD_ONSET,
                diseaseAnnotations,
                List.of(HpoModeOfInheritanceTermIds.AUTOSOMAL_RECESSIVE));
    }

    private static HpoDiseaseAnnotation arachnodactyly() {
        return HpoDiseaseAnnotation.of(
                TermId.of("HP:0001166"),
                List.of(
                        HpoDiseaseAnnotationRecord.of(
                                Ratio.of(1, 1),
                                TemporalInterval.openEnd(PointInTime.birth()),
                                List.of(AnnotationReference.of(TermId.of("PMID:123456"), EvidenceCode.PCS)),
                                null,
                                List.of()
                        )
                )
        );
    }

    private static HpoDiseaseAnnotation hypertension() {
        return HpoDiseaseAnnotation.of(
                TermId.of("HP:0000822"),
                List.of(
                        HpoDiseaseAnnotationRecord.of(
                                Ratio.of(1, 1),
                                TemporalInterval.openEnd(Age.postnatal(42, 3, 0)),
                                List.of(AnnotationReference.of(TermId.of("PMID:987456"), EvidenceCode.PCS)),
                                null,
                                List.of()
                        )
                )
        );
    }
}