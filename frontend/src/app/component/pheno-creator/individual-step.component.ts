import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Individual } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-individual-step',
    templateUrl: './individual-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class IndividualStepComponent implements OnInit, OnDestroy {

    phenopacket: Phenopacket;

    phenopacketSubscription: Subscription;
    submitted = false;

    summary: string;

    constructor(public phenopacketService: PhenopacketService, private router: Router) {

    }
    ngOnDestroy(): void {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.phenopacket = this.phenopacketService.phenopacket;
        if (this.phenopacket === undefined) {
            this.phenopacket = new Phenopacket();
            this.phenopacket.subject = new Individual();
        }

    }

    updateSubject(subject: Individual) {
        if (this.phenopacket) {
            this.phenopacket.subject = subject;
        }
    }

    nextPage() {
        if (this.phenopacket.id) {
            // TODO Check if id already exists
            this.phenopacketService.phenopacket = this.phenopacket;
            this.router.navigate(['pheno-creator/phenotypic-features']);
            return;
        }
        this.submitted = true;
    }
}
