import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disease } from 'src/app/models/disease';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-disease-form',
    templateUrl: './disease-form.component.html',
    styleUrls: ['./pheno-creator.component.scss']
  })
export class DiseaseFormComponent implements OnInit {

    diseases: Disease[];

    constructor (public phenopacketService: PhenopacketService, private router: Router) {

    }

    ngOnInit() {
        // this.diseases = this.phenopacketService.getPhenopacket().diseases;
    }

    nextPage() {
        this.phenopacketService.phenopacket.diseases = this.diseases;
        this.router.navigate(['pheno-creator/medical-actions']);
    }
    prevPage() {
        this.router.navigate(['pheno-creator/interpretations']);
    }
}
