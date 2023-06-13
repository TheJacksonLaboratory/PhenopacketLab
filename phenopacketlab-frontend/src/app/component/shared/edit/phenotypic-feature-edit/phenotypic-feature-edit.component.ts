import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Evidence, OntologyClass, TimeElementId } from 'src/app/models/base';
import { Severities } from 'src/app/models/disease';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
  selector: 'app-phenotypic-feature-edit',
  templateUrl: './phenotypic-feature-edit.component.html',
  styleUrls: ['./phenotypic-feature-edit.component.scss']
})
export class PhenotypicFeatureEditComponent implements OnInit, OnDestroy {

  @Input()
  phenotypicFeature: PhenotypicFeature;
  @Output()
  phenotypicFeatureChange = new EventEmitter<PhenotypicFeature>();

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
  severities: OntologyClass[];
  severitySubscription: Subscription;

  constructor(public phenopacketService: PhenopacketService) {
  }

  ngOnInit() {

    // Get modifiers
    this.modifiersSubscription = this.phenopacketService.getModifiers().subscribe(nodes => {
      // we get the children from the root node sent in response
      this.modifiersNodes = <OntologyTreeNode[]>nodes.children;
    }
    );
    // get Evidences
    this.evidencesSubscription = this.phenopacketService.getEvidences().subscribe(evidences => {
      const nodes = [];
      for (const evidence of evidences) {
        nodes.push({ label: evidence.lbl, key: evidence.id, leaf: true, parent: undefined });
      }
      this.evidencesNodes = nodes;
    });
    // get onsets
    this.onsetsSubscription = this.phenopacketService.getOnsets().subscribe(nodes => {
      // we get the children from the root node sent in response
      this.onsetsNodes = <OntologyTreeNode[]>nodes.children;
    });
    // severity
    this.severitySubscription = this.phenopacketService.getSeverity().subscribe(severities => {
      severities.forEach(severity => {
        if (this.severities === undefined) {
          this.severities = [];
        }
        this.severities.push(new OntologyClass(severity.id, severity.lbl));
      });
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

  getPhenotypicOnsetId() {
    return TimeElementId.PHENOTYPIC_ONSET;
  }
  getPhenotypicResolutionId() {
    return TimeElementId.PHENOTYPIC_RESOLUTION;
  }
  getSeverities() {
    return Severities.VALUES;
  }

  updateExcluded(event) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.excluded = !event.checked;
      this.phenotypicFeatureChange.emit(this.phenotypicFeature);
    }
  }

  updateModifiers(nodeModifiers: OntologyTreeNode[]) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.modifiers = OntologyTreeNode.toOntologyClass(nodeModifiers, 'https://hpo.jax.org/app/browse/term');
      this.phenotypicFeature.modifierNodes = nodeModifiers;
      this.phenotypicFeatureChange.emit(this.phenotypicFeature);
    }
  }
  updateSeverity(event) {
    if (this.phenotypicFeature) {
      if (event) {
        this.phenotypicFeature.severity = event.value;
      } else {
        this.phenotypicFeature.severity = undefined;
      }
      this.phenotypicFeatureChange.emit(this.phenotypicFeature);
    }
  }
  updateOnset(timeElement: any) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.onset = timeElement;
      this.phenotypicFeatureChange.emit(this.phenotypicFeature);
    }
  }
  updateResolution(timeElement: any) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.resolution = timeElement;
      this.phenotypicFeatureChange.emit(this.phenotypicFeature);
    }
  }
  updateEvidences(nodes: any[]) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.evidence = [];
      this.phenotypicFeature.evidenceNodes = [];
      for (const node of nodes) {
        const obj = new OntologyClass(node.key, node.label);
        obj.termUrl = Evidence.getEvidenceUrl(node.key);
        const evidence = new Evidence(new OntologyClass(node.key, node.label));
        this.phenotypicFeature.evidence.push(evidence);
        this.phenotypicFeature.evidenceNodes.push(node);
      }
      this.phenotypicFeatureChange.emit(this.phenotypicFeature);
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

}
