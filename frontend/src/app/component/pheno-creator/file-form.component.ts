import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { File } from 'src/app/models/base';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-file-form',
    templateUrl: './file-form.component.html',
    styleUrls: ['./pheno-creator.component.scss']
  })
export class FileFormComponent implements OnInit {

    files: File[];

    constructor (public phenopacketService: PhenopacketService, private router: Router) {

    }

    ngOnInit() {
        // this.files = this.phenopacketService.getPhenopackt().files;
    }

    nextPage() {
        this.phenopacketService.phenopacket.files = this.files;
        this.router.navigate(['pheno-creator/validate']);
    }
    prevPage() {
        this.router.navigate(['pheno-creator/medical-actions']);
    }
}
