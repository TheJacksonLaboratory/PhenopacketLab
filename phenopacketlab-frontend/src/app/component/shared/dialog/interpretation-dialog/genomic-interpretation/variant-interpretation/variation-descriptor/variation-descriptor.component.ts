import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

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

    moleculeContexts = Object.keys(MoleculeContext).filter((item) => isNaN(Number(item)));
    // allelic states
    allelicStatesNodes: OntologyTreeNode[];
    allelicStateSubscription: Subscription;
    selectedAllelicState: OntologyClass;
    shortListAllelicStateSubscription: Subscription;
    shortListAllelicStates: OntologyClass[];

    // structural types
    structuralTypesNodes: OntologyTreeNode[];
    structuralTypeSelected: OntologyTreeNode;
    structuralTypesSubscription: Subscription;
    structuralTypeSelectedSubscription: Subscription;

    clonedExpressions: { [s: string]: Expression } = {};
    clonedVcfRecord: VcfRecord;

    expanded = false;

    constructor(public searchService: InterpretationService,
        public interpretationService: InterpretationService,
        public messageService: MessageService,
        public dialogService: DialogService) {
    }

    ngOnInit() {
        // generate new id
        this.generateNewID();
        // Get allelic states
        this.allelicStateSubscription = this.interpretationService.getAllelicStates(this.dialogService).subscribe(nodes => {
            // we get the children from the root node sent in response
            if (nodes) {
                this.allelicStatesNodes = <OntologyTreeNode[]>nodes.children;
            }
        });
        // get short list of allelic states
        this.shortListAllelicStateSubscription = this.interpretationService.getShortListOfAllelicStates(
            this.dialogService).subscribe(data => {
            if (data) {
                this.shortListAllelicStates = [];
                for (const item of data) {
                    this.shortListAllelicStates.push(new OntologyClass(item.id, item.lbl));
                }
            }
        });
        // structural types
        this.structuralTypesSubscription = this.interpretationService.getStructuralTypes(this.dialogService).subscribe(nodes => {
            if (nodes) {
                this.structuralTypesNodes = <OntologyTreeNode[]>nodes.children;
            }
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

    generateNewID() {
        if (this.variationDescriptor) {
            this.variationDescriptor.id = uuidv4();
            this.variationDescriptorChange.emit(this.variationDescriptor);
        }
    }

    onLabelChange(label: string) {
        if (this.variationDescriptor) {
            this.variationDescriptor.label = label;
            this.variationDescriptorChange.emit(this.variationDescriptor);
        }
    }

    onDescriptionChange(description: string) {
        if (this.variationDescriptor) {
            this.variationDescriptor.description = description;
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
    onExpressionEditInit(expression: Expression) {
        this.clonedExpressions[expression.key] = { ...expression };
    }

    onExpressionEditSave(expression: Expression) {
        delete this.clonedExpressions[expression.key];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Expression is updated' });
    }

    onExpressionEditCancel(expression: Expression, index: number) {
        this.variationDescriptor.expressions[index] = this.clonedExpressions[expression.key];
        delete this.clonedExpressions[expression.key];
    }

    addVCFRecord() {
        if (this.variationDescriptor) {
            if (!this.variationDescriptor.vcfRecord) {
                this.variationDescriptor.vcfRecord = new VcfRecord();
            }
        }
    }

    onVcfRecordEditInit(vcfrecord: VcfRecord) {
        this.clonedVcfRecord = VcfRecord.clone(vcfrecord);
    }

    onVcfRecordEditSave() {
        this.clonedVcfRecord = undefined;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'VcfRecord is updated' });
    }

    onVcfRecordEditCancel() {
        this.variationDescriptor.vcfRecord = this.clonedVcfRecord;
        this.clonedVcfRecord = undefined;
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

    updateAllelicState(event) {
        if (this.variationDescriptor) {
            if (event) {
                if (event.node) {
                    this.selectedAllelicState = new OntologyClass(event.node.key, event.node.label);
                } else {
                    this.selectedAllelicState = event.value;
                }
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
