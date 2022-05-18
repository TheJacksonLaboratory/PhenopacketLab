package org.monarchinitiative.phenopacketlab.model;

import java.util.Iterator;
import java.util.Optional;
import java.util.function.Function;

/**
 * An iterator over {@link TARGET} backed by {@link SOURCE} iterator. Elements are mapped from {@link SOURCE} to {@link TARGET}
 * using a fallible <code>mapper</code> function.
 *
 * @param <SOURCE> source element type.
 * @param <TARGET> target element type.
 */
class MappingIterator<SOURCE, TARGET> implements Iterator<TARGET> {

    private final Iterator<SOURCE> base;
    private final Function<SOURCE, Optional<TARGET>> mapper;

    private TARGET next;

    MappingIterator(Iterator<SOURCE> base, Function<SOURCE, Optional<TARGET>> mapper) {
        this.base = base;
        this.mapper = mapper;
        this.next = readNextElement();
    }

    private TARGET readNextElement() {
        while (base.hasNext()) {
            Optional<TARGET> mapped = mapper.apply(base.next());
            if (mapped.isPresent())
                return mapped.get();
        }
        return null;
    }

    @Override
    public boolean hasNext() {
        return next != null;
    }

    @Override
    public TARGET next() {
        TARGET current = next;
        next = readNextElement();
        return current;
    }


}
