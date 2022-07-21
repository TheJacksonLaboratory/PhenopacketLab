import exp from "constants";
import { Convert, OntologyClass } from "./base";

export class Interpretation extends Convert {
    id: string;
    progressStatus: ProgressStatus;
    diagnosis: Diagnosis;
    summary: string;

    static create(obj: any): Interpretation {
        const interpretation = new Interpretation();
        interpretation.id = obj['id'];
        interpretation.progressStatus = obj['progressStatus'];
        interpretation.diagnosis = Diagnosis.convert(obj['disagnosis']);
        interpretation.summary = obj['summary'];
        return interpretation;
    }
}

export enum ProgressStatus {
    UNKNOWN_PROGRESS,
    IN_PROGRESS,
    COMPLETED,
    SOLVED,
    UNSOLVED
}
export class Diagnosis {
    disease: OntologyClass;
    genomicInterpretations: GenomicInterpretation[];

    static convert(obj: any): Diagnosis {
        const diagnosis = new Diagnosis();
        diagnosis.disease = OntologyClass.convert(obj['disease']);
        diagnosis.genomicInterpretations = GenomicInterpretation.convert(obj['genomicInterpretations']);
        return diagnosis;
    }
}

export enum InterpretationStatus {
    UNKNOWN_STATUS,
    REJECTED,
    CANDIDATE,
    CONTRIBUTORY,
    CAUSATIVE
}
export class GenomicInterpretation extends Convert {
    subjectOrBiosampleId: string;
    interpretationStatus: InterpretationStatus;
    call: GeneDescriptor | VariantInterpretation;

    static create(obj: any): GenomicInterpretation {
        const genomicInterpretation = new GenomicInterpretation();
        genomicInterpretation.subjectOrBiosampleId = obj['subjectOrBiosampleId'];
        genomicInterpretation.interpretationStatus = obj['interpretationStatus'];
        let call = obj['call'];
        if (call['symbol']) {
            genomicInterpretation.call = GeneDescriptor.convert(call);
        } else {
            genomicInterpretation.call = VariantInterpretation.convert(call);
        }
        return genomicInterpretation;
    }
}
export enum AcmgPathogenicityClassification {
    NOT_PROVIDED,
    BENIGN,
    LIKELY_BENIGN,
    UNCERTAIN_SIGNIFICANCE,
    LIKELY_PATHOGENIC,
    PATHOGENIC
}

export enum TherapeuticActionability {
    UNKNOWN_ACTIONABILITY,
    NOT_ACTIONABLE,
    ACTIONABLE
}
/**
 * VRS object : https://vrs.ga4gh.org/en/stable/schema.html
 */
export class Variation {

}
export class VcfRecord {
    genomeAssembly: string;
    chrom: string;
    pos: number;
    id: string;
    ref: string;
    alt: string;
    qual: string;
    filter: string;
    info: string;

    static convert(obj: any): VcfRecord {
        const vcfRecord = new VcfRecord();
        vcfRecord.genomeAssembly = obj['genomeAssembly'];
        vcfRecord.chrom = obj['chrom'];
        vcfRecord.pos = obj['pos'];
        vcfRecord.id = obj['id'];
        vcfRecord.ref = obj['ref'];
        vcfRecord.alt = obj['alt'];
        vcfRecord.qual = obj['qual'];
        vcfRecord.filter = obj['filter'];
        vcfRecord.info = obj['info'];
        return vcfRecord;
    }
}
export class Extension extends Convert {
    name: string;
    value: string;

    static create(obj: any): Extension {
        const extension = new Extension();
        extension.name = obj['name'];
        extension.value = obj['value'];
        return extension;
    }
}
export class Expression extends Convert {
    syntax: string;
    value: string;
    version: string;

    static create(obj: any): Expression {
        const expression = new Expression();
        expression.syntax = obj['syntax'];
        expression.value = obj['value'];
        expression.version = obj['version'];
        return expression;
    }
}
export class VariantDescriptor {
    id: string;
    variation: Variation;
    label: string;
    description: string;
    geneContext: GeneDescriptor;
    expressions: Expression[];
    vcfRecord: VcfRecord;
    xrefs: string[];
    alternateLabels: string[];
    extensions: Extension[];
    moleculeContext: string;
    structuralType: OntologyClass;
    vrsRefAlleleSeq: string;
    allelicState: OntologyClass;

    static convert(obj: any): VariantDescriptor {
        const variantDescriptor = new VariantDescriptor();
        variantDescriptor.id = obj['id'];
        // TODO use VRS model
        variantDescriptor.variation = obj['variation'];
        variantDescriptor.label = obj['label'];
        variantDescriptor.description = obj['description'];
        variantDescriptor.geneContext = GeneDescriptor.convert(obj['geneContext']);
        variantDescriptor.expressions = Expression.convert(obj['expressions']);
        variantDescriptor.vcfRecord = VcfRecord.convert(obj['vcfRecord']);
        variantDescriptor.xrefs = obj['xrefs'];
        variantDescriptor.alternateLabels = obj['alternateLabels'];
        variantDescriptor.extensions = Extension.convert(obj['extensions']);
        variantDescriptor.moleculeContext = obj['moleculeContext'];
        variantDescriptor.structuralType = OntologyClass.convert(obj['structuralType']);
        variantDescriptor.vrsRefAlleleSeq = obj['vrsRefAlleleSeq'];
        variantDescriptor.allelicState = OntologyClass.convert(obj['allelicState']);

        return variantDescriptor;
    }
}
export class VariantInterpretation {
    acmgPathogenicityClassification: AcmgPathogenicityClassification;
    therapeuticActionability: TherapeuticActionability;
    variant: VariantDescriptor;

    static convert(obj: any): VariantInterpretation {
        const variantInterpretation = new VariantInterpretation();
        variantInterpretation.acmgPathogenicityClassification = obj['acmgPathogenicityClassification'];
        variantInterpretation.therapeuticActionability = obj['therapeuticActionability'];
        variantInterpretation.variant = VariantDescriptor.convert(obj['variant']);
        return variantInterpretation;
    }
}

export class GeneDescriptor {
    valueId: string;
    symbol: string;
    description: string;
    alternateIds: string[];
    xrefs: string[];
    alternateSymbols: string[];

    static convert(obj: any): GeneDescriptor {
        const geneDesciptor = new GeneDescriptor();
        geneDesciptor.valueId = obj['valueId'];
        geneDesciptor.symbol = obj['symbol'];
        geneDesciptor.description = obj['description'];
        geneDesciptor.alternateIds = obj['alternateIds'];
        geneDesciptor.xrefs = obj['xrefs'];
        geneDesciptor.alternateSymbols = obj['alternateSymbols'];
        return geneDesciptor;
    }
}