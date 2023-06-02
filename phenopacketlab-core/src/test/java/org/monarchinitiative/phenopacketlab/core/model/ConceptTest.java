package org.monarchinitiative.phenopacketlab.core.model;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

public class ConceptTest extends BaseSerializationTest {

    @Test
    public void testSerialization_fullExample() throws Exception {
        Concept concept = Concept.of(
                "Arachnodactyly",
                "Abnormally long and slender fingers (\"spider fingers\").",
                List.of("Long slender fingers", "Spider fingers"));

        String actual = OBJECT_MAPPER.writeValueAsString(concept);
        assertThat(actual, equalTo("""
                {
                  "name" : "Arachnodactyly",
                  "definition" : "Abnormally long and slender fingers (\\"spider fingers\\").",
                  "synonyms" : [ "Long slender fingers", "Spider fingers" ]
                }"""));
    }

    @Test
    public void testSerialization_missingFields() throws Exception {
        Concept concept = Concept.of(
                "Jimmy",
                null,
                List.of());

        String actual = OBJECT_MAPPER.writeValueAsString(concept);
        assertThat(actual, equalTo("""
                {
                  "name" : "Jimmy",
                  "definition" : null,
                  "synonyms" : [ ]
                }"""));
    }
}