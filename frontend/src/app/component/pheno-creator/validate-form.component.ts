import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cohort } from 'src/app/models/cohort';
import { Phenopacket } from 'src/app/models/phenopacket';
import { CohortService } from 'src/app/services/cohort.service';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import {MetaData} from '../../models/metadata';

@Component({
  selector: 'app-validate-form',
  templateUrl: './validate-form.component.html',
  styleUrls: ['./pheno-creator.component.scss']
})
export class ValidateFormComponent implements OnInit, OnDestroy {

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

  constructor(public phenopacketService: PhenopacketService, private cohortService: CohortService, private router: Router) {

  }

  ngOnInit() {
    this.phenopacket = this.phenopacketService.phenopacket;
    if (this.phenopacket === undefined) {
      // navigate to first page of creator as phenopacket is not created
      this.router.navigate(['pheno-creator/individual']);
    }
    this.cohortSubscription = this.cohortService.getCohort().subscribe(cohort => {
      this.cohort = cohort;
      console.log('cohort in validate nginit subscription');
      console.log(this.cohort);
    });
    console.log('cohort in validate;');
    console.log(this.cohort);
  }

  ngOnDestroy(): void {
    if (this.cohortSubscription) {
      this.cohortSubscription.unsubscribe();
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
    metadata.resources = [];
    metadata.externalReferences = [];
    metadata.phenopacketSchemaVersion = this.schemaVersion;
    // this.phenopacket.metadata = metadata;
  }
  complete() {
    // add to cohort
    if (this.cohort) {
      this.cohort.members.push(this.phenopacket);
    }
    this.cohortService.setCohort(this.cohort);
    console.log('completed');
    console.log(this.cohort);
    // this.cohortService.addPhenopacket(this.phenopacket);
    // this.phenopacketService.phenopacket = this.phenopacket;

    this.router.navigate(['phenopackets']);

  }

  prevPage() {
    this.phenopacketService.phenopacket = this.phenopacket;
    this.router.navigate(['pheno-creator/diseases']);
    // this.router.navigate(['pheno-creator/files']);
  }

  getPhenopacketJSON(phenopacket: Phenopacket): string {
    return '';
  }
}
