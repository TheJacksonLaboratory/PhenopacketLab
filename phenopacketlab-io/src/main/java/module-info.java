module phenopacketlab.io {

    requires transitive phenopacketlab.core;
    requires org.phenopackets.schema;
    requires org.monarchinitiative.phenol.io;
    requires commons.csv;

    requires org.slf4j;
    requires java.net.http;
    requires com.fasterxml.jackson.databind;
    requires org.monarchinitiative.phenol.core;
    requires org.monarchinitiative.fenominal.core;

    exports org.monarchinitiative.phenopacketlab.io;
}