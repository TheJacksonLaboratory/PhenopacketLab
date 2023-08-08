import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from "@auth0/auth0-angular";
import { forkJoin, Subscription } from 'rxjs';
import { first } from "rxjs/operators";
import { Phenopacket } from 'src/app/models/phenopacket';
import { ProfileSelection } from 'src/app/models/profile';
import { DownloadService } from 'src/app/services/download-service';
import { MetaData } from '../../models/metadata';
import { MetadataService } from 'src/app/services/metadata.service';
import { DialogService } from 'primeng/dynamicdialog';
import { PhenopacketStepperService } from 'src/app/services/phenopacket-stepper.service';

@Component({
  selector: 'app-validate-step',
  templateUrl: './validate-step.component.html',
  styleUrls: ['./pheno-creator.component.scss'],
  providers: [DialogService]
})
export class ValidateStepComponent implements OnInit, OnDestroy {

  user: User;

  phenopacket: Phenopacket;

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
  profileSelectionSubscription: Subscription;
  profileSelection: ProfileSelection;
  metadataSubscription: Subscription;

  isPrivateInfoWarnSelected: boolean;
  privateInfoSubscription: Subscription;

  constructor(public phenopacketStepperService: PhenopacketStepperService,
    private downloadService: DownloadService,
    private metadataService: MetadataService,
    private authService: AuthService,
    private router: Router) {

  }

  ngOnInit() {
    this.phenopacket = this.phenopacketStepperService.phenopacket;

    if (this.phenopacket === undefined) {
      // navigate to first page of creator as phenopacket is not created
      this.router.navigate(['creator/individual']);
      return;
    }

    forkJoin({
      user: this.authService.user$.pipe(first()),
      resources: this.metadataService.getPrefixResourcesForPhenopacket(this.downloadService.saveAsJson(this.phenopacket, false))
    }).subscribe((results) => {
      this.user = results.user;
      this.initializeMetadata(results.user, results.resources);
    });

    this.profileSelectionSubscription = this.phenopacketStepperService.getProfileSelection().subscribe(profile => {
      this.profileSelection = profile;
    });
    this.privateInfoSubscription = this.phenopacketStepperService.getIsPrivateInfoWarnSelected().subscribe(isPrivateInfoWarnSelected => {
      this.isPrivateInfoWarnSelected = isPrivateInfoWarnSelected;
    });
  }

  ngOnDestroy(): void {
    if (this.profileSelectionSubscription) {
      this.profileSelectionSubscription.unsubscribe();
    }
    if (this.metadataSubscription) {
      this.metadataSubscription.unsubscribe();
    }
    if (this.privateInfoSubscription) {
      this.privateInfoSubscription.unsubscribe();
    }
  }

  initializeMetadata(user, prefixResources) {
    if (this.phenopacket.metaData === undefined) {
      this.phenopacket.metaData = new MetaData();
    }
    let createdBy, submittedBy;
    if (user) {
      createdBy = submittedBy = this.orcidFromSub(user);
    } else {
      createdBy = submittedBy = 'Anonymous';
    }
    this.created = new Date().toISOString();
    this.phenopacket.metaData.createdBy = createdBy;
    this.phenopacket.metaData.submittedBy = submittedBy;
    this.phenopacket.metaData.created = this.created;
    this.phenopacket.metaData.externalReferences = [];
    this.phenopacket.metaData.resources = prefixResources.map((item) => item.resource);
    this.phenopacket.metaData.phenopacketSchemaVersion = this.schemaVersion;
  }

  orcidFromSub(user) {
    const userPieces = user.sub.split('|');
    if (userPieces.length > 2) {
      return `${userPieces[1]}:${userPieces[2]}`;
    } else {
      return '';
    }
  }

  updateIsPrivateInfoWarnSelected() {
    this.phenopacketStepperService.setPrivateInfoWarnSelected(this.isPrivateInfoWarnSelected);
  }
}
