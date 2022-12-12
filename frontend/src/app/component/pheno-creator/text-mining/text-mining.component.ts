import {AfterViewChecked, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MiningState, PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { WordDialogComponent } from './word-dialog.component';

@Component({
  selector: 'app-text-mining',
  templateUrl: 'text-mining.component.html',
  styleUrls: ['text-mining.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextMiningComponent implements OnInit, OnDestroy, AfterViewChecked {

  textSearch = `Here we present a 13-year old girl with inherited myopathy with collagenopathy.

During the neonatal period weak suckling, decreased muscle tone, joint laxity and hypertension of elbows, knees and wrists were observed.

No joint dislocations or sprains occurred. Mental development, including speech, was normal.`;

  @Output()
  phenotypicFeaturesChange = new EventEmitter<PhenotypicFeature[]>();

  textSearchVisible = true;
  visible = false;

  formattedText: string;
  idxList = [[50, 57], [108, 120], [146, 157], [223, 240]];
  selectedPhenotypicFeature: PhenotypicFeature;
  phenotypicFeatures: PhenotypicFeature[] = [
    new PhenotypicFeature('HP:0003198', 'Myopathy', false, MiningState.UNKNWON, 1),
    new PhenotypicFeature('HP:0002033', 'Poor suck', false, MiningState.UNKNWON, 2),
    new PhenotypicFeature('HP:0001388', 'Joint laxity', false, MiningState.UNKNWON, 3),
    new PhenotypicFeature('HP:0001373', 'Joint dislocation', true, MiningState.UNKNWON, 4)];

  constructor(private elementRef: ElementRef, public dialog: MatDialog) {

  }

  ngOnInit(): void {

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

  }

  private formatText() {
    this.formattedText = '<pre #text>';
    let startIndex = 0;
    // iterate through pair of indices
    this.idxList.forEach((startEnd, idx) => {
      for (let index = startIndex; index < this.textSearch.length; index++) {
        // if index is between start and end, it is one of the phenotypic feature found
        if (index >= startEnd[0] && index <= startEnd[1]) {
          // start character
          if (index === startEnd[0]) {
            if (this.phenotypicFeatures[idx].textMiningState === MiningState.UNKNWON) {
              this.formattedText = `${this.formattedText}<a class='btn' style="cursor:pointer"><span id="id-${idx}" style="color:#ff7800">${this.textSearch.charAt(index)}`;
            } else if (this.phenotypicFeatures[idx].textMiningState === MiningState.APPROVED) {
              this.formattedText = `${this.formattedText}<a class='btn' style="cursor:pointer"><span id="id-${idx}" style="color:#4BB543;text-decoration: underline;">${this.textSearch.charAt(index)}`;
            } else if (this.phenotypicFeatures[idx].textMiningState === MiningState.REJECTED) {
              this.formattedText = `${this.formattedText}<a class='btn' style="cursor:pointer"><span id="id-${idx}" style="color:#F32013;text-decoration: line-through;">${this.textSearch.charAt(index)}`;
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
  }

  submit() {
    this.textSearchVisible = false;

    this.formatText();

    if (this.phenotypicFeatures && this.phenotypicFeatures.length > 0) {
      this.visible = true;
    }

  }

  updateExcluded(event) {
    if (this.selectedPhenotypicFeature) {
      this.selectedPhenotypicFeature.excluded = !event.checked;
    }
  }

  /**
   * open dialog to approve or reject term
   * @param idx
   */
  openDialog(idx) {
    this.dialog.closeAll();

    const dialogRef = this.dialog.open(WordDialogComponent, {
      data: {
        feature: this.phenotypicFeatures[idx]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      const vettedFeature = result.data;
      this.phenotypicFeatures.forEach(feature => {
        if (feature.key === vettedFeature.key) {
          feature.textMiningState = vettedFeature.state;
        }
      });
      this.formatText();
    });
  }

  startOver() {
    this.textSearchVisible = true;
  }
  addApprovedTerms() {
    const approvedFeatures = [];
    for (const feature of this.phenotypicFeatures) {
      if (feature.textMiningState === MiningState.APPROVED) {
        approvedFeatures.push(feature);
      }
    }
    this.phenotypicFeaturesChange.emit(approvedFeatures);
  }

  stateUnknown() {
    return MiningState.UNKNWON;
  }
  stateApproved() {
    return MiningState.APPROVED;
  }
  stateRejected() {
    return MiningState.REJECTED;
  }
  /**
   * Called when a row is selected in the left side table
   * @param event
   */
  onRowSelect(event) {
    // this.selectedFeature = event.data;
  }

}
