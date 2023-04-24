package org.monarchinitiative.phenopacketlab.ingest;

import org.monarchinitiative.phenopacketlab.ingest.cmd.IngestCommand;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import picocli.CommandLine;

import java.io.IOException;
import java.io.InputStream;
import java.util.Locale;
import java.util.Properties;
import java.util.concurrent.Callable;

import static picocli.CommandLine.Help.Ansi.Style.*;

@CommandLine.Command(name = "phenopacketlab-ingest.jar",
        header = "ETL for Phenopacket Lab data sources",
        mixinStandardHelpOptions = true,
        version = Main.VERSION,
        usageHelpWidth = Main.WIDTH,
        footer = Main.FOOTER)
public class Main implements Callable<Integer> {

    private static final Logger LOGGER = LoggerFactory.getLogger(Main.class);

    public static final String VERSION = "phenopacket-lab v0.1-SNAPSHOT";

    public static final int WIDTH = 120;

    public static final String FOOTER = "See the full documentation at `https://phenopacket-lab.readthedocs.io/en/latest`";

    private static final CommandLine.Help.ColorScheme COLOR_SCHEME = new CommandLine.Help.ColorScheme.Builder()
            .commands(bold, fg_blue, underline)
            .options(fg_yellow)
            .parameters(fg_yellow)
            .optionParams(italic)
            .build();

    public static Properties PROPERTIES;
    private static CommandLine commandLine;


    public static void main(String[] args) {
        Locale.setDefault(Locale.US);
        PROPERTIES = readProperties();
        commandLine = new CommandLine(new Main())
                .setColorScheme(COLOR_SCHEME)
                .addSubcommand("ingest", new IngestCommand(PROPERTIES));

        commandLine.setToggleBooleanFlags(false);
        System.exit(commandLine.execute(args));
    }

    private static Properties readProperties() {
        Properties properties = new Properties();
        try (InputStream is = Main.class.getResourceAsStream("/application.properties")) {
            properties.load(is);
        } catch (IOException e) {
            LOGGER.error("Error loading properties: {}", e.getMessage(), e);
            throw new RuntimeException(e);
        }
        return properties;
    }

    @Override
    public Integer call() {
        // The work is done in sub-commands
        commandLine.usage(commandLine.getOut());
        return 0;
    }
}
