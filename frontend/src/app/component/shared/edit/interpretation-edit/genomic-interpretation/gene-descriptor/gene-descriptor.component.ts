import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { GeneDescriptor } from 'src/app/models/interpretation';
import { InterpretationService } from 'src/app/services/interpretation.service';

@Component({
    providers: [ConfirmationService, DialogService],
    selector: 'app-gene-descriptor',
    templateUrl: './gene-descriptor.component.html',
    styleUrls: ['./gene-descriptor.component.scss']
})
export class GeneDescriptorComponent implements OnInit, OnDestroy {

    @Input()
    geneDescriptor: GeneDescriptor;
    @Output()
    geneDescriptorChange = new EventEmitter<GeneDescriptor>();


    constructor(public searchService: InterpretationService,
        public interpretationService: InterpretationService) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }

}
