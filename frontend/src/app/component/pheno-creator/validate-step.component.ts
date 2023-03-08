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

@Component({
  selector: 'app-validate-step',
  templateUrl: './validate-step.component.html',
  styleUrls: ['./pheno-creator.component.scss']
})
export class ValidateStepComponent implements OnInit, OnDestroy {

  phenopacket: Phenopacket;
  cohort: Cohort;

  submitted = false;
  disabled = true;

  metadata: MetaData;
  createdBy: string;
  created: string;
  submittedBy: string;
  schemaVersion = '2.0';
  // whether the inplace createBy and SubmittedBy are active
  active = true;

  cohortSubscription: Subscription;

  profileSelectionSubscription: Subscription;
  profileSelection: ProfileSelection;

  constructor(public phenopacketService: PhenopacketService, private downloadService: DownloadService,
              private cohortService: CohortService, private router: Router) {

  }

  ngOnInit() {
    this.phenopacket = this.phenopacketService.phenopacket;
    if (this.phenopacket === undefined) {
      // navigate to first page of creator as phenopacket is not created
      this.router.navigate(['creator/individual']);
    }
    this.cohortSubscription = this.cohortService.getCohort().subscribe(cohort => {
      this.cohort = cohort;
      console.log('cohort in validate nginit subscription');
      console.log(this.cohort);
    });
    this.profileSelectionSubscription = this.phenopacketService.getProfileSelection().subscribe(profile => {
      this.profileSelection = profile;
    });
    console.log('cohort in validate;');
    console.log(this.cohort);
  }

  ngOnDestroy(): void {
    if (this.cohortSubscription) {
      this.cohortSubscription.unsubscribe();
    }
    if (this.profileSelectionSubscription) {
      this.profileSelectionSubscription.unsubscribe();
    }
  }
  validate() {
    this.phenopacketService.validatePhenopacket(this.getPhenopacketJSON(this.phenopacket));
    this.disabled = false;
    console.log('validate');
    // create the timestamp created date
    this.created = new Date().toISOString();

    this.active = false;
    // set metadata
    const metadata = new MetaData();
    metadata.createdBy = this.createdBy;
    metadata.created = this.created;
    metadata.submittedBy = this.submittedBy;
    // TODO
    metadata.resources = [];
    // TODO
    metadata.externalReferences = [];
    metadata.phenopacketSchemaVersion = this.schemaVersion;
    this.phenopacket.metaData = metadata;
  }
  complete() {
    // add to cohort
    if (this.cohort) {
      this.cohort.members.push(this.phenopacket);
    }
    this.cohortService.setCohort(this.cohort);
    console.log('completed');
    console.log(this.cohort);
    // reset phenopacket
    this.phenopacketService.phenopacket = undefined;

    // this.cohortService.addPhenopacket(this.phenopacket);
    // this.phenopacketService.phenopacket = this.phenopacket;

    this.router.navigate(['phenopackets']);

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
