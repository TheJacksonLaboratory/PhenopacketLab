import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UploadService } from 'src/app/services/upload-service';
import { CohortService } from 'src/app/services/cohort.service';
import { Phenopacket } from 'src/app/models/phenopacket';
import { Cohort } from 'src/app/models/cohort';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit, OnDestroy {

  public files: Set<File> = new Set();
  public file: File;
  uploadSub: Subscription;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  fileType = '';
  titleText = '';

  errorMessage: string;
  messageSuccess: string;

  percentCompleted = 0;
  isMultipleUploaded = false;
  isSingleUploaded = false;
  showProgress = false;
  acceptedExtensions = 'JSON, Yaml';
  phenopacketSchemaUrl = 'https://phenopacket-schema.readthedocs.io/en/master/schema.html';

  phenopackets = [];
  currentPhenopackets: Phenopacket[];

  cohort: Cohort;
  cohortSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>,
    public uploadService: UploadService,
    public cohortService: CohortService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) {

    this.fileType = this.data.fileType;
    this.titleText = this.data.titleText;
    this.currentPhenopackets = this.data.currentPhenopackets;
  }

  ngOnInit() {
    this.cohortSubscription = this.cohortService.getCohort().subscribe(cohort => {
      this.cohort = cohort;
    });

    this.showProgress = false;
  }

  ngOnDestroy(): void {
    if (this.cohortSubscription) {
      this.cohortSubscription.unsubscribe();
    }
  }
  uploadFile($event) {
    console.log('---Uploading one or more files---');
    this.files = $event.target.files;
    this.isSingleUploaded = false;

    this.uploadSub = this.uploadService.importFromFile(this.files[0])
      .subscribe(
        (event) => {
          // Check that the pheno id does not already exist
          for (const newPheno of event) {
            for (const currPheno of this.currentPhenopackets) {
              if (newPheno.id === currPheno.id) {
                const errorMessage = `Phenopacket id '${newPheno.id}' already exists. Choose another phenopacket or edit the phenopacket id so it is unique.`;
                this.uploadError(errorMessage);
                throw new Error();
              }
            }
          }

          this.phenopackets = event;

          if (this.cohort === undefined) {
            this.cohortService.setCohort(new Cohort());
          }
          this.cohort.members.push(event[0]);
          this.cohortService.setCohort(this.cohort);
          this.showProgress = true;
          this.uploading = true;
          this.percentCompleted = 100;
          if (this.percentCompleted === 100) {
            this.uploadSuccessful = true;
            this.messageSuccess = 'File successfully uploaded';
          }
        }, (error) => {
          this.uploadError(error);
        });
  }

  uploadError(error: string) {
    this.errorMessage = error;
    this.uploadSuccessful = false;
    this.showProgress = false;
    this.uploading = false;
  }

  cancelUpload() {
    if (this.uploadSub != null) {
      this.uploadSub.unsubscribe();
    }
    this.reset();
  }

  reset() {
    this.uploadSuccessful = null;
    this.showProgress = null;
    this.uploading = null;
    this.errorMessage = null;
    this.messageSuccess = null;
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onOkClick() {
    return { 'phenopackets': this.phenopackets };
  }

}
