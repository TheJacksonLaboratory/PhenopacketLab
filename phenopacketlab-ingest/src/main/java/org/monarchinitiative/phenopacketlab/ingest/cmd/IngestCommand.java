package org.monarchinitiative.phenopacketlab.ingest.cmd;

import org.monarchinitiative.phenopacketlab.ingest.Main;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import picocli.CommandLine;

import java.util.concurrent.Callable;

@CommandLine.Command(name = "ingest",
        aliases = "I",
        header = "ingest the resource files into a folder",
        mixinStandardHelpOptions = true,
        version = Main.VERSION,
        usageHelpWidth = Main.WIDTH,
        footer = Main.FOOTER)
public class IngestCommand implements Callable<Integer> {

    private static final Logger LOGGER = LoggerFactory.getLogger(IngestCommand.class);


    @Override
    public Integer call() throws Exception {
        LOGGER.info("Not yet implemented");
        return 0;
    }
}
