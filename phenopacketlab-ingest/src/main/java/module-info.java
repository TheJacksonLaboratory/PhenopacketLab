module phenopacketlab.ingest {
    requires org.monarchinitiative.biodownload;
    requires info.picocli;
    requires commons.csv;
    requires java.sql;
    requires org.slf4j;

    exports org.monarchinitiative.phenopacketlab.ingest to info.picocli;
    exports org.monarchinitiative.phenopacketlab.ingest.cmd to info.picocli;
    exports org.monarchinitiative.phenopacketlab.ingest.transform to info.picocli;
}