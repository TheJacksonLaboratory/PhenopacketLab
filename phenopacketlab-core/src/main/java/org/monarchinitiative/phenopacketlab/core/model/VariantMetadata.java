package org.monarchinitiative.phenopacketlab.core.model;

public class VariantMetadata {

    private String chr;
    private Long position;
    private String ref;
    private String alt;
    private String geneSymbol;
    private String hgncId;
    private String gHgvs;
    private String cHgvs;
    private String pHgvs;

    public String getChr() {
        return chr;
    }

    public void setChr(String chr) {
        this.chr = chr;
    }
    public Long getPosition() {
        return position;
    }

    public void setPosition(Long position) {
        this.position = position;
    }

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    public String getGeneSymbol() {
        return geneSymbol;
    }

    public void setGeneSymbol(String geneSymbol) {
        this.geneSymbol = geneSymbol;
    }

    public String getHgncId() {
        return hgncId;
    }

    public void setHgncId(String hgnc) {
        this.hgncId = hgnc;
    }

    public String getCHgvs() {
        return cHgvs;
    }

    public void setCHgvs(String cHgvs) {
        this.cHgvs = cHgvs;
    }

    public String getGHgvs() {
        return gHgvs;
    }

    public void setGHgvs(String gHgvs) {
        this.gHgvs = gHgvs;
    }

    public String getPHgvs() { return pHgvs; }

    public void setPHgvs(String pHgvs) { this.pHgvs = pHgvs; }

}
