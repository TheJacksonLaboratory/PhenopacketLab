package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.monarchinitiative.phenol.annotations.io.hpo.DiseaseDatabase;
import org.monarchinitiative.phenopacketlab.autoconfigure.exception.InvalidResourceException;
import org.monarchinitiative.phenopacketlab.core.*;
import org.monarchinitiative.phenopacketlab.io.ConceptResourceAndHierarchyServices;
import org.monarchinitiative.phenopacketlab.io.ConceptResourceLoaders;
import org.monarchinitiative.phenopacketlab.io.HgncConceptLoader;
import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.io.HpoaAnnotationsLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Class for parallel loading of {@link ConceptResourceService}s.
 */
class BigBadMultipurposeLoader {

    private static final Logger LOGGER = LoggerFactory.getLogger(BigBadMultipurposeLoader.class);

    private final PhenopacketLabProperties properties;
    private final ExecutorService executor;
    private final PhenopacketLabDataResolver dataResolver;

    BigBadMultipurposeLoader(PhenopacketLabProperties properties, ExecutorService executor,
                             PhenopacketLabDataResolver dataResolver) {
        this.properties = properties;
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
                new ResourceTuple<>(dataResolver.hpoAnnotationPath(), is -> HpoaAnnotationsLoader.load(is, prepareDiseaseDatabases(properties.getDiseaseDatabasePrefixes())), result::addAllOthers),
                new ResourceTuple<>(dataResolver.mondoJsonPath(), ConceptResourceLoaders::mondo, result::setMondo),
                new ResourceTuple<>(dataResolver.soJsonPath(), ConceptResourceLoaders::so, result::setSo),
                new ResourceTuple<>(dataResolver.uberonJsonPath(), ConceptResourceLoaders::uberon, result::setUberon),
                new ResourceTuple<>(dataResolver.ncitJsonPath(), ConceptResourceLoaders::ncit, result::setNcit),
                new ResourceTuple<>(dataResolver.uoJsonPath(), ConceptResourceLoaders::uo, result::setUo),
                new ResourceTuple<>(dataResolver.gssoJsonPath(), ConceptResourceLoaders::gsso, result::setGsso),
                new ResourceTuple<>(dataResolver.ecoJsonPath(), ConceptResourceLoaders::eco, result::setEco),
                new ResourceTuple<>(dataResolver.chebiJsonPath(), ConceptResourceLoaders::chebi, result::setChebi),
                new ResourceTuple<>(dataResolver.oaeJsonPath(), ConceptResourceLoaders::oae, result::setOae)
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

        return mapToBigBadDataBlob(result);
    }

    private List<DiseaseDatabase> prepareDiseaseDatabases(List<String> diseaseDatabasePrefixes) {
        List<DiseaseDatabase> databases = new ArrayList<>();
        for (String prefix : diseaseDatabasePrefixes) {
            switch (prefix.toUpperCase()) {
                case "ORPHA", "ORPHANET" -> databases.add(DiseaseDatabase.ORPHANET);
                case "OMIM" -> databases.add(DiseaseDatabase.OMIM);
                case "DECIPHER" -> databases.add(DiseaseDatabase.DECIPHER);
            }
        }
        return databases;
    }

    private static BigBadDataBlob mapToBigBadDataBlob(Resources result) {
        // It is just a coincidence that most of the identified concept resources and ontology hierarchy services
        // are backed by Phenol Ontology. That will change in near future though.
        IdentifiedConceptResource[] spelledOut = {result.efo.conceptResource(),
                result.geno.conceptResource(),
                result.hp.conceptResource(),
                result.mondo.conceptResource(),
                result.so.conceptResource(),
                result.uberon.conceptResource(),
                result.hgnc,
                result.ncit.conceptResource(),
                result.uo.conceptResource(),
                result.gsso.conceptResource(),
                result.eco.conceptResource(),
                result.chebi.conceptResource(),
                result.oae.conceptResource()};

        IdentifiedConceptResource[] all = Stream.concat(Arrays.stream(spelledOut), result.others.stream())
                .toArray(IdentifiedConceptResource[]::new);
        ConceptResourceServiceImpl conceptResourceService = new ConceptResourceServiceImpl(all);

        OntologyHierarchyServiceRegistry hierarchyServiceRegistry = new OntologyServiceHierarchyRegistryImpl(
                result.efo.hierarchyService(),
                result.geno.hierarchyService(),
                result.hp.hierarchyService(),
                result.mondo.hierarchyService(),
                result.so.hierarchyService(),
                result.uberon.hierarchyService(),
                result.ncit.hierarchyService(),
                result.uo.hierarchyService(),
                result.gsso.hierarchyService(),
                result.eco.hierarchyService(),
                result.chebi.hierarchyService(),
                result.oae.hierarchyService()
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
        private ConceptResourceAndHierarchyServices efo;
        private ConceptResourceAndHierarchyServices geno;
        private ConceptResourceAndHierarchyServices hp;
        private ConceptResourceAndHierarchyServices mondo;
        private ConceptResourceAndHierarchyServices so;
        private ConceptResourceAndHierarchyServices uberon;
        private IdentifiedConceptResource hgnc;
        private ConceptResourceAndHierarchyServices ncit;
        private ConceptResourceAndHierarchyServices uo;
        private ConceptResourceAndHierarchyServices gsso;
        private ConceptResourceAndHierarchyServices eco;
        private ConceptResourceAndHierarchyServices chebi;
        private ConceptResourceAndHierarchyServices oae;
        private final List<IdentifiedConceptResource> others = new ArrayList<>();


        public void setEfo(ConceptResourceAndHierarchyServices efo) {
            this.efo = efo;
        }

        public void setGeno(ConceptResourceAndHierarchyServices geno) {
            this.geno = geno;
        }

        public void setHp(ConceptResourceAndHierarchyServices hp) {
            this.hp = hp;
        }

        public void setMondo(ConceptResourceAndHierarchyServices mondo) {
            this.mondo = mondo;
        }

        public void setSo(ConceptResourceAndHierarchyServices so) {
            this.so = so;
        }

        public void setUberon(ConceptResourceAndHierarchyServices uberon) {
            this.uberon = uberon;
        }

        public void setHgnc(IdentifiedConceptResource hgnc) {
            this.hgnc = hgnc;
        }

        public void setNcit(ConceptResourceAndHierarchyServices ncit) {
            this.ncit = ncit;
        }

        public void setUo(ConceptResourceAndHierarchyServices uo) { this.uo = uo; }

        public void setGsso(ConceptResourceAndHierarchyServices gsso) {
            this.gsso = gsso;
        }

        public void setEco(ConceptResourceAndHierarchyServices eco) {
            this.eco = eco;
        }

        public void setChebi(ConceptResourceAndHierarchyServices chebi) { this.chebi = chebi; }

        public void setOae(ConceptResourceAndHierarchyServices oae) { this.oae = oae; }

        public synchronized void addAllOthers(List<IdentifiedConceptResource> resources) {
            others.addAll(resources);
        }

    }

    private record ResourceTuple<T>(Path resource, Function<InputStream, T> loader, Consumer<T> consumer) {}

}
