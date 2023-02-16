import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { Phenopacket } from 'src/app/models/phenopacket';
import { Profile, ProfileSelection } from 'src/app/models/profile';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
  selector: 'app-pheno-creator-rare',
  templateUrl: './pheno-creator.component.html',
  styleUrls: ['./pheno-creator.component.scss'],
  providers: [MessageService]
})
export class PhenoCreatorRareComponent implements OnInit, OnDestroy {

  phenopacket: Phenopacket;

  // primeng stepper
  items: MenuItem[];
  subscription: Subscription;

  constructor(private messageService: MessageService, public phenopacketService: PhenopacketService) {
  }

  ngOnInit() {
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

}
