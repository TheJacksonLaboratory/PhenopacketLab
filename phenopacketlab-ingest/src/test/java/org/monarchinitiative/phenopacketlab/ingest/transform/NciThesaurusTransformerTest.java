package org.monarchinitiative.phenopacketlab.ingest.transform;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.monarchinitiative.phenopacketlab.ingest.TestBase;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.GZIPInputStream;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

public class NciThesaurusTransformerTest {


    @TempDir
    public Path tempDir;

    @Test
    public void transform() throws Exception  {
        Path zip = TestBase.TEST_BASE.resolve("transform").resolve("Thesaurus.50lines.zip");
        Path destination = tempDir.resolve("NCIT.csv.gz");
        assertThat(Files.isRegularFile(destination), equalTo(false));

        NciThesaurusTransformer.transform(zip, destination, "04.D");

        assertThat(Files.isRegularFile(destination), equalTo(true));
        List<String> lines = readLines(destination);

        assertThat(lines, hasSize(52));
        assertThat(lines.get(0), equalTo("# version: 04.D"));
        assertThat(lines.get(1), equalTo("code,label,definition")); // header
        assertThat(lines.get(2), equalTo("C100000,Percutaneous Coronary Intervention for ST Elevation Myocardial Infarction-Stable-Over 12 Hours From Symptom Onset,\"A percutaneous coronary intervention is necessary for a myocardial infarction that presents with ST segment elevation and the subject does not have recurrent or persistent symptoms, symptoms of heart failure or ventricular arrhythmia. The presentation is past twelve hours since onset of symptoms. (ACC)\",Therapeutic or Preventive Procedure"));
        assertThat(lines.get(45), equalTo("C10003,Methotrexate/Teniposide,,Therapeutic or Preventive Procedure"));
    }

    private static List<String> readLines(Path destination) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(new GZIPInputStream(Files.newInputStream(destination))))) {
            return reader.lines().collect(Collectors.toList());
        }
    }
}