package org.monarchinitiative.phenopacketlab.ingest.cmd;

import org.monarchinitiative.biodownload.BioDownloader;
import org.monarchinitiative.biodownload.FileDownloadException;
import org.monarchinitiative.phenopacketlab.ingest.Main;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import picocli.CommandLine;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.concurrent.Callable;
import java.util.zip.GZIPInputStream;

@CommandLine.Command(name = "ingest",
        aliases = "I",
        header = "ingest the resource files into a folder",
        mixinStandardHelpOptions = true,
        version = Main.VERSION,
        usageHelpWidth = Main.WIDTH,
        footer = Main.FOOTER)
public class IngestCommand implements Callable<Integer> {

    private static final Logger LOGGER = LoggerFactory.getLogger(IngestCommand.class);

    @CommandLine.Parameters(index = "0",
            description = "path to the destination folder")
    public Path destinationPath;

    @CommandLine.Option(names = {"-f", "--force-overwrite"},
            description = "overwrite the existing resource files (default: ${DEFAULT-VALUE})")
    public boolean overwrite = false;

    @Override
    public Integer call() {
        LOGGER.info("Running `ingest` command");
        Optional<Path> existingDataDirectory = createDataDirectory(destinationPath);
        LOGGER.info("Overwriting the existing files: {}", overwrite);

        if (existingDataDirectory.isPresent()) {
            Path dataDirectory = existingDataDirectory.get();
            try {
                downloadResources(dataDirectory);
            } catch (FileDownloadException e) {
                LOGGER.error("Error occurred during the download: {}", e.getMessage(), e);
                return 1;
            }

            try {
                uncompressHpoJson(dataDirectory);
            } catch (IOException e) {
                LOGGER.error("Error occurred during un-compressing HPO JSON file: {}", e.getMessage(), e);
                return 1;
            }
        }

        LOGGER.info("Done!");
        return 0;
    }

    private static void uncompressHpoJson(Path dataDirectory) throws IOException {
        Path hpoJson = dataDirectory.resolve("hp.json");
        Path gzipped = dataDirectory.resolve("hp.json.gz");

        // Uncompressed HP JSON has ~25MB
        long tenMegaBytes = 10 * 1000 * 1000;
        if (Files.isRegularFile(hpoJson) && Files.size(hpoJson) < tenMegaBytes) {
            LOGGER.info("Un-compressing HP JSON file");
            // Add `.gz` suffix to the HP JSON file
            Files.move(hpoJson, gzipped, StandardCopyOption.REPLACE_EXISTING);
            // un-compress HP JSON
            try (InputStream in = new BufferedInputStream(new GZIPInputStream(Files.newInputStream(gzipped)));
                 BufferedOutputStream out = new BufferedOutputStream(Files.newOutputStream(hpoJson))) {
                in.transferTo(out);
            }
            // delete gZipped
            Files.delete(gzipped);
        }
    }

    private static Optional<Path> createDataDirectory(Path destinationPath) {
        LOGGER.info("Creating PhenopacketLab data directory at `{}`", destinationPath.toAbsolutePath());
        if (!Files.isDirectory(destinationPath)) {
            if (!destinationPath.toFile().mkdirs()) {
                LOGGER.error("Unable to create directories");
                return Optional.empty();
            }
        }

        return Optional.of(destinationPath);
    }

    private void downloadResources(Path dataDirectory) throws FileDownloadException {
        BioDownloader downloader = BioDownloader.builder(dataDirectory)
                .overwrite(overwrite)
                .hpoJson()
                .build();

        downloader.download();
    }
}