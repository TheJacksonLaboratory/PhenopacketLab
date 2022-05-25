module phenopacketlab.autoconfigure {
    requires phenopacketlab.model;
    requires transitive phenopacketlab.core;
    requires phenopacketlab.io;
    requires org.monarchinitiative.phenol.io;

    requires spring.boot.autoconfigure;
    requires spring.boot;
    requires spring.context;
    requires org.slf4j;

    exports org.monarchinitiative.phenopacketlab.autoconfigure;
    exports org.monarchinitiative.phenopacketlab.autoconfigure.exception;

    opens org.monarchinitiative.phenopacketlab.autoconfigure;
}