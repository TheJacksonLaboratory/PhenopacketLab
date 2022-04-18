module phenopacketlab.restapi {
    requires phenopacketlab.autoconfigure;

    requires phenopacket.schema;

    requires org.slf4j;

    requires spring.context;
    requires spring.boot;
    requires spring.boot.autoconfigure;
    requires spring.web;

    // TODO(ielis) - consider removing after dropping `controller/test/*` and `util/Examples`
    requires com.google.protobuf;
    requires com.google.protobuf.util;

    opens org.monarchinitiative.phenopacketlab.restapi;
    opens org.monarchinitiative.phenopacketlab.restapi.controller;
    opens org.monarchinitiative.phenopacketlab.restapi.controller.dto;
    opens org.monarchinitiative.phenopacketlab.restapi.controller.test;
}