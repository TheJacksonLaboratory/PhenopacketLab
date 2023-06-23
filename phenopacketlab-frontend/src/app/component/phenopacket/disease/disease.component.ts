import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Disease } from 'src/app/models/disease';
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
export class DiseaseComponent implements OnInit, OnChanges, OnDestroy {

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
  localStorageKey = 'hpo_diseases';

  showTable = false;

  diseaseCount: number;

  ref: DynamicDialogRef;

  constructor(public searchService: DiseaseSearchService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.onDiseasesChanged.emit(this.phenopacketDiseases);
  }

  ngOnInit(): void {
    if (this.phenopacketDiseases && this.phenopacketDiseases.length > 0) {
      this.showTable = true;
    }
  }

  ngOnDestroy(): void {
  }
  diseaseItemSelected(item: any) {
    if (item) {
      const disease = new Disease();
      disease.term = new OntologyClass(item.id, item.lbl);
      this.addDisease(disease);
    }
  }
  /**
       * Adds a new disease.
       **/
  addDisease(disease?: Disease) {
    if (disease === undefined) {
      return;
    }
    // set unique key for feature table
    disease.key = Utils.getBiggestKey(this.phenopacketDiseases) + 1;
    this.phenopacketDiseases.push(disease);
    // we copy the array after each update so the ngChange method is triggered on the child component
    this.phenopacketDiseases = this.phenopacketDiseases.slice();
    setTimeout(() => this.showTable = true, 0);

    // make table visible
    this.showTable = true;
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

  editDisease(disease?: Disease) {
    this.ref = this.dialogService.open(DiseaseDetailDialogComponent, {
      header: 'Edit Disease',
      width: '70%',
      contentStyle: { 'overflow': 'auto' },
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

  getDiseaseURL(id: string) {
    return Disease.getDiseaseURL(id);
  }

}


