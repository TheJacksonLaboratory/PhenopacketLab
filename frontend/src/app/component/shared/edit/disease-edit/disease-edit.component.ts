import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { OntologyClass, TimeElementId } from 'src/app/models/base';
import { Disease, Laterality, Severities, Stages } from 'src/app/models/disease';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-disease-edit',
    templateUrl: './disease-edit.component.html',
    styleUrls: ['./disease-edit.component.scss']
})
export class DiseaseEditComponent implements OnInit, OnDestroy {

    @Input()
    disease: Disease;
    @Output()
    diseaseChange = new EventEmitter<Disease>();

    // laterality: OntologyClass;
    severity: OntologyClass;
    // tnm Findings
    findings: OntologyClass[];
    findingsNodes: OntologyTreeNode[];
    findingsSubscription: Subscription;
    // disease Stage
    stages: OntologyClass[];
    stagesNodes: OntologyTreeNode[];

    // onset
    onset: any;
    onsetsNodes: OntologyTreeNode[];
    onsetsSubscription: Subscription;

    constructor(public phenopacketService: PhenopacketService) {
    }

    ngOnInit() {
        // get onsets
        this.onsetsSubscription = this.phenopacketService.getOnsets().subscribe(nodes => {
            // we get the children from the root node sent in response
            this.onsetsNodes = <OntologyTreeNode[]>nodes.children;
        });
        // stages
        this.stagesNodes = this.getStages();
        this.findingsSubscription = this.phenopacketService.getTnmFindings().subscribe(nodes => {
            this.findingsNodes = <OntologyTreeNode[]>nodes;
        });
    }
    ngOnDestroy(): void {
        if (this.onsetsSubscription) {
            this.onsetsSubscription.unsubscribe();
        }
        if (this.findingsSubscription) {
            this.findingsSubscription.unsubscribe();
        }
    }

    getDiseaseOnsetId() {
        return TimeElementId.DISEASE_ONSET;
    }
    getDiseaseResolutionId() {
        return TimeElementId.DISEASE_RESOLUTION;
    }
    getLateralities() {
        return Laterality.VALUES;
    }

    getStages() {
        const nodes = [];
        for (const stage of Stages.VALUES) {
            nodes.push({ label: stage.label, key: stage.id, leaf: true, parent: undefined });
        }
        return nodes;
    }
    getSeverities() {
        return Severities.VALUES;
    }

    updateOnset(timeElement: any) {
        if (this.disease) {
            this.disease.onset = timeElement;
            this.diseaseChange.emit(this.disease);
        }
    }
    updateResolution(timeElement: any) {
        if (this.disease) {
            this.disease.resolution = timeElement;
            this.diseaseChange.emit(this.disease);
        }
    }
    updateExcluded(event) {
        if (this.disease) {
            this.disease.excluded = !event.checked;
            this.diseaseChange.emit(this.disease);
        }
    }
    updateDiseaseStages(diseaseStages) {
        if (this.disease) {
            this.disease.diseaseStage = diseaseStages;
            this.diseaseChange.emit(this.disease);
        }
    }
    updateFindingStages(findings) {
        if (this.disease) {
            this.disease.clinicalTnmFinding = findings;
            this.diseaseChange.emit(this.disease);
        }
    }
    updateLaterality(laterality) {
        if (this.disease) {
            this.disease.laterality = laterality;
            this.diseaseChange.emit(this.disease);
        }
    }

}
