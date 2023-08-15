import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Disease } from 'src/app/models/disease';
import { DiseaseDialogComponent } from '../../dialog/disease-dialog/disease-dialog.component';
import { DiseaseSearchDialogComponent } from '../../dialog/disease-search-dialog/disease-search-dialog.component';
import { Utils } from '../../utils';
import { ProfileSelection } from 'src/app/models/profile';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent implements OnInit, OnDestroy {

  @Input()
  diseases: Disease[] = [];
  @Input()
  profile: ProfileSelection;

  @Output() onDiseasesChanged = new EventEmitter<Disease[]>();

  ref: DynamicDialogRef;

  constructor(private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

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
      modal: true,
      data: { profile: this.profile }
    });

    this.ref.onClose.subscribe((addedDiseases: Disease[]) => {
      if (addedDiseases) {
        if (this.diseases === undefined) {
          this.diseases = [];
        }
        for (const addedDisease of addedDiseases) {
          const indexToUpdate = this.diseases.findIndex(item => item.term.id === addedDisease.term.id);
          addedDisease.key = Utils.getBiggestKey(this.diseases) + 1;
          if (indexToUpdate === -1) {
            this.diseases.push(addedDisease);
          } else {
            this.diseases[indexToUpdate] = addedDisease;
            this.diseases = Object.assign([], this.diseases);
          }
          // emit change
          this.onDiseasesChanged.emit(this.diseases);
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
        this.diseases = this.diseases.filter(val => val.term.id !== disease.term.id);
        // emit change
        this.onDiseasesChanged.emit(this.diseases);
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
      data: { disease: disease, profile: this.profile }
    });

    this.ref.onClose.subscribe((editedDisease: Disease) => {
      if (editedDisease) {
        const indexToUpdate = this.diseases.findIndex(item => item.term.id === editedDisease.term.id);
        if (indexToUpdate === -1) {
          this.diseases.push(editedDisease);
        } else {
          this.diseases[indexToUpdate] = editedDisease;
          this.diseases = Object.assign([], this.diseases);
        }
        // emit change
        this.onDiseasesChanged.emit(this.diseases);
      }
    });

  }

  getDiseaseURL(id: string) {
    return Disease.getDiseaseURL(id);
  }

}


