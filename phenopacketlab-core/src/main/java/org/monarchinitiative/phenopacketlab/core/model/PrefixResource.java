package org.monarchinitiative.phenopacketlab.core.model;

/**
 * {@linkplain PrefixResource} is a "tuple" of namespace {@code prefix} and an optional {@code resource}.
 * The {@code resource} field is set to {@code null} if a corresponding {@link Resource} is absent.
 *
 * @param prefix namespace prefix for an ontology.
 * @param resource a {@link Resource} corresponding to the prefix.
 */
public record PrefixResource(String prefix, Resource resource) {

    public static PrefixResource of(String prefix, Resource resource) {
        return new PrefixResource(prefix, resource);
    }

    public static PrefixResource missing(String prefix) {
        return new PrefixResource(prefix, null);
    }

}
