package org.monarchinitiative.phenopacketlab.core;

import org.monarchinitiative.phenopacketlab.core.model.IdentifiedConceptResource;
import org.monarchinitiative.phenopacketlab.core.model.Resource;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// TODO(ielis) - check the IMPL and remove the bad method
public class ConceptResourceServiceImpl implements ConceptResourceService {

    private final Map<String, IdentifiedConceptResource> conceptResources;

    public ConceptResourceServiceImpl(IdentifiedConceptResource... resources) {
        conceptResources = Arrays.stream(resources)
                .collect(Collectors.toMap(icr -> icr.getResource().getNamespacePrefix(),
                        Function.identity()));
    }

    @Override
    public Optional<IdentifiedConceptResource> forPrefix(String namespacePrefix) {
        return Optional.ofNullable(conceptResources.get(namespacePrefix));
    }

    @Override
    public Stream<Resource> conceptResources() {
        return conceptResources.values().stream()
                .map(IdentifiedConceptResource::getResource);
    }

}
