module phenopacketlab.restapi {
    requires phenopacketlab.autoconfigure;

    requires phenopacket.schema;

    requires org.slf4j;

    requires spring.boot;
    requires spring.boot.autoconfigure;
    requires spring.web;

    // TODO - consider removing
    requires com.google.protobuf;
    requires com.google.protobuf.util;

    opens org.monarchinitiative.phenopacketlab.restapi;
    opens org.monarchinitiative.phenopacketlab.restapi.controller;
}