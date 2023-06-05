module phenopacketlab.io {

    requires transitive phenopacketlab.core;
    requires org.phenopackets.schema;
    requires org.phenopackets.phenopackettools.builder;
    requires org.monarchinitiative.phenol.core;
    requires org.monarchinitiative.phenol.io;
    requires com.google.protobuf;

    requires commons.csv;
    requires org.slf4j;
    requires java.net.http;
    requires com.fasterxml.jackson.databind;
    requires org.phenopackets.phenopackettools.io;
    requires org.phenopackets.phenopackettools.util;
    requires org.apache.commons.io;

    exports org.monarchinitiative.phenopacketlab.io;
}