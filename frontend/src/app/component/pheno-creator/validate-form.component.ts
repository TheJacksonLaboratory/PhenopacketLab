import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phenopacket } from 'src/app/models/phenopacket';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

@Component({
    selector: 'app-validate-form',
    templateUrl: './validate-form.component.html',
    styleUrls: ['./pheno-creator.component.scss']
  })
export class ValidateFormComponent implements OnInit {

    phenopacket: Phenopacket;

    phenopacketString = `
    {
        "id": "arbitrary.id",
        "subject": {
          "id": "proband A",
          "timeAtLastEncounter": {
            "age": {
              "iso8601duration": "P8Y"
            }
          },
          "sex": "MALE"
        },
        "biosamples": [{
          "id": "SAMN05324082",
          "individualId": "SAMN05324082-individual",
          "description": "THP-1; 6 hours; DMSO; Replicate 1",
          "sampledTissue": {
            "id": "UBERON:0000178",
            "label": "peripheral blood"
          },
          "taxonomy": {
            "id": "NCBITaxon:9606",
            "label": "Homo sapiens"
          },
          "timeOfCollection": {
            "age": {
              "iso8601duration": "P8Y"
            }
          },
          "histologicalDiagnosis": {
            "id": "EFO:0000221",
            "label": "Acute Monocytic Leukemia"
          }
        }],
        "diseases": [{
          "term": {
            "id": "NCIT:C3171",
            "label": "Acute Myeloid Leukemia"
          }
        }],
        "metaData": {
          "created": "2021-05-14T10:35:00Z",
          "createdBy": "anonymous biocurator",
          "resources": [{
            "id": "ncit",
            "name": "NCI Thesaurus",
            "url": "http://purl.obolibrary.org/obo/ncit.owl",
            "version": "21.05d",
            "namespacePrefix": "NCIT",
            "iriPrefix": "http://purl.obolibrary.org/obo/NCIT_"
          }, {
            "id": "efo",
            "name": "Experimental Factor Ontology",
            "url": "http://www.ebi.ac.uk/efo/efo.owl",
            "version": "3.34.0",
            "namespacePrefix": "EFO",
            "iriPrefix": "http://purl.obolibrary.org/obo/EFO_"
          }, {
            "id": "uberon",
            "name": "Uber-anatomy ontology",
            "url": "http://purl.obolibrary.org/obo/uberon.owl",
            "version": "2021-07-27",
            "namespacePrefix": "UBERON",
            "iriPrefix": "http://purl.obolibrary.org/obo/UBERON_"
          }, {
            "id": "ncbitaxon",
            "name": "NCBI organismal classification",
            "url": "http://purl.obolibrary.org/obo/ncbitaxon.owl",
            "version": "2021-06-10",
            "namespacePrefix": "NCBITaxon",
            "iriPrefix": "http://purl.obolibrary.org/obo/NCBITaxon_"
          }],
          "phenopacketSchemaVersion": "2.0"
        }
      }

    `;
    submitted = false;
    disabled = true;

    constructor (public phenopacketService: PhenopacketService, private router: Router) {

    }

    ngOnInit() {
        this.phenopacket = this.phenopacketService.phenopacket;
    }

    validate() {
        this.phenopacketService.validatePhenopacket(this.getPhenopacketJSON(this.phenopacket));
        this.disabled = false;

    }
    complete() {
        this.phenopacketService.setPhenopacket(this.phenopacket);
        this.router.navigate(['families']);
        console.log(this.phenopacketService.getPhenopacket());

    }

    prevPage() {
        this.router.navigate(['pheno-creator/phenotypic-features']);
        // this.router.navigate(['pheno-creator/files']);
    }

    getPhenopacketJSON(phenopacket: Phenopacket): string {
        return '';
    }
}
