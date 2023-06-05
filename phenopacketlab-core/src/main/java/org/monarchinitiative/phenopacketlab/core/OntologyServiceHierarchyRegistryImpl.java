package org.monarchinitiative.phenopacketlab.core;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class OntologyServiceHierarchyRegistryImpl implements OntologyHierarchyServiceRegistry {

    private final Map<String, OntologyHierarchyService> hierarchyServices;

    public OntologyServiceHierarchyRegistryImpl(OntologyHierarchyService... services) {
        hierarchyServices = Arrays.stream(services)
                .collect(Collectors.toMap(OntologyHierarchyService::prefix, Function.identity()));
    }

    @Override
    public Optional<OntologyHierarchyService> forPrefix(String namespacePrefix) {
        return Optional.ofNullable(hierarchyServices.get(namespacePrefix));
    }

    @Override
    public Stream<String> allPrefixes() {
        return hierarchyServices.keySet().stream();
    }
}
