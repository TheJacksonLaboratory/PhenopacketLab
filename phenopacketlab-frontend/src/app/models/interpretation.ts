import { Convert, OntologyClass } from './base';

export class Interpretation extends Convert {
    // key parameter not part of the phenopacket schema, used for primeng table
    key?: number;
    id: string;
    progressStatus: ProgressStatus;
    diagnosis: Diagnosis;
    summary: string;

    static create(obj: any): Interpretation {
        const interpretation = new Interpretation();
        if (obj['id']) {
            interpretation.id = obj['id'];
        } else {
            throw new Error(`Phenopacket file is missing 'id' field in 'interpretation' object.`);
        }
        if (obj['progressStatus']) {
            interpretation.progressStatus = obj['progressStatus'];
        } else {
            throw new Error(`Phenopacket file is missing 'progressStatus' field in 'interpretation' object.`);
        }
        if (obj['diagnosis']) {
            interpretation.diagnosis = Diagnosis.convert(obj['diagnosis']);
        }
        if (obj['summary']) {
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
        if (obj['disease']) {
            diagnosis.disease = OntologyClass.convert(obj['disease']);
        }
        if (obj['genomicInterpretations']) {
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
        if (obj['subjectOrBiosampleId']) {
            genomicInterpretation.subjectOrBiosampleId = obj['subjectOrBiosampleId'];
        } else {
            throw new Error(`Phenopacket file is missing 'subjectOrBiosampleId' field in 'genomicInterpretation' object.`);
        }
        if (obj['interpretationStatus']) {
            genomicInterpretation.interpretationStatus = obj['interpretationStatus'];
        } else {
            throw new Error(`Phenopacket file is missing 'interpretationStatus' field in 'genomicInterpretation' object.`);
        }
        // call
        if (obj['geneDescriptor']) {
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
        if (obj['genomeAssembly']) {
            vcfRecord.genomeAssembly = obj['genomeAssembly'];
        }
        if (obj['chrom']) {
            vcfRecord.chrom = obj['chrom'];
        }
        if (obj['pos']) {
            vcfRecord.pos = obj['pos'];
        }
        if (obj['id']) {
            vcfRecord.id = obj['id'];
        }
        if (obj['ref']) {
            vcfRecord.ref = obj['ref'];
        }
        if (obj['alt']) {
            vcfRecord.alt = obj['alt'];
        }
        if (obj['qual']) {
            vcfRecord.qual = obj['qual'];
        }
        if (obj['filter']) {
            vcfRecord.filter = obj['filter'];
        }
        if (obj['info']) {
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
        if (obj['name']) {
            extension.name = obj['name'];
        }
        if (obj['value']) {
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
        if (obj['syntax']) {
            expression.syntax = obj['syntax'];
        }
        if (obj['value']) {
            expression.value = obj['value'];
        }
        if (obj['version']) {
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
        if (obj['id']) {
            variantDescriptor.id = obj['id'];
        } else {
            throw new Error(`Phenopacket file is missing 'id' field in 'variationDescriptor' object.`);
        }
        if (obj['variation']) {
            // TODO use VRS model
            variantDescriptor.variation = obj['variation'];
        }
        if (obj['label']) {
            variantDescriptor.label = obj['label'];
        }
        if (obj['description']) {
            variantDescriptor.description = obj['description'];
        }
        if (obj['geneContext']) {
            variantDescriptor.geneContext = GeneDescriptor.convert(obj['geneContext']);
        }
        if (obj['expressions']) {
            variantDescriptor.expressions = Expression.convert(obj['expressions']);
        }
        if (obj['vcfRecord']) {
            variantDescriptor.vcfRecord = VcfRecord.convert(obj['vcfRecord']);
        }
        if (obj['xrefs']) {
            variantDescriptor.xrefs = obj['xrefs'];
        }
        if (obj['alternateLabels']) {
            variantDescriptor.alternateLabels = obj['alternateLabels'];
        }
        if (obj['extensions']) {
            variantDescriptor.extensions = Extension.convert(obj['extensions']);
        }
        if (obj['moleculeContext']) {
            variantDescriptor.moleculeContext = obj['moleculeContext'];
        }
        if (obj['structuralType']) {
            variantDescriptor.structuralType = OntologyClass.convert(obj['structuralType']);
        }
        if (obj['vrsRefAlleleSeq']) {
            variantDescriptor.vrsRefAlleleSeq = obj['vrsRefAlleleSeq'];
        }
        if (obj['allelicState']) {
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
        if (obj['acmgPathogenicityClassification']) {
            variantInterpretation.acmgPathogenicityClassification = obj['acmgPathogenicityClassification'];
        }
        if (obj['therapeuticActionability']) {
            variantInterpretation.therapeuticActionability = obj['therapeuticActionability'];
        }
        if (obj['variationDescriptor']) {
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
        if (obj['valueId']) {
            geneDesciptor.valueId = obj['valueId'];
        } else {
            throw new Error(`Phenopacket file is missing 'valueId' field in 'geneDescriptor' object.`);
        }
        if (obj['symbol']) {
            geneDesciptor.symbol = obj['symbol'];
        } else {
            throw new Error(`Phenopacket file is missing 'symbol' field in 'geneDescriptor' object.`);
        }
        if (obj['description']) {
            geneDesciptor.description = obj['description'];
        }
        if (obj['alternateIds']) {
            geneDesciptor.alternateIds = obj['alternateIds'];
        }
        if (obj['xrefs']) {
            geneDesciptor.xrefs = obj['xrefs'];
        }
        if (obj['alternateSymbols']) {
            geneDesciptor.alternateSymbols = obj['alternateSymbols'];
        }

        return geneDesciptor;
    }

    toString() {
        return GeneDescriptor.className;
    }
}
