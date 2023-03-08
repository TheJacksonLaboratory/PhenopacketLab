package org.monarchinitiative.phenopacketlab.io;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.monarchinitiative.phenopacketlab.core.functionalannotation.FunctionalVariantAnnotationService;
import org.monarchinitiative.phenopacketlab.core.functionalannotation.TranscriptSelection;
import org.monarchinitiative.phenopacketlab.core.model.VariantMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

public class VariantValidatorFunctionalAnnotationService implements FunctionalVariantAnnotationService {

    private static final Logger LOGGER = LoggerFactory.getLogger(VariantValidatorFunctionalAnnotationService.class);

    private final HttpClient client;

    public VariantValidatorFunctionalAnnotationService() {
        client = HttpClient.newHttpClient();
    }

    @Override
    public Stream<VariantMetadata> annotate(String build, String description, TranscriptSelection transcript) {
        return switch (transcript) {
            case PREFERRED -> encodeHgvsFromVariantValidator(build, description, "mane_select").stream();
            case ALL -> encodeHgvsFromVariantValidator(build, description, "all").stream();
        };
    }

    /**
     * Query the Variant validator <a href="https://rest.variantvalidator.org/">API</a> to build a Variant object
     * Method similar to
     * <a href="https://github.com/monarch-initiative/pyphetools/blob/main/pyphetools/creation/variant_validator.py">Pyphetools</a>
     *
     * @param build genome build
     * @param hgvs hgvs description
     * @param transcript transcript can be
     * @return list of VariantMetadata objects
     */
    private List<VariantMetadata> encodeHgvsFromVariantValidator(String build, String hgvs, String transcript) {
        List<VariantMetadata> results = new ArrayList<>();
        try {
            String variantValidatorUrl = "https://rest.variantvalidator.org/VariantValidator/variantvalidator/" + build + "/" + URLEncoder.encode(hgvs, StandardCharsets.UTF_8) + "/" + URLEncoder.encode(transcript, StandardCharsets.UTF_8) + "?content-type=application/json";
            // create a request
            HttpRequest request = HttpRequest.newBuilder()
                    .version(HttpClient.Version.HTTP_2)
                    .uri(URI.create(variantValidatorUrl))
                    .GET()
                    .header("accept", "application/json")
                    .build();

            // use the client to send the request
            CompletableFuture<HttpResponse<String>> response = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());
            // This blocks until the request is complete

            String result1 = response.thenApply(HttpResponse::body).get(5, TimeUnit.SECONDS);

            System.out.println(result1);
            JsonNode tree = new ObjectMapper().readTree(result1);
            System.out.println(tree);
            // Put map into variant object
            Iterator<String> names = tree.fieldNames();

            while (names.hasNext()) {
                String key = names.next();
                if (!key.equals("flag") && !key.equals("metadata")) {
                    VariantMetadata variant = new VariantMetadata(build);

                    JsonNode node = tree.get(key);
                    JsonNode geneNode = node.get("gene_ids");
                    if (geneNode != null) {
                        String hgncId = geneNode.get("hgnc_id").asText();
                        variant.setHgncId(hgncId);
                    }

                    String geneSymbol = node.get("gene_symbol").asText();
                    variant.setGeneSymbol(geneSymbol);

                    JsonNode primaryLociNode = node.get("primary_assembly_loci");
                    if (primaryLociNode != null) {
                        if (!primaryLociNode.has(build) && !primaryLociNode.has(build.toLowerCase())) {
                            throw new Exception("Could not identify" + build + " in Variant Validator response.");
                        }
                        JsonNode assemblyNode = primaryLociNode.get(build);
                        // if null it means the build is in lower case
                        if (assemblyNode == null) {
                            assemblyNode = primaryLociNode.get(build.toLowerCase());
                        }
                        // vcf record & gHgvs
                        JsonNode vcfNode = assemblyNode.get("vcf");
                        variant.setAlt(vcfNode.get("alt").asText());
                        variant.setChr(vcfNode.get("chr").asText());
                        variant.setPosition(vcfNode.get("pos").asLong());
                        variant.setRef(vcfNode.get("ref").asText());
                        if (assemblyNode.has("hgvs_genomic_description")) {
                            String gHgvs = assemblyNode.get("hgvs_genomic_description").asText();
                            variant.setGHgvs(gHgvs);
                        }
                    }
                    // cHgvs and pHgvs
                    if (node.has("hgvs_transcript_variant")) {
                        String hgvsVar = node.get("hgvs_transcript_variant").asText();
                        variant.setCHgvs(hgvsVar);
                    }
                    if (node.has("hgvs_predicted_protein_consequence")) {
                        JsonNode predictedProteinConsequenceNode = node.get("hgvs_predicted_protein_consequence");
                        if (predictedProteinConsequenceNode.has("slr")) {
                            String phgvs = predictedProteinConsequenceNode.get("slr").asText();
                            variant.setPHgvs(phgvs);
                        }
                    }
                    JsonNode refSeqRecNode = node.get("reference_sequence_records");
                    if (refSeqRecNode.has("transcript")) {
                        String varTranscript = refSeqRecNode.get("transcript").asText();
                        if (varTranscript.startsWith("https://www.ncbi.nlm.nih.gov/nuccore/")) {
//                                variant.setTranscript(varTranscript.substring(37, varTranscript.length()));
                        }
                    }

                    results.add(variant);
                    //just do the first one if many transcript (versions/ or less pathogenic ones)
//                        break;
                }
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            throw new RuntimeException(e);
        }
        return results;
    }

}
