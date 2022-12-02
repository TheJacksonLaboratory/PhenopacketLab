import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Measurement } from 'src/app/models/measurement';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-measurement-step',
    templateUrl: './measurement-step.component.html',
    styleUrls: ['./pheno-creator.component.scss']
  })
export class MeasurementStepComponent implements OnInit {

    measurements: Measurement[];

    constructor (public phenopacketService: PhenopacketService, private router: Router) {

    }

    ngOnInit() {
        // this.measurements = this.phenopacketService.getPhenopacket().measurements;
    }

    nextPage() {
        this.phenopacketService.phenopacket.measurements = this.measurements;
        this.router.navigate(['pheno-creator/biosamples']);
    }
    prevPage() {
        this.router.navigate(['pheno-creator/phenotypic-features']);
    }
}
