import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { Phenopacket } from 'src/app/models/phenopacket';
import { Profile, ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
  selector: 'app-pheno-creator',
  templateUrl: './pheno-creator.component.html',
  styleUrls: ['./pheno-creator.component.scss'],
  providers: [MessageService]
})
export class PhenoCreatorComponent implements OnInit, OnDestroy {

  phenopacket: Phenopacket;

  // primeng stepper
  items: MenuItem[];
  profileSelected: ProfileSelection;
  rareProfileSelected = true;
  subscription: Subscription;
  activeIndex = 0;

  constructor(private router: Router, private messageService: MessageService, public phenopacketService: PhenopacketService) {
  }

  ngOnInit() {
    this.phenopacketService.getProfileSelection().subscribe(profile => {
      this.profileSelected = profile;
      if (this.profileSelected === ProfileSelection.RARE_DISEASE) {
        this.rareProfileSelected = true;
        this.items = Profile.profileSelectionOptions.find(element => element.value === ProfileSelection.RARE_DISEASE).steps;
      } else {
        this.rareProfileSelected = false;
        this.items = Profile.profileSelectionOptions.find(element => element.value === ProfileSelection.ALL_AVAILABLE).steps;
      }
    });
    this.items = Profile.profileSelectionOptions.find(element => element.value === ProfileSelection.RARE_DISEASE).steps;
    this.subscription = this.phenopacketService.validated$.subscribe((phenopacket) => {
      this.messageService.add({
        severity: 'success', summary: 'Phenopacket created',
        detail: 'The phenopacket with the ID ' + phenopacket.subject.id + ' has been successfully validated.'
      });
    });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  updateProfile(rareDiseaseProfileSelected: boolean) {
    this.rareProfileSelected = rareDiseaseProfileSelected;
    if (this.rareProfileSelected) {
      this.phenopacketService.setProfileSelection(ProfileSelection.RARE_DISEASE);
      this.items = Profile.profileSelectionOptions.find(element => element.value === ProfileSelection.RARE_DISEASE).steps;
    } else {
      this.phenopacketService.setProfileSelection(ProfileSelection.ALL_AVAILABLE);
      this.items = Profile.profileSelectionOptions.find(element => element.value === ProfileSelection.ALL_AVAILABLE).steps;
    }
  }

  nextPage() {
    this.activeIndex++;
    if (this.rareProfileSelected) {
      this.router.navigate([`creator/${Profile.profileSelectionOptions[0].steps[this.activeIndex].routerLink}`]);

    } else {
      this.router.navigate([`creator/${Profile.profileSelectionOptions[1].steps[this.activeIndex].routerLink}`]);

    }
  }

  prevPage() {
    this.activeIndex--;
    if (this.rareProfileSelected) {
      this.router.navigate([`creator/${Profile.profileSelectionOptions[0].steps[this.activeIndex].routerLink}`]);
    } else {
      this.router.navigate([`creator/${Profile.profileSelectionOptions[1].steps[this.activeIndex].routerLink}`]);
    }
  }

}
