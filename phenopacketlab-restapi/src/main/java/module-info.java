module phenopacketlab.restapi {
    requires phenopacketlab.autoconfigure;

    requires phenopacket.schema;

    requires spring.boot;
    requires spring.boot.autoconfigure;
    requires spring.web;

    opens org.monarchinitiative.phenopacketlab.restapi;
    opens org.monarchinitiative.phenopacketlab.restapi.controller;
}