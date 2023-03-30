import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Disease } from 'src/app/models/disease';
import { SpinnerDialogComponent } from '../../shared/spinner-dialog/spinner-dialog.component';
import { DiseaseSearchService } from 'src/app/services/disease-search.service';
import { DiseaseDetailDialogComponent } from './disease-detail/disease-detail-dialog/disease-detail-dialog.component';
import { Utils } from '../../shared/utils';
import { OntologyClass } from 'src/app/models/base';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DiseaseComponent implements OnInit, OnChanges {

  /**
  * If this variable is true, we show the add button and also add the selected phenotypic feature to the datasource.
  * If false, we do not show the add button and just return a single phenotypic feature with the corresponding type OntologyClass
  */
  @Input()
  showAddButton = true;

  @Input()
  phenopacketDiseases: Disease[] = [];

  @Output() onDiseasesChanged = new EventEmitter<Disease[]>();

  // search box params
  itemName = 'Disease';
  searchLabel = 'Disease name';
  placeHolderTxt = 'Enter disease name';
  localStorageKey = 'hpo_diseases';

  showTable = false;

  diseaseCount: number;
  // searchparams
  currSearchParams: any = {};

  ref: DynamicDialogRef;
  spinnerDialogRef: any;

  constructor(public searchService: DiseaseSearchService, public dialogService: DialogService,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.onDiseasesChanged.emit(this.phenopacketDiseases);
  }

  ngOnInit(): void {
    if (this.phenopacketDiseases && this.phenopacketDiseases.length > 0) {
      this.showTable = true;
    }
  }

  deleteDisease(disease: Disease) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete \'' + disease.term?.id + '\'?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.phenopacketDiseases = this.phenopacketDiseases.filter(val => val.key !== disease.key);
        if (this.phenopacketDiseases.length === 0) {
          this.showTable = false;
        }
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Disease Deleted', life: 3000 });
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }

  onSearchCriteriaChange(searchCriteria: any) {
    this.currSearchParams.offset = 0;
    const id = searchCriteria.selectedItems[0].selectedValue.id;

    if ((searchCriteria.selectedItems && searchCriteria.selectedItems.length > 0)) {
      this.currSearchParams = searchCriteria;
      this._queryDiseasesById(id);
    }

  }

  private _queryDiseasesById(id: string) {
    this.spinnerDialogRef = this.dialogService.open(SpinnerDialogComponent, {
      closable: false,
      modal: true
    });
    this.searchService.queryDiseasesById(id).subscribe(data => {
      if (data) {
        const disease = new Disease();
        disease.term = new OntologyClass(data.id, data.label);
        disease.key = Utils.getBiggestKey(this.phenopacketDiseases) + 1;
        this.phenopacketDiseases.push(disease);
        this.onDiseasesChanged.emit(this.phenopacketDiseases);
      }
      this.spinnerDialogRef.close();
    },
      (error) => {
        console.log(error);
        this.spinnerDialogRef.close();
      });
  }

  editDisease(disease?: Disease) {
    this.ref = this.dialogService.open(DiseaseDetailDialogComponent, {
      header: 'Edit Disease',
      width: '70%',
      contentStyle: { 'min-height': '500px', 'overflow': 'auto' },
      baseZIndex: 10000,
      resizable: true,
      draggable: true,
      data: { disease: disease }
    });

    this.ref.onClose.subscribe((editedDisease: Disease) => {
      if (editedDisease) {
        const indexToUpdate = this.phenopacketDiseases.findIndex(item => item.key === editedDisease.key);
        if (indexToUpdate === -1) {
          this.phenopacketDiseases.push(editedDisease);
        } else {
          this.phenopacketDiseases[indexToUpdate] = editedDisease;
          this.phenopacketDiseases = Object.assign([], this.phenopacketDiseases);
        }
        this.showTable = true;
        // emit change
        this.onDiseasesChanged.emit(this.phenopacketDiseases);
      }
    });

  }

}


