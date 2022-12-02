import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Interpretation } from 'src/app/models/interpretation';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-interpretation-step',
    templateUrl: './interpretation-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
  })
export class InterpretationStepComponent implements OnInit {

    interpretations: Interpretation[];

    constructor (public phenopacketService: PhenopacketService, private router: Router) {

    }

    ngOnInit() {
        // this.interpretations = this.phenopacketService.getPhenopacket().interpretations;
    }

    nextPage() {
        this.phenopacketService.phenopacket.interpretations = this.interpretations;
        this.router.navigate(['pheno-creator/interpretations']);
    }
    prevPage() {
        this.router.navigate(['pheno-creator/diseases']);
    }
}
