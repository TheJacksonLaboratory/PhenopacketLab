package org.monarchinitiative.phenopacketlab.core;

import java.util.stream.Stream;

public interface PhenopacketLabMetadataService {


    String phenopacketSchemaVersion();

    Stream<String> resourcesPrefixesForPhenopacket(String phenopacketString);

}
