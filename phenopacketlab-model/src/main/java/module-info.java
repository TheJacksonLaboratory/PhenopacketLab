module phenopacketlab.model {
    requires transitive org.monarchinitiative.phenol.core;

    exports org.monarchinitiative.phenopacketlab.model;
    exports org.monarchinitiative.phenopacketlab.model.util;
    opens org.monarchinitiative.phenopacketlab.model to com.fasterxml.jackson.databind;
}