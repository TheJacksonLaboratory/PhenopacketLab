import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';
import { Severities } from 'src/app/models/disease';
import { OntologyTreeNode } from 'src/app/models/ontology-treenode';
import { Phenopacket } from 'src/app/models/phenopacket';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { PhenopacketService } from 'src/app/services/phenopacket.service';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';

@Component({
    selector: 'app-phenotypic-feature-form',
    templateUrl: './phenotypic-feature-form.component.html',
    styleUrls: ['./pheno-creator.component.scss']
})
export class PhenotypicFeatureFormComponent implements OnInit, OnDestroy {

    label = '';
    id = '';
    phenopacket: Phenopacket;
    phenotypicFeature: PhenotypicFeature;
    phenotypicFeatures: PhenotypicFeature[] = [];
    submitted = false;
    phenopacketSubscription: Subscription;

    evidenceCode: string;
    evidenceId: string;
    evidenceReference: string;
    evidenceDescription: string;

    severity: OntologyClass;
    modifiersNodes: OntologyTreeNode[];
    modifiersSubscription: Subscription;
    // TODO - fetch from backend
    evidenceValues: string[] = ['evidence 1', 'evidence 2'];

    constructor(public searchService: PhenotypeSearchService,
                public phenopacketService: PhenopacketService,
                private router: Router, public dialog: MatDialog) {
    }


    ngOnInit() {
        this.phenopacket = this.phenopacketService.phenopacket;
        if (this.phenopacket === undefined) {
            // navigate to first page of creator as phenopacket is not created
            this.router.navigate(['pheno-creator/individual']);
        } else {
            this.phenotypicFeatures = this.phenopacket.phenotypicFeatures;
        }

        // Get modifiers
        this.modifiersSubscription = this.phenopacketService.getModifiers().subscribe(nodes => {
            this.modifiersNodes = <OntologyTreeNode[]>nodes.data;
        }
        );
        this.phenopacketSubscription = this.phenopacketService.getPhenopacket().subscribe(phenopacket => {
            this.phenopacket = phenopacket;
            this.phenotypicFeatures = phenopacket.phenotypicFeatures;
        });
    }

    ngOnDestroy(): void {
        if (this.phenopacketSubscription) {
            this.phenopacketSubscription.unsubscribe();
        }
        if (this.modifiersSubscription) {
            this.modifiersSubscription.unsubscribe();
        }
    }

    getSeverities() {
        return Severities.VALUES;
    }
    changePhenotypicFeatures(phenotypicFeatures: PhenotypicFeature[]) {
        if (phenotypicFeatures?.length > 0) {
            this.label = phenotypicFeatures[0].type?.label;
            this.id = phenotypicFeatures[0].type?.id;
            this.phenotypicFeature = new PhenotypicFeature();
            this.phenotypicFeature.type = new OntologyClass(this.id, this.label);
        }


        // this.phenotypicFeatures = phenotypicFeatures;
    }
    updateModifiers(modifiers: any[]) {
        // TOFIX
        console.log('updatemodifiers');
        console.log(modifiers);
        if (this.phenopacket?.phenotypicFeatures) {
            for (const feature of this.phenopacket.phenotypicFeatures) {
                if (feature.type.id === this.id) {
                    feature.modifiers = modifiers;
                    this.phenotypicFeatures = this.phenotypicFeatures.slice();
                }
            }
        }
    }
    /**
     * Adds a new phenotypic feature.
     **/
    addPhenotypicFeature() {
        if (this.id && this.label) {
            if (this.phenotypicFeature === undefined) {
                this.phenotypicFeature = new PhenotypicFeature();
                this.phenotypicFeature.type.id = this.id;
                this.phenotypicFeature.type.label = this.label;
            }
            this.phenotypicFeatures.push(this.phenotypicFeature);
            // we copy the array after each update so the ngChange method is triggered on the child component
            this.phenotypicFeatures = this.phenotypicFeatures.slice();
        }
        console.log(this.phenopacket);

        this.phenopacket.phenotypicFeatures = this.phenotypicFeatures;


        this.submitted = true;

    }

    nextPage() {
        console.log('next');
        console.log(this.phenopacket);

        // this.phenopacket.phenotypicFeatures = this.phenotypicFeatures;
        // console.log(this.phenopacket);
        this.phenopacketService.setPhenopacket(this.phenopacket);
        // this.router.navigate(['pheno-creator/measurements']);
        // TODO temp while measuremtn is not done
        this.router.navigate(['pheno-creator/diseases']);
        this.submitted = true;

        // console.log(this.phenopacketService.getPhenopacket());
    }
    prevPage() {
        this.router.navigate(['pheno-creator/individual']);
    }
}
