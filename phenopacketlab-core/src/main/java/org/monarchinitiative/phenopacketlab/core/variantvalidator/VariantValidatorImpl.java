package org.monarchinitiative.phenopacketlab.core.variantvalidator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class VariantValidatorImpl implements VariantValidatorService {

    private static final Logger LOGGER = LoggerFactory.getLogger(VariantValidatorImpl.class);

    public VariantValidatorImpl() {
    }

    @Override
    public String variantValidator(String build, String description, String transcript) {
        String variantValidatorUrl = String.format("https://rest.variantvalidator.org/VariantValidator/variantvalidator/%1s/%2s/%3s?content-type=application/json", build, description, transcript);
        String result = "";
        try {
            ProcessBuilder pb = new ProcessBuilder("curl", "--silent", "--location", "--request", "GET", variantValidatorUrl, "--header", "Content-Type:application/json");
            // errorstream of the process will be redirected to standard output
            pb.redirectErrorStream(true);
            // start the process
            Process proc = pb.start();
            /* get the inputstream from the process which would get printed on
             * the console / terminal
             */
            InputStream ins = proc.getInputStream();
            // creating a buffered reader
            BufferedReader read = new BufferedReader(new InputStreamReader(ins));
            StringBuilder sb = new StringBuilder();
            read.lines()
                    .forEach(line -> {
                        LOGGER.debug("line>" + line);
                        sb.append(line);
                    });
            result = sb.toString();
            // close the buffered reader
            read.close();
            /*
             * wait until process completes, this should be always after the
             * input_stream of processbuilder is read to avoid deadlock
             * situations
             */
            proc.waitFor();
            /* exit code can be obtained only after process completes, 0
             * indicates a successful completion
             */
            int exitCode = proc.exitValue();
            LOGGER.debug("exit code::" + exitCode);
            // finally destroy the process
            proc.destroy();
        } catch (UnsupportedOperationException | IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return result;
    }

}
