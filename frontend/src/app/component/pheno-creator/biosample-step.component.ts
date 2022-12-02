import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BioSample } from 'src/app/models/biosample';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-biosample-step',
    templateUrl: './biosample-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
  })
export class BiosampleStepComponent implements OnInit {

    biosamples: BioSample[];

    constructor (public phenopacketService: PhenopacketService, private router: Router) {

    }

    ngOnInit() {
        // this.biosamples = this.phenopacketService.getPhenopacket().biosamples;
    }

    nextPage() {
        this.phenopacketService.phenopacket.biosamples = this.biosamples;
        this.router.navigate(['pheno-creator/interpretations']);
    }
    prevPage() {
        this.router.navigate(['pheno-creator/measurements']);
    }
}
