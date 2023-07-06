import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { OntologyClass, TimeElementId } from 'src/app/models/base';
import { Disease, Stages } from 'src/app/models/disease';
import { ConstantObject } from 'src/app/models/individual';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { ProfileSelection } from 'src/app/models/profile';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { Utils } from '../../utils';

@Component({
  selector: 'app-disease-dialog',
  templateUrl: './disease-dialog.component.html',
  styleUrls: ['./disease-dialog.component.scss']
})
export class DiseaseDialogComponent implements OnInit, OnDestroy {

  disease: Disease;
  profile: ProfileSelection;

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
  lateralities: ConstantObject[];
  lateralitySelected: ConstantObject;
  lateralitySubscription: Subscription;

  constructor(public phenopacketService: PhenopacketService,
    private diseaseService: DiseaseSearchService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.disease = config.data?.disease;
    this.profile = config.data?.profile;
  }

  ngOnInit() {
    // get onsets
    this.onsetsSubscription = this.phenopacketService.getOnsets().subscribe(nodes => {
      // we get the children from the root node sent in response
      if (nodes) {
        this.onsetsNodes = <OntologyTreeNode[]>nodes.children;
      }
    });
    // stages
    this.stages = this.getStages();

    // laterality
    this.lateralitySubscription = this.phenopacketService.getLateralities().subscribe(lateralities => {
      if (lateralities) {
        lateralities.forEach(laterality => {
          if (this.lateralities === undefined) {
            this.lateralities = [];
          }
          this.lateralities.push(new ConstantObject(laterality.lbl, laterality.def, laterality.id, laterality.syn));
        });
      }
    });
    this.initializeLateralitySelected(this.disease?.laterality);
    // TNM findings
    this.tumorSubscription = this.phenopacketService.getTnmTumorFindings().subscribe(nodes => {
      if (nodes) {
        this.tumorNodes = <OntologyTreeNode[]>nodes.children;
      }
    });
    this.nodeSubscription = this.phenopacketService.getTnmNodeFindings().subscribe(nodes => {
      if (nodes) {
        this.nodeNodes = <OntologyTreeNode[]>nodes.children;
      }
    });
    this.metastasisSubscription = this.phenopacketService.getTnmMetastasisFindings().subscribe(nodes => {
      if (nodes) {
        this.metastasisNodes = <OntologyTreeNode[]>nodes.children;
      }
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
      if (nodes) {
        this.diseaseStagesNodes = <OntologyTreeNode[]>nodes.children;
      }
    });
    this.diseaseStageSelectedSubscription = this.diseaseService.getStages().subscribe(stages => {
      if (stages) {
        // reset
        this.stageSelected = undefined;
        // update when a disease is selected
        this.initializeDiseaseStageSelected(stages[0]);
      }
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

  initializeLateralitySelected(laterality: OntologyClass) {
    if (laterality === undefined || this.lateralities === undefined) {
      return;
    }
    for (const lateral of this.lateralities) {
      if (lateral.id === laterality.id) {
        this.lateralitySelected = lateral;
        return;
      }
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
    }
  }
  updateResolution(timeElement: any) {
    if (this.disease) {
      this.disease.resolution = timeElement;
    }
  }
  updateExcluded(event) {
    if (this.disease) {
      this.disease.excluded = !event.checked;
    }
  }
  updateDiseaseStage(event) {
    if (this.disease) {
      if (event) {
        // reset previous selection
        this.disease.diseaseStage = [];
        const diseaseStage = new OntologyClass(event.node.key, event.node.label);
        diseaseStage.termUrl = Disease.getDiseaseURL(event.node.key);
        this.disease.diseaseStage.push(diseaseStage);
      } else {
        this.disease.diseaseStage = undefined;
      }
    }
  }
  updateLaterality(event) {
    if (this.disease) {
      if (event.value) {
        this.disease.laterality = new OntologyClass(
          event.value.id,
          event.value.lbl,
          event.value.key,
          Utils.getUrlForId(event.value.id));
      } else {
        this.disease.laterality = undefined;
      }
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
    }
  }

  updateDisease(disease) {
    this.disease = disease;
  }

  onCancelClick(): void {
    this.ref.close();
  }

  onOkClick() {
    this.ref.close(this.disease);
  }

}


