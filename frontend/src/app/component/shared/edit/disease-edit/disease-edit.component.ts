import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { OntologyClass, TimeElementId } from 'src/app/models/base';
import { Disease, Stages } from 'src/app/models/disease';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { ProfileSelection } from 'src/app/models/profile';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-disease-edit',
    templateUrl: './disease-edit.component.html',
    styleUrls: ['./disease-edit.component.scss']
})
export class DiseaseEditComponent implements OnInit, OnDestroy {

    @Input()
    disease: Disease;
    @Input()
    profile: ProfileSelection;
    @Output()
    diseaseChange = new EventEmitter<Disease>();

    // laterality: OntologyClass;
    severity: OntologyClass;
    // tnm Findings
    findings: OntologyClass[];
    tumorSelected: OntologyTreeNode;
    tumorNodes: OntologyTreeNode[];
    tumorSubscription: Subscription;
    nodeSelected: OntologyTreeNode;
    nodeNodes: OntologyTreeNode[];
    nodeSubscription: Subscription;
    metastasisSelected: OntologyTreeNode;
    metastasisNodes: OntologyTreeNode[];
    metastasisSubscription: Subscription;
    tnmFindingsSubscription: Subscription;

    // disease Stage
    stages: OntologyClass[];
    diseaseStagesNodes: OntologyTreeNode[];
    stageSelected: OntologyTreeNode;
    diseaseStagesSubscription: Subscription;
    diseaseStageSelectedSubscription: Subscription;

    // onset
    onset: any;
    onsetsNodes: OntologyTreeNode[];
    onsetsSubscription: Subscription;

    // laterality
    lateralities: OntologyClass[];
    lateralitySubscription: Subscription;

    constructor(public phenopacketService: PhenopacketService, private diseaseService: DiseaseSearchService) {
    }

    ngOnInit() {
        // get onsets
        this.onsetsSubscription = this.phenopacketService.getOnsets().subscribe(nodes => {
            // we get the children from the root node sent in response
            this.onsetsNodes = <OntologyTreeNode[]>nodes.children;
        });
        // stages
        this.stages = this.getStages();

        // laterality
        this.lateralitySubscription = this.phenopacketService.getLaterality().subscribe(lateralities => {
            lateralities.forEach(laterality => {
                if (this.lateralities === undefined) {
                    this.lateralities = [];
                }
                this.lateralities.push(new OntologyClass(laterality.id.value, laterality.name));
            });
        });
        // TNM findings
        this.tumorSubscription = this.phenopacketService.getTnmTumorFindings().subscribe(nodes => {
            this.tumorNodes = <OntologyTreeNode[]>nodes.children;
        });
        this.nodeSubscription = this.phenopacketService.getTnmNodeFindings().subscribe(nodes => {
            this.nodeNodes = <OntologyTreeNode[]>nodes.children;
        });
        this.metastasisSubscription = this.phenopacketService.getTnmMetastasisFindings().subscribe(nodes => {
            this.metastasisNodes = <OntologyTreeNode[]>nodes.children;
        });
        this.tnmFindingsSubscription = this.diseaseService.getTnmFindings().subscribe(findings => {
            // reset
            this.nodeSelected = undefined;
            this.tumorSelected = undefined;
            this.metastasisSelected = undefined;
            // update when a disease is selected
            this.initializeTnmFindingSelected(findings);
        });
        this.initializeTnmFindingSelected(this.disease?.clinicalTnmFinding);

        // Disease Stages
        this.diseaseStagesSubscription = this.phenopacketService.getDiseaseStages().subscribe(nodes => {
            this.diseaseStagesNodes = <OntologyTreeNode[]>nodes.children;
        });
        this.diseaseStageSelectedSubscription = this.diseaseService.getStages().subscribe(stages => {
            // reset
            this.stageSelected = undefined;
            // update when a disease is selected
            this.initializeDiseaseStageSelected(stages[0]);
        });
        this.initializeDiseaseStageSelected(this.disease?.diseaseStage[0]);


    }

    ngOnDestroy(): void {
        if (this.onsetsSubscription) {
            this.onsetsSubscription.unsubscribe();
        }
        if (this.tumorSubscription) {
            this.tumorSubscription.unsubscribe();
        }
        if (this.nodeSubscription) {
            this.nodeSubscription.unsubscribe();
        }
        if (this.metastasisSubscription) {
            this.metastasisSubscription.unsubscribe();
        }
        if (this.tnmFindingsSubscription) {
            this.tnmFindingsSubscription.unsubscribe();
        }
        if (this.lateralitySubscription) {
            this.lateralitySubscription.unsubscribe();
        }
        if (this.diseaseStagesSubscription) {
            this.diseaseStagesSubscription.unsubscribe();
        }
        if (this.diseaseStageSelectedSubscription) {
            this.diseaseStageSelectedSubscription.unsubscribe();
        }
    }

    initializeTnmFindingSelected(findings: OntologyClass[]) {
        // update when a disease is selected
        if (findings === undefined) {
            return;
        }
        findings.forEach(finding => {
            const treeNode = new OntologyTreeNode();
            treeNode.key = finding.id;
            treeNode.label = finding.label;
            if (finding.key === 'tumor') {
                this.tumorSelected = treeNode;
            }
            if (finding.key === 'node') {
                this.nodeSelected = treeNode;
            }
            if (finding.key === 'metastasis') {
                this.metastasisSelected = treeNode;
            }
        });
    }

    isRareProfile(): boolean {
        if (this.profile) {
            return this.profile === ProfileSelection.RARE_DISEASE;
        }
        return false;
    }

    initializeDiseaseStageSelected(stage: OntologyClass) {
        // update when a disease is selected
        if (stage === undefined) {
            return;
        }
        const treeNode = new OntologyTreeNode();
        treeNode.key = stage.id;
        treeNode.label = stage.label;
        this.stageSelected = treeNode;
    }

    getDiseaseOnsetId() {
        return TimeElementId.DISEASE_ONSET;
    }
    getDiseaseResolutionId() {
        return TimeElementId.DISEASE_RESOLUTION;
    }

    getStages() {
        return Stages.VALUES;
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
    updateDiseaseStage(event) {
        if (this.disease) {
            if (event) {
                // reset previous selection
                this.disease.diseaseStage = [];
                this.disease.diseaseStage.push(new OntologyClass(event.node.key, event.node.label));
            } else {
                this.disease.diseaseStage = undefined;
            }
            this.diseaseChange.emit(this.disease);
        }
    }
    updateLaterality(event) {
        if (this.disease) {
            if (event) {
                this.disease.laterality = event.value;
                this.disease.laterality.url = 'https://hpo.jax.org/app/browse/term/';
            } else {
                this.disease.laterality = undefined;
            }
            this.diseaseChange.emit(this.disease);
        }
    }

    /**
     * Update TNM finding list
     * @param event
     * @param tnm can be 'tumor', 'node' or 'metastasis'
     */
    updateTnmStages(event, tnm: string) {
        if (tnm !== 'tumor' && tnm !== 'node' && tnm !== 'metastasis') {
            throw new Error('Select tumor, node or metastasis');
        }
        if (this.disease) {
            if (this.disease.clinicalTnmFinding === undefined) {
                this.disease.clinicalTnmFinding = [];
            }
            // remove previous t, n or m if already present in findings
            this.disease.clinicalTnmFinding.forEach((finding, index) => {
                if (finding.key === tnm) {
                    this.disease.clinicalTnmFinding.splice(index, 1);
                }
            });
            if (event) {
                this.disease.clinicalTnmFinding.push(new OntologyClass(event.node.key, event.node.label, tnm));
            } else {
                this.disease.clinicalTnmFinding = undefined;
            }
            this.diseaseChange.emit(this.disease);
        }
    }
}
