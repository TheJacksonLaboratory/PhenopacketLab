import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Disease } from 'src/app/models/disease';
import { DiseaseDialogComponent } from '../../shared/dialog/disease-dialog/disease-dialog.component';
import { DiseaseSearchDialogComponent } from '../../shared/dialog/disease-search-dialog/disease-search-dialog.component';
import { Utils } from '../../shared/utils';

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

  @Input()
  phenopacketDiseases: Disease[] = [];

  @Output() onDiseasesChanged = new EventEmitter<Disease[]>();

  ref: DynamicDialogRef;

  constructor(private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.onDiseasesChanged.emit(this.phenopacketDiseases);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  /**
   * Adds a new disease.
   */
  addDisease() {
    this.ref = this.dialogService.open(DiseaseSearchDialogComponent, {
      header: 'Add Disease',
      width: '50%',
      contentStyle: { 'overflow': 'auto' },
      baseZIndex: 10000,
      resizable: true,
      draggable: true,
      modal: true
    });

    this.ref.onClose.subscribe((addedDiseases: Disease[]) => {
      if (addedDiseases) {
        if (this.phenopacketDiseases === undefined) {
          this.phenopacketDiseases = [];
        }
        for (const addedDisease of addedDiseases) {
          const indexToUpdate = this.phenopacketDiseases.findIndex(item => item.term.id === addedDisease.term.id);
          addedDisease.key = Utils.getBiggestKey(this.phenopacketDiseases) + 1;
          if (indexToUpdate === -1) {
            this.phenopacketDiseases.push(addedDisease);
          } else {
            this.phenopacketDiseases[indexToUpdate] = addedDisease;
            this.phenopacketDiseases = Object.assign([], this.phenopacketDiseases);
          }
          // emit change
          this.onDiseasesChanged.emit(this.phenopacketDiseases);
        }
      }
    });
  }

  deleteDisease(disease: Disease) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete \'' + disease.term?.label + '\'?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.phenopacketDiseases = this.phenopacketDiseases.filter(val => val.key !== disease.key);
        // emit change
        this.onDiseasesChanged.emit(this.phenopacketDiseases);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Disease Deleted', life: 3000 });
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }

  editDisease(disease?: Disease) {
    this.ref = this.dialogService.open(DiseaseDialogComponent, {
      header: 'Edit Disease',
      width: '50%',
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
        // emit change
        this.onDiseasesChanged.emit(this.phenopacketDiseases);
      }
    });

  }

  getDiseaseURL(id: string) {
    return Disease.getDiseaseURL(id);
  }

}


