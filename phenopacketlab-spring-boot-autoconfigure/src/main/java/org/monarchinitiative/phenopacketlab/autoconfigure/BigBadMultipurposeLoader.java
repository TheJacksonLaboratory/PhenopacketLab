package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.monarchinitiative.phenopacketlab.autoconfigure.exception.InvalidResourceException;
import org.monarchinitiative.phenopacketlab.core.*;
import org.monarchinitiative.phenopacketlab.io.ConceptResourceAndHierarchyService;
import org.monarchinitiative.phenopacketlab.io.ConceptResourceLoaders;
import org.monarchinitiative.phenopacketlab.io.HgncConceptLoader;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Class for parallel loading of {@link ConceptResourceService}s.
 */
class BigBadMultipurposeLoader {

    private static final Logger LOGGER = LoggerFactory.getLogger(BigBadMultipurposeLoader.class);

    private final ExecutorService executor;
    private final PhenopacketLabDataResolver dataResolver;

    BigBadMultipurposeLoader(ExecutorService executor,
                             PhenopacketLabDataResolver dataResolver) {
        this.executor = Objects.requireNonNull(executor);
        this.dataResolver = Objects.requireNonNull(dataResolver);
    }

    BigBadDataBlob load() throws InvalidResourceException {
        Resources result = new Resources();
        List<String> errors = Collections.synchronizedList(new LinkedList<>());
        List<ResourceTuple<?>> resources = List.of(
                new ResourceTuple<>(dataResolver.efoJsonPath(), ConceptResourceLoaders::efo, result::setEfo),
                new ResourceTuple<>(dataResolver.genoJsonPath(), ConceptResourceLoaders::geno, result::setGeno),
                new ResourceTuple<>(dataResolver.hgncCompleteSetPath(), is -> HgncConceptLoader.load(is, "HGNC_VERSION"), result::setHgnc),
                new ResourceTuple<>(dataResolver.hpJsonPath(), ConceptResourceLoaders::hpo, result::setHp),
                new ResourceTuple<>(dataResolver.mondoJsonPath(), ConceptResourceLoaders::mondo, result::setMondo),
                new ResourceTuple<>(dataResolver.soJsonPath(), ConceptResourceLoaders::so, result::setSo),
                new ResourceTuple<>(dataResolver.uberonJsonPath(), ConceptResourceLoaders::uberon, result::setUberon),
                new ResourceTuple<>(dataResolver.ncitJsonPath(), ConceptResourceLoaders::ncit, result::setNcit),
                new ResourceTuple<>(dataResolver.gssoJsonPath(), ConceptResourceLoaders::gsso, result::setGsso),
                new ResourceTuple<>(dataResolver.ecoJsonPath(), ConceptResourceLoaders::eco, result::setEco)
        );

        CountDownLatch latch = new CountDownLatch(resources.size());
        for (ResourceTuple<?> resource : resources) {
            executor.submit(prepareTask(resource, errors::add, latch));
        }

        LOGGER.info("Loading {} resources.", resources.size());
        try {
            // Wait until all loading tasks are done. Report the loading process each 20 seconds and suggest
            // killing the app if an exception was thrown on another thread, or if the loading is just taking "too long".
            int timeout = 20;
            int elapsedSeconds = 0;
            boolean resourceLoadingTasksAreFinished = latch.await(timeout, TimeUnit.SECONDS);
            while (!resourceLoadingTasksAreFinished) {
                elapsedSeconds += timeout;
                LOGGER.info("Still loading resources after {}s. Press Ctrl+C to abort if the loading is taking too long or if you see a stack trace in the previous logging output.",
                        elapsedSeconds);
                resourceLoadingTasksAreFinished = latch.await(timeout, TimeUnit.SECONDS);
            }
        } catch (InterruptedException e) { // TODO - handle
            throw new RuntimeException(e);
        }

        if (errors.isEmpty())
            LOGGER.info("Resources were loaded");
        else
            throw new InvalidResourceException(String.format("Error(s): %s", errors.stream().collect(Collectors.joining("', '", "'", "'"))));

        // TODO - load the new identified concept resource service for OMIM, ORPHA, DECIPHER

        return mapToBigBadDataBlob(result);
    }

    private static BigBadDataBlob mapToBigBadDataBlob(Resources result) {
        // It is just a coincidence that most of the identified concept resources and ontology hierarchy services
        // are backed by Phenol Ontology. That will change in near future though.
        ConceptResourceServiceImpl conceptResourceService = new ConceptResourceServiceImpl(
                result.efo.conceptResource(),
                result.geno.conceptResource(),
                result.hp.conceptResource(),
                result.mondo.conceptResource(),
                result.so.conceptResource(),
                result.uberon.conceptResource(),
                result.hgnc,
                result.ncit.conceptResource(),
                result.gsso.conceptResource(),
                result.eco.conceptResource());

        OntologyHierarchyServiceRegistry hierarchyServiceRegistry = new OntologyServiceHierarchyRegistryImpl(
                result.efo.hierarchyService(),
                result.geno.hierarchyService(),
                result.hp.hierarchyService(),
                result.mondo.hierarchyService(),
                result.so.hierarchyService(),
                result.uberon.hierarchyService(),
                result.ncit.hierarchyService(),
                result.gsso.hierarchyService(),
                result.eco.hierarchyService()
        );
        return new BigBadDataBlob(conceptResourceService, hierarchyServiceRegistry);
    }

    private static <T> Runnable prepareTask(ResourceTuple<T> resource, Consumer<String> errorConsumer, CountDownLatch latch) {
        return () -> {
            try (InputStream is = new BufferedInputStream(Files.newInputStream(resource.resource))) {
                resource.consumer.accept(resource.loader.apply(is));
            } catch (IOException e) {
                String message = String.format("Error parsing resource at %s: %s", resource.resource.toAbsolutePath(), e.getMessage());
                errorConsumer.accept(message);
            } finally {
                latch.countDown();
            }
            LOGGER.info("Loaded {}", resource.resource.toAbsolutePath());
        };
    }

    private static class Resources {
        private ConceptResourceAndHierarchyService efo;
        private ConceptResourceAndHierarchyService geno;
        private ConceptResourceAndHierarchyService hp;
        private ConceptResourceAndHierarchyService mondo;
        private ConceptResourceAndHierarchyService so;
        private ConceptResourceAndHierarchyService uberon;
        private IdentifiedConceptResource hgnc;
        private ConceptResourceAndHierarchyService ncit;
        private ConceptResourceAndHierarchyService gsso;
        private ConceptResourceAndHierarchyService eco;


        public void setEfo(ConceptResourceAndHierarchyService efo) {
            this.efo = efo;
        }

        public void setGeno(ConceptResourceAndHierarchyService geno) {
            this.geno = geno;
        }

        public void setHp(ConceptResourceAndHierarchyService hp) {
            this.hp = hp;
        }

        public void setMondo(ConceptResourceAndHierarchyService mondo) {
            this.mondo = mondo;
        }

        public void setSo(ConceptResourceAndHierarchyService so) {
            this.so = so;
        }

        public void setUberon(ConceptResourceAndHierarchyService uberon) {
            this.uberon = uberon;
        }

        public void setHgnc(IdentifiedConceptResource hgnc) {
            this.hgnc = hgnc;
        }

        public void setNcit(ConceptResourceAndHierarchyService ncit) {
            this.ncit = ncit;
        }

        public void setGsso(ConceptResourceAndHierarchyService gsso) {
            this.gsso = gsso;
        }

        public void setEco(ConceptResourceAndHierarchyService eco) {
            this.eco = eco;
        }
    }

    private record ResourceTuple<T>(Path resource, Function<InputStream, T> loader, Consumer<T> consumer) {}

}
