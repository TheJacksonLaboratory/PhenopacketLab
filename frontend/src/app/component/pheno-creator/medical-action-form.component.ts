import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicalAction } from 'src/app/models/medical-action';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-medical-action-form',
    templateUrl: './medical-action-form.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class MedicalActionFormComponent implements OnInit {

    medicalActions: MedicalAction[];

    constructor(public phenopacketService: PhenopacketService, private router: Router) {

    }

    ngOnInit() {
        this.phenopacketService.getPhenopacket().subscribe(phenopacket => {
            this.medicalActions = phenopacket.medicalActions;
        });
    }

    nextPage() {
        this.phenopacketService.phenopacket.medicalActions = this.medicalActions;
        this.router.navigate(['pheno-creator/disease']);
    }
    prevPage() {
        this.router.navigate(['pheno-creator/files']);
    }
}
