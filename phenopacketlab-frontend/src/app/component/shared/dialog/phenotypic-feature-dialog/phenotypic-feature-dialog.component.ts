import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Evidence, OntologyClass } from 'src/app/models/base';
import { Severities } from 'src/app/models/disease';
import { ConstantObject } from 'src/app/models/individual';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { Utils } from '../../utils';
import { ConstantsService } from 'src/app/services/constants.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-phenotypic-feature-dialog',
  templateUrl: './phenotypic-feature-dialog.component.html',
  styleUrls: ['./phenotypic-feature-dialog.component.scss']
})
export class PhenotypicFeatureDialogComponent implements OnInit, OnDestroy {

  phenotypicFeature: PhenotypicFeature;

  severity: OntologyClass;
  // modifiers
  modifiersNodes: OntologyTreeNode[];
  modifiersSubscription: Subscription;
  // evidence
  evidences: Evidence[];
  evidencesNodes: OntologyTreeNode[];
  evidencesSubscription: Subscription;
  // onset
  onsetsNodes: OntologyTreeNode[];
  onset: any;
  onsetsSubscription: Subscription;

  // severity
  severities: ConstantObject[];
  selectedSeverity: ConstantObject;
  severitySubscription: Subscription;
  constructor(public constantsService: ConstantsService, 
              public ref: DynamicDialogRef, 
              public config: DynamicDialogConfig,
              private messageService: MessageService) {
  }

  ngOnInit() {
    const feat = this.config.data?.phenotypicFeature;
    this.phenotypicFeature = Utils.clone(feat);

    // Get modifiers
    this.modifiersSubscription = this.constantsService.getModifiers().subscribe(nodes => {
      // we get the children from the root node sent in response
      if (nodes) {
        this.modifiersNodes = nodes.children;
      }
    }
    );
    // get Evidences
    this.evidencesSubscription = this.constantsService.getEvidences().subscribe(evidences => {
      if (evidences) {
        const nodes = [];
        for (const evidence of evidences) {
          nodes.push({ label: evidence.lbl, key: evidence.id, leaf: true, parent: undefined });
        }
        this.evidencesNodes = nodes;
      }
    });
    // get onsets
    this.onsetsSubscription = this.constantsService.getOnsets().subscribe(nodes => {
      // we get the children from the root node sent in response
      if (nodes) {
        this.onsetsNodes = <OntologyTreeNode[]>nodes.children;
      }
    });
    // severity
    this.severitySubscription = this.constantsService.getSeverities().subscribe(severities => {
      if (severities) {
        severities.forEach(severity => {
          if (this.severities === undefined) {
            this.severities = [];
          }
          this.severities.push(new ConstantObject(severity.lbl, severity.def, severity.id, severity.syn));
        });
        // initialize selected severity
        if (this.phenotypicFeature?.severity) {
          for (const sever of this.severities) {
            if (sever.id === this.phenotypicFeature.severity.id) {
              this.selectedSeverity = sever;
              return;
            }
          }
        }
      }
    });

  }

  ngOnDestroy(): void {
    if (this.modifiersSubscription) {
      this.modifiersSubscription.unsubscribe();
    }
    if (this.onsetsSubscription) {
      this.onsetsSubscription.unsubscribe();
    }
    if (this.severitySubscription) {
      this.severitySubscription.unsubscribe();
    }
    if (this.evidencesSubscription) {
      this.evidencesSubscription.unsubscribe();
    }
  }

  getSeverities() {
    return Severities.VALUES;
  }

  updateExcluded(event) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.excluded = !event.checked;
    }
  }

  updateModifiers(nodeModifiers: OntologyTreeNode[]) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.modifiers = OntologyTreeNode.toOntologyClass(nodeModifiers);
      this.phenotypicFeature.modifierNodes = [];
      for (const nodModif of nodeModifiers) {
        this.phenotypicFeature.modifierNodes.push(nodModif);
      }
    }
  }
  updateSeverity(event) {
    if (this.phenotypicFeature) {
      if (event.value) {
        this.phenotypicFeature.severity = new OntologyClass(
          event.value.id,
          event.value.lbl,
          event.key,
          `https://hpo.jax.org/app/browse/term/${event.value.id}`
          );
      } else {
        this.phenotypicFeature.severity = undefined;
      }
    }
  }
  updateOnset(timeElement: any) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.onset = timeElement;
    }
  }
  updateResolution(timeElement: any) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.resolution = timeElement;
    }
  }
  updateEvidences(nodes: any[]) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.evidence = [];
      this.phenotypicFeature.evidenceNodes = [];
      for (const node of nodes) {
        const obj = new OntologyClass(node.key, node.label);
        obj.termUrl = Evidence.getEvidenceUrl(node.key);
        const evidence = new Evidence(obj);
        this.phenotypicFeature.evidence.push(evidence);
        this.phenotypicFeature.evidenceNodes.push(node);
      }
    }
  }
  getSelectedEvidenceNodes() {
    const selectedNodes = [];
    if (this.phenotypicFeature && this.phenotypicFeature.evidence) {
      this.phenotypicFeature.evidence.forEach(evidence => {
        const node = new OntologyTreeNode();
        node.key = evidence.evidenceCode.id;
        node.label = evidence.evidenceCode.label;
        selectedNodes.push(node);
      });
    }
    return [];
  }

  onCancelClick(): void {
    this.ref.close();
  }

  onOkClick() {
    if (this.phenotypicFeature) {
      try {
        PhenotypicFeature.convert(this.phenotypicFeature);
      } catch(error) {
        this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `${error}` });
        return;
      }     
    }
    this.ref.close(this.phenotypicFeature);
  }

}
