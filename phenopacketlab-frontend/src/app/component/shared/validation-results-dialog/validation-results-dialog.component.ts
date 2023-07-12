import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MetaData } from 'src/app/models/metadata';
import { Phenopacket } from 'src/app/models/phenopacket';
import { ValidationResults } from 'src/app/models/validation-results';
import { DownloadService } from 'src/app/services/download-service';
import { MetadataService } from 'src/app/services/metadata.service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
  selector: 'app-validation-result-dialog',
  templateUrl: './validation-results-dialog.component.html',
  styleUrls: ['./validation-results-dialog.component.scss']
})
export class ValidationResultsDialogComponent implements OnInit {

  validationResults: ValidationResults;
  phenopacket: Phenopacket;

  loading: boolean;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,
    private metadataService: MetadataService, private downloadService: DownloadService,
    private phenopacketService: PhenopacketService) {

  }
  ngOnInit(): void {
    this.validationResults = this.config.data?.validationResults;
    this.phenopacket = this.config.data?.phenopacket;
  }

  /**
   * Closes the dialog with an object with a boolean and the result phenopacket
   */
  closeDialog() {
    if (this.ref) {
      if (this.validationResults.validationResults.length === 0) {
        this.ref.close({ isValid: true, validatedPhenopacket: this.phenopacket });
      } else {
        this.ref.close({ isValid: false });
      }
    }
  }

  /**
   * Try to fix the validationResults found (the metadata errors)
   */
  fixErrors() {
    let metadata = this.phenopacket.metaData;
    if (!metadata) {
      metadata = new MetaData();
      // initialize metadata
      metadata.createdBy = '';
      metadata.submittedBy = '';
      metadata.resources = undefined;
      // create the timestamp created date
      metadata.created = new Date().toISOString();
      metadata.externalReferences = [];
      // TODO retrieve version from backend
      metadata.phenopacketSchemaVersion = '2.0';
      this.phenopacket.metaData = metadata;
    }
    // Fix metadata resources
    this.loading = false;
    this.metadataService.getPrefixResourcesForPhenopacket(
      this.downloadService.saveAsJson(this.phenopacket, false)).subscribe(prefixResources => {
        let resources;
        this.loading = true;
        if (prefixResources?.length > 0) {
          resources = [];
        }
        for (const item of prefixResources) {
          resources.push(item.resource);
        }
        if (this.phenopacket && this.phenopacket.metaData) {
          this.phenopacket.metaData.resources = resources;
        }
        // re-run validation
        this.phenopacketService.validatePhenopacket(
          this.downloadService.saveAsJson(this.phenopacket, false)).subscribe(validationResults => {
            this.validationResults = validationResults;
            this.loading = false;
          }, error => {
            this.loading = false;
          });
      }, error => {
        this.loading = false;
      });

  }

}
