package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.monarchinitiative.phenol.io.OntologyLoader;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenopacketlab.autoconfigure.exception.MissingPhenopacketLabResourceException;
import org.monarchinitiative.phenopacketlab.autoconfigure.exception.UndefinedPhenopacketLabResourceException;
import org.monarchinitiative.phenopacketlab.core.ontology.HpoService;
import org.monarchinitiative.phenopacketlab.core.ontology.PhenolHpoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;

@Configuration
@EnableConfigurationProperties({
        PhenopacketLabProperties.class
})
public class PhenopacketLabAutoConfiguration {

    private static final Logger LOGGER = LoggerFactory.getLogger(PhenopacketLabAutoConfiguration.class);

    private static final Properties properties = readProperties();

    private static final String PHENOPACKETLAB_VERSION = properties.getProperty("phenopacketlab.version", "unknown version");

    @Bean
    @ConditionalOnMissingBean(name = "phenopacketLabDataDirectory")
    public Path phenopacketLabDataDirectory(PhenopacketLabProperties phenopacketLabProperties) throws UndefinedPhenopacketLabResourceException {
        String dataDir = phenopacketLabProperties.getDataDirectory();
        if (dataDir == null || dataDir.isEmpty()) {
            throw new UndefinedPhenopacketLabResourceException("Path to PhenopacketLab data directory (`phenopacketlab.data-directory`) is not specified");
        }
        Path dataDirPath = Paths.get(dataDir);
        if (!Files.isDirectory(dataDirPath)) {
            throw new UndefinedPhenopacketLabResourceException(String.format("Path to PhenopacketLab data directory '%s' does not point to real directory", dataDirPath));
        }
        LOGGER.info("Spooling up PhenopacketLab v{} using resources in `{}`", PHENOPACKETLAB_VERSION, dataDirPath.toAbsolutePath());
        return dataDirPath;
    }

    @Bean
    public PhenopacketLabDataResolver phenopacketLabDataResolver(Path phenopacketLabDataDirectory) throws MissingPhenopacketLabResourceException {
        return new PhenopacketLabDataResolver(phenopacketLabDataDirectory);
    }

    @Bean
    public HpoService ontologyService(PhenopacketLabDataResolver phenopacketLabDataResolver) {
        Path hpoPath = phenopacketLabDataResolver.hpoJsonPath();
        Ontology hpo = OntologyLoader.loadOntology(hpoPath.toFile());
        return new PhenolHpoService(hpo);
    }

    private static Properties readProperties() {
        Properties properties = new Properties();

        try (InputStream is = PhenopacketLabAutoConfiguration.class.getResourceAsStream("/phenopacketlab.properties")) {
            properties.load(is);
        } catch (IOException e) {
            LOGGER.warn("Error loading properties: {}", e.getMessage());
        }
        return properties;
    }
}
