package org.monarchinitiative.phenopacketlab.core.model;

import org.junit.jupiter.api.Test;
import org.monarchinitiative.phenol.ontology.data.TermId;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

public class ResourceTest extends BaseSerializationTest {

    @Test
    public void testSerialization_fullExample() throws Exception {
        Resource resource = Resource.of("hp",
                "human phenotype ontology",
                "http://purl.obolibrary.org/obo/hp.owl",
                "2018-03-08",
                "HP",
                "http://purl.obolibrary.org/obo/HP_");

        String actual = OBJECT_MAPPER.writeValueAsString(resource);
        assertThat(actual, equalTo("""
                {
                  "id" : "hp",
                  "name" : "human phenotype ontology",
                  "url" : "http://purl.obolibrary.org/obo/hp.owl",
                  "version" : "2018-03-08",
                  "namespacePrefix" : "HP",
                  "iriPrefix" : "http://purl.obolibrary.org/obo/HP_"
                }"""));
    }

}