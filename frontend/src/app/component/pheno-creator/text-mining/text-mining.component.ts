import {AfterViewChecked, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MiningState, PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';
import { SpinnerDialogComponent } from '../../shared/spinner-dialog/spinner-dialog.component';
import { WordDialogComponent } from './word-dialog.component';

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

  spinnerDialogRef: any;

  constructor(private phenotypeSearchService: PhenotypeSearchService, private elementRef: ElementRef, public dialog: MatDialog) {

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
    // TODO make sure idxList is sorted
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
    this.openSpinnerDialog();
    this.phenotypeSearchService.queryTextMiner(this.textSearch).subscribe(resp => {
      const result = resp?.result;
      const concepts = result?.concepts;
      // reset
      this.idxList = [];
      this.phenotypicFeatures = [];
      concepts.forEach((term, idx) => {
        this.idxList.push([term.start, term.end]);
        this.phenotypicFeatures.push(new PhenotypicFeature(term.id, term.label, term.excluded, MiningState.UNKNWON, idx));
      });

      // show result in formatted text
      this.formatText();

      if (this.phenotypicFeatures && this.phenotypicFeatures.length > 0) {
        this.visible = true;
      }
      this.spinnerDialogRef.close();
    },
    (error) => {
        console.log(error);
        this.spinnerDialogRef.close();
    });

  }

  openSpinnerDialog() {
    this.spinnerDialogRef = this.dialog.open(SpinnerDialogComponent, {
        panelClass: 'transparent',
        disableClose: true
    });
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
    this.phenotypicFeatures = [];
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
    this.visible = false;

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
   * Called when a row is selected on the left side table
   * @param event
   */
  onRowSelect(event) {
    // this.selectedFeature = event.data;
  }

}