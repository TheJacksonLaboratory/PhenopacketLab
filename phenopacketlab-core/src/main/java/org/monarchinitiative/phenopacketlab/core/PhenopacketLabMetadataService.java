package org.monarchinitiative.phenopacketlab.core;


import org.monarchinitiative.phenopacketlab.core.model.Resource;

import java.util.stream.Stream;

public interface PhenopacketLabMetadataService {


    String phenopacketSchemaVersion();

    Stream<Resource> resourcesForPhenopacket(String phenopacketString);

}
