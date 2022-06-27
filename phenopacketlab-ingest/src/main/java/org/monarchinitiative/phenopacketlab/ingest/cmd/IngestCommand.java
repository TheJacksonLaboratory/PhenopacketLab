package org.monarchinitiative.phenopacketlab.ingest.cmd;

import org.monarchinitiative.biodownload.BioDownloader;
import org.monarchinitiative.biodownload.FileDownloadException;
import org.monarchinitiative.phenopacketlab.ingest.Main;
import org.monarchinitiative.phenopacketlab.ingest.transform.DrugCentralTransformer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import picocli.CommandLine;

import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
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
    private static final String NCIT_URL = "ncit.url";
    private static final String NCIT_VERSION = "ncit.version";
    private static final String DRUG_CENTRAL_URL = "drugcentral.url";
    private static final String DRUG_CENTRAL_VERSION = "drugcentral.version";

    private final Properties properties;

    @CommandLine.Parameters(index = "0",
            description = "path to the destination folder")
    public Path destinationPath;

    @CommandLine.Option(names = {"-f", "--force-overwrite"},
            description = "overwrite the existing resource files (default: ${DEFAULT-VALUE})")
    public boolean overwrite = false;

    public IngestCommand(Properties properties) {
        this.properties = properties;
        if (!properties.containsKey(NCIT_URL) && !properties.containsKey(NCIT_VERSION))
            throw new IllegalStateException("NCI Thesaurus URL and version must be specified!");
    }

    @Override
    public Integer call() {
        LOGGER.info("Running `ingest` command");
        Optional<Path> existingDataDirectory = createDataDirectory(destinationPath);
        LOGGER.info("Overwriting the existing files: {}", overwrite);

        if (existingDataDirectory.isPresent()) {
            Path dataDirectory = existingDataDirectory.get();
            List<Path> toDelete = new LinkedList<>();
            try {
                // First, download.
                downloadResources(dataDirectory, toDelete);

                // Then, cleanup.
                if (!toDelete.isEmpty()) {
                    LOGGER.info("Removing {} temporary file(s).", toDelete.size());
                    for (Path del : toDelete) {
                        LOGGER.debug("Removing {}", del.toAbsolutePath());
                        Files.deleteIfExists(del);
                    }
                }
            } catch (IOException | FileDownloadException e) {
                LOGGER.error("Error occurred during the download: {}", e.getMessage(), e);
                return 1;
            }
        }

        LOGGER.info("Done!");
        return 0;
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

    private void downloadResources(Path dataDirectory, List<Path> toDelete) throws FileDownloadException, IOException {
//        String nciThesaurusZipName = "NciThesaurus.zip";
//        String url = properties.getProperty(NCIT_URL);
//        URL ncitUrl = new URL(url);
//        String ncitVersion = properties.getProperty(NCIT_VERSION);

        // Temporary name of the DrugCentral SQL dump. The dump is deleted after the processing is done.
        String drugCentralDumpName = "drugcentral.dump.sql.gz";
        String drugCentralUrlString = properties.getProperty(DRUG_CENTRAL_URL);
        URL drugCentralUrl = new URL(drugCentralUrlString);
        String drugCentralVersion = properties.getProperty(DRUG_CENTRAL_VERSION);

        BioDownloader downloader = BioDownloader.builder(dataDirectory)
                .overwrite(overwrite)
                .hgnc()
                .hpDiseaseAnnotations()
//                .custom(nciThesaurusZipName, ncitUrl)
                .custom(drugCentralDumpName, drugCentralUrl)
                .build();

        downloader.download();
//        Path thesaurusZip = dataDirectory.resolve(nciThesaurusZipName);
//        toDelete.add(thesaurusZip);
//        NciThesaurusTransformer.transform(thesaurusZip, dataDirectory.resolve("NCIT.tsv.gz"), url, ncitVersion);

        // Post-process DrugCentral.
        Path drugCentralDump = dataDirectory.resolve(drugCentralDumpName);
        toDelete.add(drugCentralDump);
        DrugCentralTransformer.transform(drugCentralDump, dataDirectory.resolve("drugcentral.csv"), drugCentralUrlString, drugCentralVersion);
    }
}
