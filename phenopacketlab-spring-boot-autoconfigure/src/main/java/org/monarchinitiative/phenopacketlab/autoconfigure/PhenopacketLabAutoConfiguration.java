package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.monarchinitiative.phenopacketlab.autoconfigure.exception.InvalidResourceException;
import org.monarchinitiative.phenopacketlab.autoconfigure.exception.MissingPhenopacketLabResourceException;
import org.monarchinitiative.phenopacketlab.autoconfigure.exception.UndefinedPhenopacketLabResourceException;
import org.monarchinitiative.phenopacketlab.core.*;
import org.monarchinitiative.phenopacketlab.core.MultipurposeConceptConstantService;
import org.monarchinitiative.phenopacketlab.core.DiseaseService;
import org.monarchinitiative.phenopacketlab.core.miner.TextMiningService;
import org.monarchinitiative.phenopacketlab.core.miner.FenominalTextMiningService;
import org.monarchinitiative.phenopacketlab.core.functionalannotation.FunctionalVariantAnnotationService;
import org.monarchinitiative.phenopacketlab.io.VariantValidatorFunctionalAnnotationService;
import org.monarchinitiative.phenopacketlab.core.model.OntologyConceptResource;
import org.monarchinitiative.phenopacketlab.core.ValidateService;
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
import java.util.List;
import java.util.Properties;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

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
    public ExecutorService executorService() {
        return Executors.newFixedThreadPool(properties.getLoaderThreads(), new PhenopacketLabThreadFactory());
    }

    @Bean
    public BigBadDataBlob bigBadDataBlob(ExecutorService executorService,
                                         PhenopacketLabDataResolver phenopacketLabDataResolver) throws InvalidResourceException {
        BigBadMultipurposeLoader loader = new BigBadMultipurposeLoader(executorService, phenopacketLabDataResolver);
        return loader.load();
    }

    @Bean
    public ConceptResourceService conceptResourceService(BigBadDataBlob bigBadDataBlob) {
        return bigBadDataBlob.conceptResourceService();
    }

    @Bean
    public OntologyHierarchyServiceRegistry ontologyHierarchyServiceRegistry(BigBadDataBlob bigBadDataBlob) {
        return bigBadDataBlob.hierarchyServiceRegistry();
    }

    @Bean
    public ConceptConstantsService conceptConstantsService(ConceptResourceService conceptResourceService,
                                                           OntologyHierarchyServiceRegistry ontologyHierarchyServiceRegistry) {
        return ConceptConstantsServiceConfigurer.configure(conceptResourceService, ontologyHierarchyServiceRegistry);
    }

    @Bean
    public OntologyConceptResource hpo(ConceptResourceService conceptResourceService) {
        return conceptResourceService.forPrefix("HP")
                .filter(i -> i instanceof OntologyConceptResource)
                .map(icr -> ((OntologyConceptResource) icr))
                .orElseThrow(() -> new RuntimeException("Missing HP concept resource!"));
    }

    /**
     * A stand-in for {@link DiseaseService} and {@link PhenotypicFeatureService}.
     */
    @Bean
    public MultipurposeConceptConstantService multiConceptConstantService(PhenopacketLabProperties properties,
                                                                   ConceptResourceService conceptResourceService) {
        List<String> diseasePrefixes = properties.getDiseaseDatabasePrefixes();
        LOGGER.debug("Using disease prefixes: {}", diseasePrefixes);
        List<String> phenotypePrefixes = properties.getPhenotypePrefixes();
        LOGGER.debug("Using phenotype prefixes: {}", phenotypePrefixes);
        return new MultipurposeConceptConstantService(conceptResourceService, diseasePrefixes, phenotypePrefixes);
    }


    @Bean
    public TextMiningService textMiningService(OntologyConceptResource hpo) {
        return switch (properties.getTextMining().getProvider()) {
            case FENOMINAL -> {
                LOGGER.info("Using fenominal for text mining");
                yield new FenominalTextMiningService(hpo.ontology());
            }
        };
    }

    @Bean
    public FunctionalVariantAnnotationService functionalVariantAnnotationService() { return new VariantValidatorFunctionalAnnotationService(); }

    @Bean
    public PhenopacketLabMetadata phenopacketLabMetadata() {
        return new PhenopacketLabMetadata(properties.phenopacketSchemaVersion());
    }

    @Bean
    public ValidateService validatePhenopacketService() {
        return new ValidateService();
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
