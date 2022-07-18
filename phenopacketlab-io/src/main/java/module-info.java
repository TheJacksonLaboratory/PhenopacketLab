module phenopacketlab.io {

    requires transitive phenopacketlab.model;
    requires phenopacketlab.core;
    requires org.phenopackets.schema;
    requires org.monarchinitiative.phenol.io;
    requires commons.csv;

    requires org.slf4j;

    exports org.monarchinitiative.phenopacketlab.io;
}