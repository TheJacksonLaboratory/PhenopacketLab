package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.monarchinitiative.phenopacketlab.autoconfigure.exception.InvalidResourceException;
import org.monarchinitiative.phenopacketlab.core.ConceptResourceService;
import org.monarchinitiative.phenopacketlab.io.ConceptResourceLoaders;
import org.monarchinitiative.phenopacketlab.io.HgncConceptLoader;
import org.monarchinitiative.phenopacketlab.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.ConceptResourceServiceImpl;
import org.monarchinitiative.phenopacketlab.model.OntologyConceptResource;
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
 * Class for parallel loading of {@link ConceptResourceService}.
 */
class ConceptResourceServiceLoader {

    private static final Logger LOGGER = LoggerFactory.getLogger(ConceptResourceServiceLoader.class);

    private final ExecutorService executor;
    private final PhenopacketLabDataResolver dataResolver;

    ConceptResourceServiceLoader(ExecutorService executor,
                                 PhenopacketLabDataResolver dataResolver) {
        this.executor = Objects.requireNonNull(executor);
        this.dataResolver = Objects.requireNonNull(dataResolver);
    }

    ConceptResourceService load() throws InvalidResourceException {
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
                new ResourceTuple<>(dataResolver.gssoJsonPath(), ConceptResourceLoaders::gsso, result::setGsso)
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

        return new ConceptResourceServiceImpl(result.efo, result.geno, result.hp, result.mondo, result.so, result.uberon, result.hgnc, result.ncit, result.gsso);
    }

    private static <T> Runnable prepareTask(ResourceTuple<T> resource, Consumer<String> errorConsumer, CountDownLatch latch) {
        return () -> {
            try (InputStream is = new BufferedInputStream(Files.newInputStream(resource.resource))) {
                resource.resultConsumer.accept(resource.loader.apply(is));
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
        private OntologyConceptResource efo;
        private OntologyConceptResource geno;
        private OntologyConceptResource hp;
        private OntologyConceptResource mondo;
        private OntologyConceptResource so;
        private OntologyConceptResource uberon;
        private IdentifiedConceptResource hgnc;
        private OntologyConceptResource ncit;
        private OntologyConceptResource gsso;


        public void setEfo(OntologyConceptResource efo) {
            this.efo = efo;
        }

        public void setGeno(OntologyConceptResource geno) {
            this.geno = geno;
        }

        public void setHp(OntologyConceptResource hp) {
            this.hp = hp;
        }

        public void setMondo(OntologyConceptResource mondo) {
            this.mondo = mondo;
        }

        public void setSo(OntologyConceptResource so) {
            this.so = so;
        }

        public void setUberon(OntologyConceptResource uberon) {
            this.uberon = uberon;
        }

        public void setHgnc(IdentifiedConceptResource hgnc) {
            this.hgnc = hgnc;
        }

        public void setNcit(OntologyConceptResource ncit) {
            this.ncit = ncit;
        }

        public void setGsso(OntologyConceptResource gsso) {
            this.gsso = gsso;
        }
    }

    private static class ResourceTuple<T> {
        private final Path resource;
        private final Function<InputStream, T> loader;
        private final Consumer<T> resultConsumer;

        private ResourceTuple(Path resource, Function<InputStream, T> loader, Consumer<T> resultConsumer) {
            this.resource = resource;
            this.loader = loader;
            this.resultConsumer = resultConsumer;
        }
    }

}
