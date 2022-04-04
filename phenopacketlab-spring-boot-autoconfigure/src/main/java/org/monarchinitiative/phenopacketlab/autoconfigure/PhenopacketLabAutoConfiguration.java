package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.monarchinitiative.phenol.annotations.formats.hpo.HpoDiseases;
import org.monarchinitiative.phenol.annotations.io.hpo.HpoDiseaseAnnotationLoader;
import org.monarchinitiative.phenol.io.OntologyLoader;
import org.monarchinitiative.phenol.ontology.data.Ontology;
import org.monarchinitiative.phenopacketlab.autoconfigure.exception.InvalidResourceException;
import org.monarchinitiative.phenopacketlab.autoconfigure.exception.MissingPhenopacketLabResourceException;
import org.monarchinitiative.phenopacketlab.autoconfigure.exception.UndefinedPhenopacketLabResourceException;
import org.monarchinitiative.phenopacketlab.core.disease.DiseaseService;
import org.monarchinitiative.phenopacketlab.core.disease.PhenolDiseaseService;
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

    private static final Properties PROPERTIES = readProperties();

    private static final String PHENOPACKETLAB_VERSION = PROPERTIES.getProperty("phenopacketlab.version", "unknown version");

    private final PhenopacketLabProperties properties;

    public PhenopacketLabAutoConfiguration(PhenopacketLabProperties properties) {
        this.properties = properties;
    }

    @Bean
    @ConditionalOnMissingBean(name = "phenopacketLabDataDirectory")
    public Path phenopacketLabDataDirectory(PhenopacketLabProperties phenopacketLabProperties) throws UndefinedPhenopacketLabResourceException {
        String dataDir = phenopacketLabProperties.getDataDirectory();
        if (dataDir == null || dataDir.isEmpty()) {
            throw new UndefinedPhenopacketLabResourceException("Path to PhenopacketLab data directory (`phenopacketlab.data-directory`) is not specified");
        }
        Path dataDirPath = Paths.get(dataDir);
        if (!Files.isDirectory(dataDirPath)) {
            throw new UndefinedPhenopacketLabResourceException(String.format("Path to PhenopacketLab data directory '%s' does not point to an existing directory", dataDirPath));
        }
        LOGGER.info("Spooling up PhenopacketLab v{} using resources in `{}`", PHENOPACKETLAB_VERSION, dataDirPath.toAbsolutePath());
        return dataDirPath;
    }

    @Bean
    public PhenopacketLabDataResolver phenopacketLabDataResolver(Path phenopacketLabDataDirectory) throws MissingPhenopacketLabResourceException {
        return new PhenopacketLabDataResolver(phenopacketLabDataDirectory);
    }

    @Bean
    public Ontology hpo(PhenopacketLabDataResolver phenopacketLabDataResolver) {
        Path hpoPath = phenopacketLabDataResolver.hpoJsonPath();
        LOGGER.debug("Reading HPO file at {}", hpoPath.toAbsolutePath());
        return OntologyLoader.loadOntology(hpoPath.toFile());
    }

    @Bean
    public HpoService hpoService(Ontology hpo) {
        return new PhenolHpoService(hpo);
    }

    @Bean
    public DiseaseService diseaseService(PhenopacketLabDataResolver resolver,
                                         Ontology hpo) throws InvalidResourceException {
        try {
            Path annotationPath = resolver.hpoAnnotationPath();
            LOGGER.debug("Reading HPO annotation file at {}", annotationPath.toAbsolutePath());
            HpoDiseases diseases = HpoDiseaseAnnotationLoader.loadHpoDiseases(annotationPath, hpo, properties.diseaseDatabases());
            return new PhenolDiseaseService(diseases);
        } catch (IOException e) {
            throw new InvalidResourceException(e);
        }
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
