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

    onDescriptionChange(description: string) {
        this.description = description;
    }

    updateAllelicState(event) {
        if (event.value) {
            this.selectedAllelicState = new OntologyClass(event.value.id, event.value.name);
        }
    }

    updateMoleculeContext(moleculeContext: MoleculeContext) {

    }

}
