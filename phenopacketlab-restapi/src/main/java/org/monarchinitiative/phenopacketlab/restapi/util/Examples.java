package org.monarchinitiative.phenopacketlab.restapi.util;

import com.google.protobuf.util.JsonFormat;
import org.phenopackets.schema.v2.Cohort;
import org.phenopackets.schema.v2.Family;
import org.phenopackets.schema.v2.Phenopacket;

import java.io.*;

public class Examples {

    private static final JsonFormat.Parser PARSER = JsonFormat.parser();

    private Examples() {
    }

    public static class Phenopackets {

        private Phenopackets() {
        }

        private static final String BASEDIR = "/examples/phenopackets";

        private static final Phenopacket AML = readPhenopacket("acute-myeloid-leukemia.json");
        private static final Phenopacket BETHLEM_MYOPATHY = readPhenopacket("bethlem-myopathy.json");
        private static final Phenopacket COVID = readPhenopacket("covid.json");
        private static final Phenopacket MARFAN = readPhenopacket("marfan.json");
        private static final Phenopacket SQUAMOUS_CELL_ESOPHAGEAL_CARCINOMA = readPhenopacket("squamous-cell-esophageal-carcinoma.json");
        private static final Phenopacket THROMBOCYTOPENIA2 = readPhenopacket("thrombocytopenia2.json");
        private static final Phenopacket UROTHELIAL_CANCER = readPhenopacket("urothelial-cancer.json");

        private static Phenopacket readPhenopacket(String name) {
            try (Reader is = new BufferedReader(new InputStreamReader(Examples.class.getResourceAsStream(BASEDIR + "/" + name)))) {
                Phenopacket.Builder builder = Phenopacket.newBuilder();
                PARSER.merge(is, builder);
                return builder.build();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        public static Phenopacket acuteMyeloidLeukemia() {
            return AML;
        }

        public static Phenopacket bethlemMyopathy() {
            return BETHLEM_MYOPATHY;
        }

        public static Phenopacket covid() {
            return COVID;
        }

        public static Phenopacket marfan() {
            return MARFAN;
        }

        public static Phenopacket squamousCellEsophagealCarcinoma() {
            return SQUAMOUS_CELL_ESOPHAGEAL_CARCINOMA;
        }

        public static Phenopacket thrombocytopenia2() {
            return THROMBOCYTOPENIA2;
        }

        public static Phenopacket urothelialCancer() {
            return UROTHELIAL_CANCER;
        }
    }

    public static class Families {
        private Families() {
        }

        public static Family abc() {
            // TODO - improve
            return Family.newBuilder()
                    .setId("FAMILY")
                    .build();
        }

    }

    public static class Cohorts {
        private Cohorts() {
        }

        public static Cohort abc() {
            // TODO - improve
            return Cohort.newBuilder()
                    .setId("cohort")
                    .build();
        }
    }
}
