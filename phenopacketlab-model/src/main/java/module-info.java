module phenopacketlab.model {
    requires transitive org.monarchinitiative.phenol.core;
//    requires transitive org.phenopackets.schema; // TODO - fix after/if module-info is added into phenopackets-schema.
    requires transitive phenopacket.schema;

    exports org.monarchinitiative.phenopacketlab.model;
    exports org.monarchinitiative.phenopacketlab.model.util;
}