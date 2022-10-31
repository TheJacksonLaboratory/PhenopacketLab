import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { ClinicalFindings, Disease, Laterality, Severities, Stages } from 'src/app/models/disease';
import { Phenopacket } from 'src/app/models/phenopacket';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-disease-form',
    templateUrl: './disease-form.component.html',
    styleUrls: ['./pheno-creator.component.scss']
  })
export class DiseaseFormComponent implements OnInit, OnDestroy {

    label = '';
    id = '';
    disease: Disease;
    diseases: Disease[];
    phenopacket: Phenopacket;
    phenopacketSubscription: Subscription;

    submitted = false;

    diseaseDetailName: string;
    diseaseId: string;
    isA: string;
    description: string;

    laterality: OntologyClass;
    severity: OntologyClass;
    finding: OntologyClass;
    stage: OntologyClass;

    statuses: string[] = ['Observed', 'Included'];
    selectedStatus: string;

    // TODO - fetch from backend
    // stages: string[] = ['Incubation', 'Prodromal', 'Illness', 'Decline', 'Convalescence'];
    stages: string[] = ['Stage 0 - carcinoma in situ', 'Stage I - localized cancer', 'Stage II - locally advanced cancer, early stages', 'Stage III - locally advanced cancer, later stages', 'Stage IV - metastatic cancer'];

    constructor (public phenopacketService: PhenopacketService, private router: Router) {

    }

    ngOnInit() {
        this.phenopacket = this.phenopacketService.phenopacket;
        if (this.phenopacket === undefined) {
            // navigate to first page of creator as phenopacket is not created
            this.router.navigate(['pheno-creator/individual']);
        }
        this.diseases = this.phenopacket.diseases;
    }
    ngOnDestroy(): void {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
    }

    changeDiseases(diseases: Disease[]) {
        if (diseases?.length > 0) {
            this.label = diseases[0].term?.label;
            this.id = diseases[0].term?.id;
            this.disease = new Disease();
            this.disease.term = new OntologyClass(this.id, this.label);
        }
    }

    /**
     * Adds a new disease.
     **/
     addDisease() {
        if (this.id && this.label) {
            if (this.disease === undefined) {
                this.disease = new Disease();
                this.disease.term.id = this.id;
                this.disease.term.label = this.label;
            }
            this.diseases.push(this.disease);
            // we copy the array after each update so the ngChange method is triggered on the child component
            this.diseases = this.diseases.slice();
        }
        console.log(this.phenopacket);

        this.phenopacket.diseases = this.diseases;
        this.submitted = true;

    }
    getLateralities() {
      return Laterality.VALUES;
    }

    getClinicalFindings() {
      return ClinicalFindings.VALUES;
    }
    getStages() {
      return Stages.VALUES;
    }
    getSeverities() {
      return Severities.VALUES;
    }

    nextPage() {

        this.phenopacketService.setPhenopacket(this.phenopacket);

        // this.phenopacketService.phenopacket.diseases = this.diseases;
        this.router.navigate(['pheno-creator/validate']);
        this.submitted = true;

    }
    prevPage() {
        this.router.navigate(['pheno-creator/phenotypic-features']);
    }
}
