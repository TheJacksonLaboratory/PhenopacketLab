import { v4 as uuidv4 } from 'uuid';
import { Utils } from '../component/shared/utils';
import { OntologyClass } from './base';
import { AcmgPathogenicityClassification, Expression, GeneDescriptor, MoleculeContext, VariantInterpretation,
    VariationDescriptor, VcfRecord } from './interpretation';

export class VariantMetadata {
    key?: number;
    chr: string;
    position: number;
    ref: string;
    alt: string;
    geneSymbol: string;
    hgncId: string;
    chgvs: string;
    transcript: string;
    ghgvs: string;
    phgvs: string;
    genotype: string;

    constructor(variant: VariantMetadata) {
        this.chr = variant.chr;
        this.position = variant.position;
        this.ref = variant.ref;
        this.alt = variant.alt;
        this.geneSymbol = variant.geneSymbol;
        this.hgncId = variant.hgncId;
        this.chgvs = variant.chgvs;
        this.ghgvs = variant.ghgvs;
        this.phgvs = variant.phgvs;
        this.genotype = variant.genotype;
    }
    /**
     * Transform this Variant object into a "variantInterpretation" message of the GA4GH Phenopacket schema
     * @param assembly build assembly used to make the variant search
     * @param acmg can be 'benign', 'likely benign', 'uncertain significance', 'likely pathogenic', 'pathogenic'
     * @param genotype can be 'heterozygous', 'homozygous' or 'hemizygous'
     * @return
     */
    public toVariantInterpretation(assembly: string, acmg: string, genotype: string): VariantInterpretation {
        const vDescriptor = new VariationDescriptor();
        const geneDescriptor = new GeneDescriptor();
        if (this.hgncId !== undefined && this.geneSymbol !== undefined) {
            geneDescriptor.valueId = this.hgncId;
            geneDescriptor.symbol = this.geneSymbol;
            vDescriptor.geneContext = geneDescriptor;
        }
        if (this.chgvs !== undefined) {
            const hgvsExpression = new Expression();
            hgvsExpression.syntax = 'hgvs.c';
            hgvsExpression.value = this.chgvs;
            if (vDescriptor.expressions === undefined) {
                vDescriptor.expressions = [];
            }
            hgvsExpression.key = Utils.getBiggestKey(vDescriptor.expressions) + 1;
            vDescriptor.expressions.push(hgvsExpression);
        }
        if (this.phgvs !== undefined) {
            const pHgvsExpression = new Expression();
            pHgvsExpression.syntax = 'hgvs.p';
            pHgvsExpression.value = this.phgvs;
            pHgvsExpression.key = Utils.getBiggestKey(vDescriptor.expressions) + 1;
            vDescriptor.expressions.push(pHgvsExpression);
        }
        if (this.ghgvs != null) {
            const gHgvsExpression = new Expression();
            gHgvsExpression.syntax = 'hgvs.g';
            gHgvsExpression.value = this.ghgvs;
            gHgvsExpression.key = Utils.getBiggestKey(vDescriptor.expressions) + 1;
            vDescriptor.expressions.push(gHgvsExpression);
        }
        vDescriptor.moleculeContext = MoleculeContext.genomic;
        this.genotype = genotype;
        if (this.genotype != null) {
            if (this.genotype === 'heterozygous') {
                vDescriptor.allelicState = new OntologyClass('GENO:0000135', 'heterozygous');
            } else if (this.genotype === 'homozygous') {
                vDescriptor.allelicState = new OntologyClass('GENO:0000136', 'homozygous');
            } else if (this.genotype === 'hemizygous') {
                vDescriptor.allelicState = new OntologyClass('GENO:0000134', 'hemizygous');
            } else {
                console.log('Did not recognize genotype ' + this.genotype);
            }
        }
        const vInterpretation = new VariantInterpretation();
        if (acmg != null) {
            if (acmg.toLowerCase() === 'benign') {
                vInterpretation.acmgPathogenicityClassification = AcmgPathogenicityClassification.BENIGN;
            } else if (acmg.toLowerCase() === 'likely benign') {
                vInterpretation.acmgPathogenicityClassification = AcmgPathogenicityClassification.LIKELY_BENIGN;
            } else if (acmg.toLowerCase() === 'uncertain significance') {
                vInterpretation.acmgPathogenicityClassification = AcmgPathogenicityClassification.UNCERTAIN_SIGNIFICANCE;
            } else if (acmg.toLowerCase() === 'likely pathogenic') {
                vInterpretation.acmgPathogenicityClassification = AcmgPathogenicityClassification.LIKELY_PATHOGENIC;
            } else if (acmg.toLowerCase() === 'pathogenic') {
                vInterpretation.acmgPathogenicityClassification = AcmgPathogenicityClassification.PATHOGENIC;
            }
        }
        const vcfRecord = new VcfRecord();
        vcfRecord.genomeAssembly = assembly;
        vcfRecord.chrom = this.chr;
        vcfRecord.pos = this.position;
        vcfRecord.alt = this.alt;
        vcfRecord.ref = this.ref;
        vDescriptor.vcfRecord = vcfRecord;
        vDescriptor.id = uuidv4();
        vInterpretation.variationDescriptor = vDescriptor;
        return vInterpretation;
    }
}
