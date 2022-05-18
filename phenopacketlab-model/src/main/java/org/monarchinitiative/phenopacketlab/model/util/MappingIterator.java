package org.monarchinitiative.phenopacketlab.model.util;

import java.util.Iterator;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;

/**
 * An iterator over {@link TARGET} backed by {@link SOURCE} iterator. Elements are mapped from {@link SOURCE} to {@link TARGET}
 * using a fallible <code>mapper</code> function.
 *
 * @param <SOURCE> source element type.
 * @param <TARGET> target element type.
 */
public class MappingIterator<SOURCE, TARGET> implements Iterator<TARGET> {

    private final Iterator<SOURCE> base;
    private final Function<SOURCE, Optional<TARGET>> mapper;

    private TARGET next;

    public static <SOURCE, TARGET> MappingIterator<SOURCE, TARGET> of(Iterator<SOURCE> base, Function<SOURCE, Optional<TARGET>> mapper) {
        return new MappingIterator<>(base, mapper);
    }

    private MappingIterator(Iterator<SOURCE> base, Function<SOURCE, Optional<TARGET>> mapper) {
        this.base = Objects.requireNonNull(base);
        this.mapper = Objects.requireNonNull(mapper);
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
