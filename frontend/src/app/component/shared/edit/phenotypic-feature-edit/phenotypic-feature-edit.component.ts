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
    this.evidencesNodes = this.getEvidences();
    // get onsets
    this.onsetsSubscription = this.phenopacketService.getOnsets().subscribe(nodes => {
      // we get the children from the root node sent in response
      this.onsetsNodes = <OntologyTreeNode[]>nodes.children;
    });
  }

  ngOnDestroy(): void {
    if (this.modifiersSubscription) {
      this.modifiersSubscription.unsubscribe();
    }
    if (this.onsetsSubscription) {
      this.onsetsSubscription.unsubscribe();
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

  getEvidences() {
    const nodes = [];
    for (const evidence of Evidence.VALUES) {
      nodes.push({ label: evidence.label, key: evidence.id, leaf: true, parent: undefined });
    }
    return nodes;
  }

  updateExcluded(event) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.excluded = !event.checked;
      this.phenotypicFeatureChange.emit(this.phenotypicFeature);
    }
  }

  updateModifiers(nodeModifiers: OntologyTreeNode[]) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.modifiers = OntologyTreeNode.toOntologyClass(nodeModifiers);
      this.phenotypicFeature.modifierNodes = nodeModifiers;
      this.phenotypicFeatureChange.emit(this.phenotypicFeature);
    }
  }
  updateSeverity(event) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.severity = event.value;
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
  updateEvidences(evidences: any[]) {
    if (this.phenotypicFeature) {
      this.phenotypicFeature.evidences = evidences;
      this.phenotypicFeatureChange.emit(this.phenotypicFeature);
    }
  }

}
