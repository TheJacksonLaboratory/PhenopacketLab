import {Component, OnInit} from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { DialogMode, OntologyClass } from 'src/app/models/base';
import { Diagnosis, GenomicInterpretation, Interpretation, InterpretationStatus, ProgressStatus } from 'src/app/models/interpretation';
import { Phenopacket } from 'src/app/models/phenopacket';
import { ProfileSelection } from 'src/app/models/profile';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { Utils } from '../../utils';
import { GenomicInterpretationDialogComponent } from './genomic-interpretation/genomic-interpretation-dialog.component';

@Component({
  selector: 'app-interpretation-dialog',
  templateUrl: './interpretation-dialog.component.html',
  styleUrls: ['./interpretation-dialog.component.scss']
})

export class InterpretationDialogComponent implements OnInit {

  interpretation: Interpretation;
  phenopacket: Phenopacket;
  profile: ProfileSelection;

  submitted = false;
  isPrivateInfoWarnSelected: boolean;

  visible = false;
  id: string;

  // progress status
  selectedProgressStatus: ProgressStatus;
  progressStatuses: ProgressStatus[];
  // diseases
  diseaseItems: OntologyClass[];
  selectedDisease: OntologyClass;
  diseaseItemsCount: number;
  diseaseItemsSearchstate = 'inactive';
  diseaseQuery = new Subject();
  diseaseQueryText: string;
  diseaseItemsNotFoundFlag = false;
  loadingDiseaseItemsSearchResults = false;

  // Can be 'edit' or 'add'
  mode: DialogMode = DialogMode.ADD;
  okButtonLabel = 'Add interpretation';

  genomicInterpretations: GenomicInterpretation[];

  refGenomicDialog: DynamicDialogRef;

  constructor(public phenopacketService: PhenopacketService,
    public diseaseService: DiseaseSearchService,
    private messageService: MessageService,
    private dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private primengConfig: PrimeNGConfig) {
    this.interpretation = config.data?.interpretation;
    this.phenopacket = config.data?.phenopacket;
    this.profile = config.data?.profile;
    this.mode = config.data?.mode;
    if (this.mode === DialogMode.ADD) {
      this.okButtonLabel = 'Add Interpretation';
    } else if (this.mode === DialogMode.EDIT) {
      this.okButtonLabel = 'Save Interpretation';
    }
  }

  ngOnInit() {
    this.primengConfig.ripple = true;

    // get diseases
    this.diseaseQuery.pipe(debounceTime(425),
      distinctUntilChanged()).subscribe((val: string) => {
        if (this.hasValidDiseaseInput(val)) {
          this.loadingDiseaseItemsSearchResults = true;
          this.diseaseQueryText = val;
          this.diseaseService.searchDiseases(val).subscribe((data) => {
            this.diseaseItems = [];
            for (const concept of data.foundConcepts) {
              this.diseaseItems.push(new OntologyClass(concept.id, concept.lbl, concept.id));
            }
            this.diseaseItemsCount = data.numberOfTerms;
            this.diseaseItemsNotFoundFlag = (this.diseaseItemsCount === 0);
            this.diseaseItemsSearchstate = 'active';
          }, (error) => {
            console.log(error);
            this.loadingDiseaseItemsSearchResults = false;
          }, () => {
            this.loadingDiseaseItemsSearchResults = false;
          });

        } else {
          this.diseaseItemsSearchstate = 'inactive';
        }
      }); // End debounce subscribe

    // statuses
    this.progressStatuses = this.getProgressStatuses();

    // initialize
    if (this.interpretation) {
      this.id = this.interpretation.id;
      this.isPrivateInfoWarnSelected = this.interpretation.isPrivateInfoWarnSelected;
      this.selectedProgressStatus = this.interpretation.progressStatus;
      this.selectedDisease = this.interpretation.diagnosis?.disease;
      if (this.selectedDisease) {
        this.diseaseItems = [this.selectedDisease];
      }
      this.genomicInterpretations = this.interpretation.diagnosis?.genomicInterpretations;
    }
  }

  onIdChange(event) {
    this.id = event;
  }

  addGenomicInterpretation() {
    if (this.genomicInterpretations === undefined || this.genomicInterpretations === null) {
      this.genomicInterpretations = [];
    }
    const genomicInterpretation = new GenomicInterpretation();
    // check that subject id has been created beforehand
    if (this.phenopacket.subject.id) {
      genomicInterpretation.subjectOrBiosampleId = this.phenopacket.subject.id;
    } else {
      this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `A subject ID needs to be added to the Individual before creating a Genomic Interpretation.` });
      return;
    }
    // default to UNKNOWN
    genomicInterpretation.interpretationStatus = InterpretationStatus.UNKNOWN_STATUS;
    genomicInterpretation.key = Utils.getBiggestKey(this.genomicInterpretations) + 1;
    // open edit dialog
    this.editGenomicInterpretation(genomicInterpretation);
  }
  deleteGenomicInterpretation(genomicInterpretation: GenomicInterpretation) {
    this.genomicInterpretations = this.genomicInterpretations.filter(val => val.key !== genomicInterpretation.key);
  }
  editGenomicInterpretation(genomicInterpretation: GenomicInterpretation) {
    // open genomic interpretation dialog
    this.refGenomicDialog = this.dialogService.open(GenomicInterpretationDialogComponent, {
      header: 'Enter Genomic Interpretation',
      width: '70%',
      contentStyle: { 'overflow': 'auto' },
      baseZIndex: 10000,
      resizable: true,
      draggable: true,
      data: {
        genomicInterpretation: genomicInterpretation,
        profile: this.profile,
        submitted: this.submitted
      }
    });

    this.refGenomicDialog.onClose.subscribe((genomicInterpret: GenomicInterpretation) => {
      if (genomicInterpret) {
        const indexToUpdate = this.genomicInterpretations.findIndex(item => item.key === genomicInterpret.key);
        if (indexToUpdate === -1) {
          this.genomicInterpretations.push(genomicInterpret);
        } else {
          this.genomicInterpretations[indexToUpdate] = genomicInterpret;
          this.genomicInterpretations = Object.assign([], this.genomicInterpretations);
        }
      }
    });
  }

  updateProgressStatus(event) {
    this.selectedProgressStatus = event.value;
  }
  // disease
  diseaseContentChanging(input: string) {
    this.diseaseQuery.next(input);
  }
  hasValidDiseaseInput(qString: string) {
    return (qString && qString.length >= 3);
  }
  updateDiseaseItemSelection(diseaseItem: OntologyClass) {
    if (diseaseItem) {
      if (this.diseaseItemsSearchstate === 'active') {
        this.diseaseItemsSearchstate = 'inactive';
      }
      diseaseItem.termUrl = Utils.getUrlForId(diseaseItem.id);
      this.selectedDisease = diseaseItem;
    } else {
      this.selectedDisease = undefined;
    }
  }

  updateIsPrivateInfoWarn(isPrivateInfoWarnSelected: boolean) {
    if (this.interpretation) {
      this.interpretation.isPrivateInfoWarnSelected = isPrivateInfoWarnSelected;
    }
  }
  generateNewID() {
    this.id = uuidv4();
  }
  /**
   *
   * @returns if false then we shouldn't update the interpretation
   */
  updateInterpretation(): boolean {
    this.submitted = true;
    if (this.id === undefined) {
      this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please fill in the interpretation ID.' });
      return false;
    }
    // check if personal info has been checked
    if (!this.isPrivateInfoWarnSelected) {
      this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please, confirm that the ID used is not a MRN, DOB, initials, location, email, name, address, or any other personal identifying information.` });
      return false;
    }
    if (this.selectedProgressStatus === undefined || this.selectedProgressStatus === null) {
      this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please select the progress status.' });
      return false;
    }
    if (this.selectedDisease === undefined || this.selectedDisease === null) {
      this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: 'Please select a disease term for the disease diagnosis.' });
      return false;
    }
    // check if an interpretation was already added for a selected diagnosis
    if (this.phenopacket?.interpretations && this.mode === DialogMode.ADD) {
      for (const interpret of this.phenopacket.interpretations) {
        if (interpret.diagnosis.disease.id === this.selectedDisease.id) {
          this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `An interpretation with the selected diagnosis \'${this.selectedDisease.toString()}\' already exists. Please selected another disease to be able to add this interpretation.` });
          return false;
        }
      }

    }

    this.saveInterpretation();
    return true;
  }

  saveInterpretation() {
    // initialize new interpretation object
    const interpretation = new Interpretation();
    interpretation.diagnosis = new Diagnosis();
    interpretation.id = this.id;
    interpretation.diagnosis.genomicInterpretations = this.genomicInterpretations;
    interpretation.progressStatus = this.selectedProgressStatus;
    interpretation.diagnosis.disease = this.selectedDisease;
    this.interpretation = interpretation;
    this.messageService.add({ key: 'cen', severity: 'info', summary: 'Success', detail: `The interpretation with ID \'${interpretation.id}\' has been added to the phenopacket.` });
  }
  getCall(genomicInterpretation: GenomicInterpretation) {
    if (genomicInterpretation.geneDescriptor === undefined && genomicInterpretation.variantInterpretation) {
      return 'VariantInterpretation';
    } else if (genomicInterpretation.geneDescriptor && genomicInterpretation.variantInterpretation === undefined) {
      return 'GeneDescriptor';
    }
  }

  onSummaryChange(event) {
    if (this.interpretation === undefined) {
      this.interpretation = new Interpretation();
    }
    this.interpretation.summary = event;
  }

  getProgressStatuses() {
    // tslint:disable-next-line:radix
    return Object.values(ProgressStatus).filter(x => !(parseInt(x) >= 0));
  }

  onCancelClick() {
    this.ref.close();
  }
  onOkClick() {
    if (this.updateInterpretation() === true) {
      this.ref.close(this.interpretation);
    }
  }

}
