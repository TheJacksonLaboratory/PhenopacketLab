module phenopacketlab.core {
    requires transitive org.monarchinitiative.phenol.core;
    requires transitive org.monarchinitiative.phenol.annotations;
    requires org.monarchinitiative.fenominal.core;
    requires org.monarchitiative.svart;

    requires org.slf4j;
    // TODO - remove after upgrade to phenopacket-tools-validator-jsonschema > 1.0.0-RC3
    requires org.phenopackets.schema;
    requires org.phenopackets.phenopackettools.validator.jsonschema;
    requires transitive org.phenopackets.phenopackettools.validator.core;
    requires com.fasterxml.jackson.databind;

    exports org.monarchinitiative.phenopacketlab.core;
    exports org.monarchinitiative.phenopacketlab.core.disease;
    exports org.monarchinitiative.phenopacketlab.core.functionalannotation;
    exports org.monarchinitiative.phenopacketlab.core.miner to phenopacketlab.restapi, phenopacketlab.autoconfigure, phenopacketlab.io;
    exports org.monarchinitiative.phenopacketlab.core.model;
    exports org.monarchinitiative.phenopacketlab.core.ontology;
    exports org.monarchinitiative.phenopacketlab.core.subtree to phenopacketlab.restapi;

    opens org.monarchinitiative.phenopacketlab.core.model to com.fasterxml.jackson.databind;
    opens org.monarchinitiative.phenopacketlab.core.subtree to com.fasterxml.jackson.databind;
}