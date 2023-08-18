import { Convert, OntologyClass } from './base';

export class Interpretation extends Convert {
    key?: number;

    id: string;
    progressStatus: ProgressStatus;
    diagnosis: Diagnosis;
    summary: string;

    static create(obj: any): Interpretation {
        const interpretation = new Interpretation();
        if ('id' in obj) {
            interpretation.id = obj['id'];
        } else {
            throw new Error(`Phenopacket file is missing 'id' field in 'interpretation' object.`);
        }
        if ('progressStatus' in obj) {
            interpretation.progressStatus = obj['progressStatus'];
        } else {
            throw new Error(`Phenopacket file is missing 'progressStatus' field in 'interpretation' object.`);
        }
        if ('diagnosis' in obj) {
            interpretation.diagnosis = Diagnosis.convert(obj['diagnosis']);
        }
        if ('summary' in obj) {
            interpretation.summary = obj['summary'];
        }
        return interpretation;
    }
}

export enum ProgressStatus {
    UNKNOWN_PROGRESS = 'UNKNOWN_PROGRESS',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    SOLVED = 'SOLVED',
    UNSOLVED = 'UNSOLVED'
}
export class Diagnosis {
    disease: OntologyClass;
    genomicInterpretations: GenomicInterpretation[];

    static convert(obj: any): Diagnosis {
        const diagnosis = new Diagnosis();
        if ('disease' in obj) {
            diagnosis.disease = OntologyClass.convert(obj['disease']);
        }
        if ('genomicInterpretations' in obj) {
            diagnosis.genomicInterpretations = GenomicInterpretation.convert(obj['genomicInterpretations']);
        }
        return diagnosis;
    }

    toString() {
        if (this.disease) {
            return this.disease.toString();
        }
        return '';
    }
}

export enum InterpretationStatus {
    UNKNOWN_STATUS = 'UNKNOWN_STATUS',
    REJECTED = 'REJECTED',
    CANDIDATE = 'CANDIDATE',
    CONTRIBUTORY = 'CONTRIBUTORY',
    CAUSATIVE = 'CAUSATIVE'
}

export class GenomicInterpretation extends Convert {
    // used for unique identifier in a table, not part of the phenopacket schema
    key?: number;
    subjectOrBiosampleId: string;
    interpretationStatus: InterpretationStatus;
    // call
    geneDescriptor: GeneDescriptor;
    variantInterpretation: VariantInterpretation;

    static create(obj: any): GenomicInterpretation {
        const genomicInterpretation = new GenomicInterpretation();
        if ('subjectOrBiosampleId' in obj) {
            genomicInterpretation.subjectOrBiosampleId = obj['subjectOrBiosampleId'];
        } else {
            throw new Error(`Phenopacket file is missing 'subjectOrBiosampleId' field in 'genomicInterpretation' object.`);
        }
        if ('interpretationStatus' in obj) {
            genomicInterpretation.interpretationStatus = obj['interpretationStatus'];
        } else {
            throw new Error(`Phenopacket file is missing 'interpretationStatus' field in 'genomicInterpretation' object.`);
        }
        // call
        if ('geneDescriptor' in obj) {
            genomicInterpretation.geneDescriptor = GeneDescriptor.convert(obj['geneDescriptor']);
        } else if (obj['variantInterpretation']) {
            genomicInterpretation.variantInterpretation = VariantInterpretation.convert(obj['variantInterpretation']);
        } else {
            throw new Error(`Phenopacket file is missing 'geneDescriptor' or 'variantInterpretation' field in 'genomicInterpretation' object.`);
        }
        return genomicInterpretation;
    }
}
export enum AcmgPathogenicityClassification {
    NOT_PROVIDED = 'NOT_PROVIDED',
    BENIGN = 'BENIGN',
    LIKELY_BENIGN = 'LIKELY_BENIGN',
    UNCERTAIN_SIGNIFICANCE = 'UNCERTAIN_SIGNIFICANCE',
    LIKELY_PATHOGENIC = 'LIKELY_PATHOGENIC',
    PATHOGENIC = 'PATHOGENIC'
}

export enum TherapeuticActionability {
    UNKNOWN_ACTIONABILITY = 'UNKNOWN_ACTIONABILITY',
    NOT_ACTIONABLE = 'NOT_ACTIONABLE',
    ACTIONABLE = 'ACTIONABLE'
}
export enum MoleculeContext {
    unspecified_molecule_context = 'unspecified_molecule_context',
    genomic = 'genomic',
    transcript = 'transcript',
    protein = 'protein',
    UNRECOGNIZED = 'UNRECOGNIZED'
}
/**
 * VRS object : https://vrs.ga4gh.org/en/stable/schema.html
 */
export class Variation {

}
export class VcfRecord {
    genomeAssembly: string;
    chrom: string;
    pos: string;
    id: string;
    ref: string;
    alt: string;
    qual: string;
    filter: string;
    info: string;

    static convert(obj: any): VcfRecord {
        const vcfRecord = new VcfRecord();
        if ('genomeAssembly' in obj) {
            vcfRecord.genomeAssembly = obj['genomeAssembly'];
        }
        if ('chrom' in obj) {
            vcfRecord.chrom = obj['chrom'];
        }
        if ('pos' in obj) {
            vcfRecord.pos = obj['pos'];
        }
        if ('id' in obj) {
            vcfRecord.id = obj['id'];
        }
        if ('ref' in obj) {
            vcfRecord.ref = obj['ref'];
        }
        if ('alt' in obj) {
            vcfRecord.alt = obj['alt'];
        }
        if ('qual' in obj) {
            vcfRecord.qual = obj['qual'];
        }
        if ('filter' in obj) {
            vcfRecord.filter = obj['filter'];
        }
        if ('info' in obj) {
            vcfRecord.info = obj['info'];
        }
        return vcfRecord;
    }
    public static clone(obj: VcfRecord): VcfRecord {
        const vcfRecord = new VcfRecord();
        vcfRecord.chrom = obj.chrom;
        vcfRecord.alt = obj.alt;
        vcfRecord.id = obj.id;
        vcfRecord.pos = obj.pos;
        vcfRecord.ref = obj.ref;
        vcfRecord.filter = obj.filter;
        vcfRecord.info = obj.info;
        vcfRecord.genomeAssembly = obj.genomeAssembly;
        vcfRecord.qual = obj.qual;
        return vcfRecord;
    }
}
export class Extension extends Convert {
    name: string;
    value: string;

    static create(obj: any): Extension {
        const extension = new Extension();
        if ('name' in obj) {
            extension.name = obj['name'];
        }
        if ('value' in obj) {
            extension.value = obj['value'];
        }
        return extension;
    }
}
export class Expression extends Convert {
    key?: number;
    syntax: string;
    value: string;
    version: string;

    static create(obj: any): Expression {
        const expression = new Expression();
        if ('syntax' in obj) {
            expression.syntax = obj['syntax'];
        }
        if ('value' in obj) {
            expression.value = obj['value'];
        }
        if ('version' in obj) {
            expression.version = obj['version'];
        }

        return expression;
    }
}
export class VariationDescriptor {
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
    moleculeContext: MoleculeContext;
    structuralType: OntologyClass;
    vrsRefAlleleSeq: string;
    allelicState: OntologyClass;

    static convert(obj: any): VariationDescriptor {
        const variantDescriptor = new VariationDescriptor();
        if ('id' in obj) {
            variantDescriptor.id = obj['id'];
        } else {
            throw new Error(`Phenopacket file is missing 'id' field in 'variationDescriptor' object.`);
        }
        if ('variation' in obj) {
            // TODO use VRS model
            variantDescriptor.variation = obj['variation'];
        }
        if ('label' in obj) {
            variantDescriptor.label = obj['label'];
        }
        if ('description' in obj) {
            variantDescriptor.description = obj['description'];
        }
        if ('geneContext' in obj) {
            variantDescriptor.geneContext = GeneDescriptor.convert(obj['geneContext']);
        }
        if ('expressions' in obj) {
            variantDescriptor.expressions = Expression.convert(obj['expressions']);
        }
        if ('vcfRecord' in obj) {
            variantDescriptor.vcfRecord = VcfRecord.convert(obj['vcfRecord']);
        }
        if ('xrefs' in obj) {
            variantDescriptor.xrefs = obj['xrefs'];
        }
        if ('alternateLabels' in obj) {
            variantDescriptor.alternateLabels = obj['alternateLabels'];
        }
        if ('extensions' in obj) {
            variantDescriptor.extensions = Extension.convert(obj['extensions']);
        }
        if ('moleculeContext' in obj) {
            variantDescriptor.moleculeContext = obj['moleculeContext'];
        }
        if ('structuralType' in obj) {
            variantDescriptor.structuralType = OntologyClass.convert(obj['structuralType']);
        }
        if ('vrsRefAlleleSeq' in obj) {
            variantDescriptor.vrsRefAlleleSeq = obj['vrsRefAlleleSeq'];
        }
        if ('allelicState' in obj) {
            variantDescriptor.allelicState = OntologyClass.convert(obj['allelicState']);
        }
        return variantDescriptor;
    }

    toString() {
        return `${this.label} [${this.id}]`;
    }
}
export class VariantInterpretation {
    static className = 'VariantInterpretation';

    key?: number;
    acmgPathogenicityClassification: AcmgPathogenicityClassification;
    therapeuticActionability: TherapeuticActionability;
    variationDescriptor: VariationDescriptor;

    static convert(obj: any): VariantInterpretation {
        const variantInterpretation = new VariantInterpretation();
        if ('acmgPathogenicityClassification' in obj) {
            variantInterpretation.acmgPathogenicityClassification = obj['acmgPathogenicityClassification'];
        }
        if ('therapeuticActionability' in obj) {
            variantInterpretation.therapeuticActionability = obj['therapeuticActionability'];
        }
        if ('variationDescriptor' in obj) {
            variantInterpretation.variationDescriptor = VariationDescriptor.convert(obj['variationDescriptor']);
        }

        return variantInterpretation;
    }

    toString() {
        return VariantInterpretation.className;
    }
}

export class GeneDescriptor {
    static className = 'GeneDescriptor';
    valueId: string;
    symbol: string;
    description: string;
    alternateIds: string[];
    xrefs: string[];
    alternateSymbols: string[];

    static convert(obj: any): GeneDescriptor {
        const geneDesciptor = new GeneDescriptor();
        if ('valueId' in obj) {
            geneDesciptor.valueId = obj['valueId'];
        } else {
            throw new Error(`Phenopacket file is missing 'valueId' field in 'geneDescriptor' object.`);
        }
        if ('symbol' in obj) {
            geneDesciptor.symbol = obj['symbol'];
        } else {
            throw new Error(`Phenopacket file is missing 'symbol' field in 'geneDescriptor' object.`);
        }
        if ('description' in obj) {
            geneDesciptor.description = obj['description'];
        }
        if ('alternateIds' in obj) {
            geneDesciptor.alternateIds = obj['alternateIds'];
        }
        if ('xrefs' in obj) {
            geneDesciptor.xrefs = obj['xrefs'];
        }
        if ('alternateSymbols' in obj) {
            geneDesciptor.alternateSymbols = obj['alternateSymbols'];
        }

        return geneDesciptor;
    }

    toString() {
        return GeneDescriptor.className;
    }
}
