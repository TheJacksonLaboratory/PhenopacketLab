import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Utils } from 'src/app/component/shared/utils';
import { OntologyClass } from 'src/app/models/base';
import { Expression, MoleculeContext, VariationDescriptor, VcfRecord } from 'src/app/models/interpretation';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { ProfileSelection } from 'src/app/models/profile';
import { InterpretationService } from 'src/app/services/interpretation.service';

@Component({
    providers: [ConfirmationService, DialogService],
    selector: 'app-variation-descriptor',
    templateUrl: './variation-descriptor.component.html',
    styleUrls: ['./variation-descriptor.component.scss']
})
export class VariationDescriptorComponent implements OnInit, OnDestroy {

    @Input()
    variationDescriptor: VariationDescriptor;
    @Input()
    profile: ProfileSelection;
    @Input()
    submitted: boolean;
    @Output()
    variationDescriptorChange = new EventEmitter<VariationDescriptor>();

    id: string;
    label: string;
    description: string;


    moleculeContexts = Object.keys(MoleculeContext).filter((item) => isNaN(Number(item)));
    // allelic states
    allelicStatesNodes: OntologyTreeNode[];
    allelicStateSubscription: Subscription;
    selectedAllelicState: OntologyClass;

    // structural types
    structuralTypesNodes: OntologyTreeNode[];
    structuralTypeSelected: OntologyTreeNode;
    structuralTypesSubscription: Subscription;
    structuralTypeSelectedSubscription: Subscription;

    expanded = false;

    constructor(public searchService: InterpretationService,
        public interpretationService: InterpretationService) {
    }

    ngOnInit() {
        // Get allelic states
        this.allelicStateSubscription = this.interpretationService.getAllelicStates().subscribe(nodes => {
            // we get the children from the root node sent in response
            this.allelicStatesNodes = <OntologyTreeNode[]>nodes.children;
        });
        // structural types
        this.structuralTypesSubscription = this.interpretationService.getStructuralTypesValues().subscribe(nodes => {
            this.structuralTypesNodes = <OntologyTreeNode[]>nodes.children;
        });
    }

    ngOnDestroy(): void {
        if (this.allelicStateSubscription) {
            this.allelicStateSubscription.unsubscribe();
        }
        if (this.structuralTypesSubscription) {
            this.structuralTypesSubscription.unsubscribe();
        }
    }

    onIdChange(id: string) {
        if (this.variationDescriptor) {
            this.variationDescriptor.id = id;
            this.variationDescriptorChange.emit(this.variationDescriptor);
        }
    }

    onLabelChange(label: string) {
        if (this.variationDescriptor) {
            this.variationDescriptor.label = label;
            this.variationDescriptorChange.emit(this.variationDescriptor);
        }
    }

    onVrsRefAlleleSeqChange(refAlleleSeq: string) {
        if (this.variationDescriptor) {
            this.variationDescriptor.vrsRefAlleleSeq = refAlleleSeq;
            this.variationDescriptorChange.emit(this.variationDescriptor);
        }
    }

    addExpression() {
        if (this.variationDescriptor) {
            if (!this.variationDescriptor.expressions) {
                this.variationDescriptor.expressions = [];
            }
            const newExpression = new Expression();
            newExpression.key = Utils.getBiggestKey(this.variationDescriptor.expressions) + 1;
            this.variationDescriptor.expressions.push(newExpression);
        }
    }
    deleteExpression(expression: Expression) {
        this.variationDescriptor.expressions = this.variationDescriptor.expressions.filter(val => val.key !== expression.key);
    }
    addVCFRecord() {
        if (this.variationDescriptor) {
            if (!this.variationDescriptor.vcfRecord) {
                this.variationDescriptor.vcfRecord = new VcfRecord();
            }
        }
    }
    initializeStructuralTypeSelected(type: OntologyClass) {
        // update when an interpretation is selected
        if (type === undefined) {
            return;
        }
        const treeNode = new OntologyTreeNode();
        treeNode.key = type.id;
        treeNode.label = type.label;
        this.structuralTypeSelected = treeNode;
    }

    onDescriptionChange(description: string) {
        this.description = description;
    }

    updateAllelicState(event) {
        if (this.variationDescriptor) {
            if (event) {
                this.selectedAllelicState = new OntologyClass(event.node.key, event.node.label);
            } else {
                this.selectedAllelicState = undefined;
            }
            this.variationDescriptor.allelicState = this.selectedAllelicState;
            this.variationDescriptorChange.emit(this.variationDescriptor);
        }
    }

    updateMoleculeContext(event) {
        if (this.variationDescriptor) {
            if (event) {
                this.variationDescriptor.moleculeContext = event.value;
            } else {
                this.variationDescriptor.moleculeContext = undefined;
            }
            this.variationDescriptorChange.emit(this.variationDescriptor);
        }
    }

    updateStructuralType(event) {
        if (this.variationDescriptor) {
            if (event) {
                this.variationDescriptor.structuralType = new OntologyClass(event.node.key, event.node.label);
            } else {
                this.variationDescriptor.structuralType = undefined;
            }
            this.variationDescriptorChange.emit(this.variationDescriptor);
        }
    }

}
