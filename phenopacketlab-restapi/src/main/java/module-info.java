module phenopacketlab.restapi {
    requires phenopacketlab.autoconfigure;
    requires phenopacketlab.io;

    // TODO - no transitive requirement despite exposing schema elements in the public API since the module is terminal.
    //  Reassess if necessary.
    requires org.phenopackets.schema;

    requires org.slf4j;

    requires spring.context;
    requires spring.boot;
    requires spring.boot.autoconfigure;
    requires spring.web;
    requires spring.webmvc;
    requires spring.beans;

    // TODO(ielis) - consider removing after dropping `controller/test/*` and `util/Examples`
    requires com.google.protobuf;
    requires com.google.protobuf.util;

    requires io.swagger.v3.oas.annotations;

    opens org.monarchinitiative.phenopacketlab.restapi;
    opens org.monarchinitiative.phenopacketlab.restapi.controller;
    opens org.monarchinitiative.phenopacketlab.restapi.controller.test;
}