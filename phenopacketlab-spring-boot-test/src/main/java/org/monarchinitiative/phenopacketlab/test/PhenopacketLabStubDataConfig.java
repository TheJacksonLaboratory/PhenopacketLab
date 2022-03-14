package org.monarchinitiative.phenopacketlab.test;

import org.mockito.Mockito;
import org.monarchinitiative.phenol.ontology.data.Term;
import org.monarchinitiative.phenol.ontology.data.TermId;
import org.monarchinitiative.phenopacketlab.core.ontology.HpoService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class PhenopacketLabStubDataConfig {

    @Bean
    public HpoService hpoService() {
        HpoService hpoService = Mockito.mock(HpoService.class);
        Mockito.when(hpoService.onsets())
                .thenReturn(List.of(
                        Term.of(TermId.of("HP:1234567"), "Antenatal") // TODO - make-up a couple of additional Terms
                        ));

        return hpoService;
    }
}
