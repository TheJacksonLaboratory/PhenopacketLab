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
	requires spring.security.oauth2.core;
    requires spring.security.oauth2.jose;
    requires spring.security.config;
    requires spring.security.core;
    requires spring.security.web;
    requires spring.core;
    requires spring.data.commons;
    requires spring.cloud.gcp.data.datastore;
    requires spring.cloud.gcp.core;
    requires io.swagger.v3.oas.annotations;
    requires com.google.protobuf;
    requires java.sql;


    opens org.monarchinitiative.phenopacketlab.restapi;
    opens org.monarchinitiative.phenopacketlab.restapi.controller;
    opens org.monarchinitiative.phenopacketlab.restapi.domain;
    opens org.monarchinitiative.phenopacketlab.restapi.repository;
    opens org.monarchinitiative.phenopacketlab.restapi.service;
    opens org.monarchinitiative.phenopacketlab.restapi.config.security;
    opens org.monarchinitiative.phenopacketlab.restapi.controller.test;

}
