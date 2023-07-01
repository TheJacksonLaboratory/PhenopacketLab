import { AfterViewChecked, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { TimeElement } from 'src/app/models/base';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { MiningState, PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';
import { SpinnerDialogComponent } from '../spinner-dialog/spinner-dialog.component';
import { WordDialogComponent } from './word-dialog.component';

const unknownColor = '#ff7800';
const approvedColor = '#4BB543';
const rejectedColor = '#F32013';

@Component({
  selector: 'app-text-mining',
  templateUrl: 'text-mining.component.html',
  styleUrls: ['text-mining.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextMiningComponent implements OnInit, OnDestroy, AfterViewChecked {

  textSearch = 'Here we present a 13-year-old girl with inherited myopathy associated with collagenopathy.\n\nDuring the neonatal period weak sucking, decreased muscle tone, joint laxity and hyperextension of elbows, knees and wrists were observed.\n\nNo joint dislocations or sprains occurred. Mental development, including speech, was normal.';

  @Output()
  phenotypicFeaturesChange = new EventEmitter<PhenotypicFeature[]>();

  textSearchVisible = true;
  visible = false;

  formattedText: string;
  idxList = [];
  selectedPhenotypicFeature: PhenotypicFeature;
  phenotypicFeatures: PhenotypicFeature[];

  spinnerDialogRef: DynamicDialogRef;

  onsetsNodes: OntologyTreeNode[];
  onsetsSubscription: Subscription;
  onsetApplied = false;
  onset: TimeElement;

  textMinedFeatures: string[];

  constructor(private phenotypeSearchService: PhenotypeSearchService,
    public phenopacketService: PhenopacketService,
    private elementRef: ElementRef,
    private dialogService: DialogService) {

  }

  ngOnInit(): void {
    // get Onset from individual
    const phenopacket = this.phenopacketService.phenopacket;
    this.onset = phenopacket?.subject?.timeAtLastEncounter;

    // get onsets
    this.onsetsSubscription = this.phenopacketService.getOnsets().subscribe(nodes => {
      // we get the children from the root node sent in response
      if (nodes) {
        this.onsetsNodes = <OntologyTreeNode[]>nodes.children;
      }
    });

  }

  ngAfterViewChecked() {
    // bind even listener after the html is loaded
    this.idxList.forEach((startEnd, idx) => {
      if (this.elementRef.nativeElement.querySelector(`#id-${idx}`)) {
        this.elementRef.nativeElement.querySelector(`#id-${idx}`).addEventListener('click', this.openDialog.bind(this, idx));
      }
    });

  }
  ngOnDestroy(): void {
    if (this.onsetsSubscription) {
      this.onsetsSubscription.unsubscribe();
    }
  }

  private formatText() {
    this.formattedText = '<pre #text>';
    let startIndex = 0;
    // iterate through pair of indices
    // TODO make sure idxList is sorted
    this.idxList.forEach((startEnd, idx) => {
      for (let index = startIndex; index < this.textSearch.length; index++) {
        // if index is between start and end, it is one of the phenotypic feature found
        if (index >= startEnd[0] && index <= startEnd[1]) {
          // start character
          if (index === startEnd[0]) {
            if (this.phenotypicFeatures[idx].textMiningState === MiningState.UNKNOWN) {
              this.formattedText = `${this.formattedText}<a class='btn' style="cursor:pointer"><span id="id-${idx}" style="color:${unknownColor}">${this.textSearch.charAt(index)}`;
            } else if (this.phenotypicFeatures[idx].textMiningState === MiningState.APPROVED) {
              this.formattedText = `${this.formattedText}<a class='btn' style="cursor:pointer"><span id="id-${idx}" style="color:${approvedColor};text-decoration: underline;">${this.textSearch.charAt(index)}`;
            } else if (this.phenotypicFeatures[idx].textMiningState === MiningState.REJECTED) {
              this.formattedText = `${this.formattedText}<a class='btn' style="cursor:pointer"><span id="id-${idx}" style="color:${rejectedColor};text-decoration: line-through;">${this.textSearch.charAt(index)}`;
            }
          }
          // end character
          if (index === startEnd[1]) {
            this.formattedText = `${this.formattedText}${this.textSearch.charAt(index)}</span></a>`;
            startIndex = startEnd[1] + 1;
            // if term is not the last in the list of terms, we break from the loop
            if (idx < this.idxList.length - 1) {
              break;
            }
          }
          // characters in between
          if (index > startEnd[0] && index < startEnd[1]) {
            this.formattedText = `${this.formattedText}${this.textSearch.charAt(index)}`;
          }

        } else {
          // concatenate back the characters together
          this.formattedText = `${this.formattedText}${this.textSearch.charAt(index)}`;
        }
      }
    });
    if (this.idxList.length === 0) {
      this.formattedText = `<pre #text>${this.textSearch}</pre>`;
    }
  }

  setChips() {
    this.textMinedFeatures = undefined;
    this.textMinedFeatures = [];
    for (const feature of this.phenotypicFeatures) {
      if (feature.textMiningState !== MiningState.REJECTED) {
        this.textMinedFeatures.push(feature.type.toString());
      }
    }
  }

  submit() {
    this.textSearchVisible = false;
    this.openSpinnerDialog();
    this.phenotypeSearchService.queryTextMiner(this.textSearch).subscribe(resp => {
      if (resp) {
        const concepts = resp.concepts;
        this.textSearch = resp.payload;
        // reset
        this.idxList = [];
        this.phenotypicFeatures = [];
        this.textMinedFeatures = [];
        concepts.forEach((term, idx) => {
          this.idxList.push([term.start, term.end]);
          const excluded = !term.present;
          const feature = new PhenotypicFeature(term.id, term.label, excluded, MiningState.UNKNOWN, idx);
          this.phenotypicFeatures.push(feature);
          this.textMinedFeatures.push(feature.type.toString());
        });

        // show result in formatted text
        this.formatText();

        if (this.phenotypicFeatures && this.phenotypicFeatures.length > 0) {
          this.visible = true;
        }
      }
      this.spinnerDialogRef.close();
    },
      (error) => {
        console.log(error);
        this.spinnerDialogRef.close();
      });

  }

  openSpinnerDialog() {
    this.spinnerDialogRef = this.dialogService.open(SpinnerDialogComponent, {
      closable: false,
      modal: true,
      data: { loadingMessage: 'Searching for feature terms...' }
    });
  }
  updateExcluded(event) {
    if (this.selectedPhenotypicFeature) {
      this.selectedPhenotypicFeature.excluded = !event.checked;
    }
  }

  onChipRemove(event) {
    const featureName = event.value;
    for (const feature of this.phenotypicFeatures) {
      if (feature.type.toString() === featureName) {
        feature.textMiningState = MiningState.REJECTED;
      }
    }
    this.formatText();
  }

  getStyleClass(featureName: string) {
    for (const feature of this.phenotypicFeatures) {
      if (featureName === feature.type.toString()) {
        if (feature.textMiningState === MiningState.UNKNOWN) {
          return { 'background-color': unknownColor, 'color': 'white' };
        } else if (feature.textMiningState === MiningState.APPROVED) {
          return { 'background-color': approvedColor, 'color': 'white' };
        } else if (feature.textMiningState === MiningState.REJECTED) {
          return { 'background-color': rejectedColor, 'color': 'white' };
        }
      }
    }
  }

  /**
   * open dialog to approve or reject term
   * @param idx
   */
  openDialog(idx) {
    const dialogRef = this.dialogService.open(WordDialogComponent, {
      width: '25rem',
      height: '18rem',
      data: {
        feature: this.phenotypicFeatures[idx]
      }
    });
    dialogRef.onClose.subscribe(result => {
      if (result) {
        const vettedFeature = result;

        // update the mining state of the phenotypic feature
        for (const feature of this.phenotypicFeatures) {
          if (feature.key === vettedFeature.key) {
            feature.textMiningState = vettedFeature.state;
          }
        }
        this.formatText();
        this.setChips();
      }
    });
  }

  /**
   * Approve all terms
   */
  approveAll() {
    this.textMinedFeatures = undefined;
    this.phenotypicFeatures.forEach(feature => {
      feature.textMiningState = MiningState.APPROVED;
    });
    this.formatText();
    this.setChips();
  }
  rejectAll() {
    this.phenotypicFeatures.forEach(feature => {
      feature.textMiningState = MiningState.REJECTED;
    });
    this.formatText();
    this.setChips();
  }
  startOver() {
    this.textSearchVisible = true;
    this.phenotypicFeatures = [];
    this.textMinedFeatures = [];
    this.visible = false;
  }
  addApprovedTerms() {
    const approvedFeatures = [];
    for (const feature of this.phenotypicFeatures) {
      if (feature.textMiningState === MiningState.APPROVED) {
        approvedFeatures.push(feature);
      }
    }
    // reset table
    this.textSearchVisible = true;
    this.phenotypicFeatures = [];
    this.textMinedFeatures = [];
    this.visible = false;

    this.phenotypicFeaturesChange.emit(approvedFeatures);
  }

  stateUnknown() {
    return MiningState.UNKNOWN;
  }
  stateApproved() {
    return MiningState.APPROVED;
  }
  stateRejected() {
    return MiningState.REJECTED;
  }

  // Onset
  updateAgeOnset(timeElement: any) {
    this.onset = timeElement;
  }

  applyOnset() {
    this.onsetApplied = true;
    this.phenotypicFeatures.forEach(feature => {
      feature.onset = this.onset.copy();
    });
  }

  editOnset() {
    this.onsetApplied = false;
  }

}
