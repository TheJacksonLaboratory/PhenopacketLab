import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cohort } from 'src/app/models/cohort';
import { Phenopacket } from 'src/app/models/phenopacket';
import { Profile, ProfileSelection } from 'src/app/models/profile';
import { CohortService } from 'src/app/services/cohort.service';
import { DownloadService } from 'src/app/services/download-service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { MetaData } from '../../models/metadata';
import { MetadataService } from 'src/app/services/metadata.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidationResultsDialogComponent } from '../shared/validation-results-dialog/validation-results-dialog.component';

@Component({
  selector: 'app-validate-step',
  templateUrl: './validate-step.component.html',
  styleUrls: ['./pheno-creator.component.scss'],
  providers: [ DialogService ]
})
export class ValidateStepComponent implements OnInit, OnDestroy {

  phenopacket: Phenopacket;
  cohort: Cohort;

  submitted = false;
  disabled = true;

  createdByPrefix = 'Anonymous';
  createdBySuffix: string;
  created: string;
  submittedByPrefix = 'Anonymous';
  submittedBySuffix: string;
  schemaVersion = '2.0';
  // whether the inplace createBy and SubmittedBy are active
  active = true;

  cohortSubscription: Subscription;

  profileSelectionSubscription: Subscription;
  profileSelection: ProfileSelection;

  metadataSubscription: Subscription;

  ref: DynamicDialogRef;

  constructor(public phenopacketService: PhenopacketService, private downloadService: DownloadService,
    private cohortService: CohortService,
    private metadataService: MetadataService,
    private dialogService: DialogService,
    private router: Router) {

  }

  ngOnInit() {
    this.phenopacket = this.phenopacketService.phenopacket;

    if (this.phenopacket === undefined) {
      // navigate to first page of creator as phenopacket is not created
      this.router.navigate(['creator/individual']);
    }
    this.cohortSubscription = this.cohortService.getCohort().subscribe(cohort => {
      this.cohort = cohort;
    });
    // initialize metadata
    this.initializeMetadata();
    // Retrieve all missing resource prefixes in phenopacket metadata
    this.metadataSubscription = this.metadataService.getPrefixResourcesForPhenopacket(
      this.getPhenopacketJSON(this.phenopacket)).subscribe(prefixResources => {
        let resources;
        if (prefixResources?.length > 0) {
          resources = [];
        }
        for (const item of prefixResources) {
          resources.push(item.resource);
        }
        this.initializeMetadata();
        if (this.phenopacket && this.phenopacket.metaData) {
          this.phenopacket.metaData.resources = resources;
        }
      });
    this.profileSelectionSubscription = this.phenopacketService.getProfileSelection().subscribe(profile => {
      this.profileSelection = profile;
    });
  }

  ngOnDestroy(): void {
    if (this.cohortSubscription) {
      this.cohortSubscription.unsubscribe();
    }
    if (this.profileSelectionSubscription) {
      this.profileSelectionSubscription.unsubscribe();
    }
    if (this.metadataSubscription) {
      this.metadataSubscription.unsubscribe();
    }
    if (this.ref) {
      this.ref.close();
    }
  }

  initializeMetadata() {
    if (this.phenopacket.metaData === undefined) {
      this.phenopacket.metaData = new MetaData();
    }
    // initialize metadata
    this.phenopacket.metaData.createdBy = '';
    this.phenopacket.metaData.submittedBy = '';
    this.phenopacket.metaData.resources = undefined;
    // create the timestamp created date
    this.created = new Date().toISOString();
    this.phenopacket.metaData.created = this.created;
    this.phenopacket.metaData.phenopacketSchemaVersion = this.schemaVersion;
  }

  complete() {
    this.phenopacketService.validatePhenopacket(this.getPhenopacketJSON(this.phenopacket)).subscribe(validationResults => {
      this.ref = this.dialogService.open(ValidationResultsDialogComponent, {
        header: 'Validation results',
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        resizable: true,
        data: {
          validationResults: validationResults,
          phenopacket: this.phenopacket
        }
      });
      this.ref.onClose.subscribe(validationResult => {
        if (validationResult) {
          const isValid = validationResult.isValid;
          if (isValid) {
            // create the timestamp created date
            this.created = new Date().toISOString();

            // set metadata
            if (this.createdBySuffix !== undefined) {
              this.createdByPrefix = 'ORCiD:';
            } else {
              this.createdByPrefix = 'Anonymous';
            }
            if (this.submittedBySuffix !== undefined) {
              this.submittedByPrefix = 'ORCiD:';
            } else {
              this.submittedByPrefix = 'Anonymous';
            }
            this.phenopacket.metaData.createdBy = `${this.createdByPrefix} ${this.createdBySuffix}`;
            this.phenopacket.metaData.submittedBy = `${this.submittedByPrefix} ${this.submittedBySuffix}`;
            this.phenopacket.metaData.created = this.created;
            this.phenopacket.metaData.externalReferences = [];
            this.phenopacket.metaData.phenopacketSchemaVersion = this.schemaVersion;

            this.active = false;
            // add to cohort
            this.cohortService.addCohortMember(this.phenopacket);
            // reset phenopacket
            this.phenopacketService.phenopacket = undefined;

            this.router.navigate(['phenopackets']);
          }
        }
      });
    });

  }

  prevPage() {
    this.phenopacketService.phenopacket = this.phenopacket;
    // check profile and navigate to the corresponding step
    for (const profile of Profile.profileSelectionOptions) {
      if (this.profileSelection === ProfileSelection.ALL_AVAILABLE && profile.value === ProfileSelection.ALL_AVAILABLE) {
        this.router.navigate([`creator/${profile.path}/files`]);
        return;
      } else if (this.profileSelection === ProfileSelection.RARE_DISEASE && profile.value === ProfileSelection.RARE_DISEASE) {
        this.router.navigate([`creator/${profile.path}/interpretations`]);
        return;
      }
      // Possible other profiles to come
    }
  }

  /**
   *
   * @param phenopacket
   * @returns a phenopacket as String
   */
  getPhenopacketJSON(phenopacket: Phenopacket): string {
    return this.downloadService.saveAsJson(phenopacket, false);
  }
}
