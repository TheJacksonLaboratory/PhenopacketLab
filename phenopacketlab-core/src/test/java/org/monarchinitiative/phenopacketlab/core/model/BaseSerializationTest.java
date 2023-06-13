package org.monarchinitiative.phenopacketlab.core.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

class BaseSerializationTest {

    protected static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    static  {
        OBJECT_MAPPER.enable(SerializationFeature.INDENT_OUTPUT);
    }

}
