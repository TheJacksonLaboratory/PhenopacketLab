import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { MoleculeContext, VariationDescriptor } from 'src/app/models/interpretation';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
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
    //     this.structuralTypeSelectedSubscription = this.interpretationService.getStructuralTypes().subscribe(stages => {
    //         // reset
    //         this.structuralTypeSelected = undefined;
    //         // update when a disease is selected
    //         this.initializeStructuralTypeSelected(stages[0]);
    //     });
    //     this.initializeStructuralTypeSelected(this.variationDescriptor?.structuralType);
    }

    ngOnDestroy(): void {
        if (this.allelicStateSubscription) {
            this.allelicStateSubscription.unsubscribe();
        }
    }

    onIdChange(id: string) {
        this.id = id;
    }

    onLabelChange(label: string) {
        this.label = label;
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
