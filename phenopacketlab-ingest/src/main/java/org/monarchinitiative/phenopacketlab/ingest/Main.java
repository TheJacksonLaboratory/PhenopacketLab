package org.monarchinitiative.phenopacketlab.ingest;

import org.monarchinitiative.phenopacketlab.ingest.cmd.IngestCommand;
import picocli.CommandLine;

import java.util.Locale;
import java.util.concurrent.Callable;

import static picocli.CommandLine.Help.Ansi.Style.*;

@CommandLine.Command(name = "phenopacketlab-ingest.jar",
        header = "ETL for Phenopacket Lab data sources",
        mixinStandardHelpOptions = true,
        version = Main.VERSION,
        usageHelpWidth = Main.WIDTH,
        footer = Main.FOOTER)
public class Main implements Callable<Integer> {

    public static final String VERSION = "phenopacket-lab v0.1-SNAPSHOT";

    public static final int WIDTH = 120;

    public static final String FOOTER = "See the full documentation at `https://phenopacket-lab.readthedocs.io/en/latest`";

    private static final CommandLine.Help.ColorScheme COLOR_SCHEME = new CommandLine.Help.ColorScheme.Builder()
            .commands(bold, fg_blue, underline)
            .options(fg_yellow)
            .parameters(fg_yellow)
            .optionParams(italic)
            .build();

    private static CommandLine commandLine;

    public static void main(String[] args) {
        Locale.setDefault(Locale.US);
        commandLine = new CommandLine(new Main())
                .setColorScheme(COLOR_SCHEME)
                .addSubcommand("ingest", new IngestCommand());

        commandLine.setToggleBooleanFlags(false);
        System.exit(commandLine.execute(args));
    }

    @Override
    public Integer call() throws Exception {
        // The work is done in sub-commands
        commandLine.usage(commandLine.getOut());
        return 0;
    }
}
