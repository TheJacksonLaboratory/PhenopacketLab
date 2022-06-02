module phenopacketlab.io {

    requires transitive phenopacketlab.model;
    requires org.phenopackets.schema;
    requires org.monarchinitiative.phenol.io;

    requires org.slf4j;

    exports org.monarchinitiative.phenopacketlab.io;
}