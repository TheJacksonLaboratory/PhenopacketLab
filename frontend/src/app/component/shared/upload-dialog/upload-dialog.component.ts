import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UploadService } from 'src/app/services/upload-service';
import { FamilyService } from 'src/app/services/family.service';
import { CohortService } from 'src/app/services/cohort.service';
import { Phenopacket } from 'src/app/models/phenopacket';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {

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

  percentCompleted: number = 0;
  isMultipleUploaded = false;
  isSingleUploaded = false;
  showProgress = false;
  acceptedExtensions = "JSON, Yaml";
  phenopacketSchemaUrl = 'https://phenopacket-schema.readthedocs.io/en/master/schema.html';

  phenopackets = [];
  currentPhenopackets: Phenopacket[];

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>,
    public uploadService: UploadService, public familyService: FamilyService, 
    public cohortService: CohortService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) {

    this.fileType = this.data.fileType;
    this.titleText = this.data.titleText;
    this.currentPhenopackets = this.data.currentPhenopackets;
  }

  ngOnInit() {
    this.showProgress = false;
  }

  uploadFile($event) {
    console.log('---Uploading one or more files---');
    this.files = $event.target.files;
    this.isSingleUploaded = false;

    this.uploadSub = this.uploadService.importFromFile(this.files[0])
      .subscribe(
        (event) => {
          // if (event.type === HttpEventType.UploadProgress) {
            // this.percentCompleted = Math.round(100 * event.loaded / event.total);
          //   this.showProgress = true;
          //   this.uploading = true;
          //   console.log(this.percentCompleted + "%");
          // }

          // Check that the pheno id does not already exist
          for (let newPheno of event) {
            for (let currPheno of this.currentPhenopackets) {
              if (newPheno.id === currPheno.id) {
                let errorMessage = `Phenopacket id '${newPheno.id}' already exists. Choose another phenopacket or edit the phenopacket id so it is unique.`;
                this.uploadError(errorMessage);
                throw new Error();
              }
            }
          }

          this.phenopackets = event;
          this.familyService.addPhenopacket(event[0]);
          this.showProgress = true;
          this.uploading = true;
          this.percentCompleted = 100;
          if (this.percentCompleted == 100) {
            this.uploadSuccessful = true;
            this.messageSuccess = "File successfully uploaded";
          }
        }, (error) => {
          this.uploadError(error);
        });
  }

  uploadError(error: string) {
    console.log(error);
    this.errorMessage = error;
    this.uploadSuccessful = false;
    this.showProgress = false;
    this.uploading = false;
  }

  cancelUpload() {
    if (this.uploadSub != null)
      this.uploadSub.unsubscribe();
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
