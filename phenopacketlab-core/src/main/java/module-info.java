module phenopacketlab.core {
    requires transitive phenopacketlab.model;
    requires transitive org.monarchinitiative.phenol.core;
    requires transitive org.monarchinitiative.phenol.annotations;

    requires org.monarchitiative.svart;

    requires org.slf4j;

    exports org.monarchinitiative.phenopacketlab.core;
    exports org.monarchinitiative.phenopacketlab.core.disease;
    exports org.monarchinitiative.phenopacketlab.core.ontology;
}