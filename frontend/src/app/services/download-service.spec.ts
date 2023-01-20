import { TestBed, inject } from '@angular/core/testing';
import { DownloadService } from './download-service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { Phenopacket } from '../models/phenopacket';
import { Individual, Sex, Status, VitalStatus } from '../models/individual';
import { Age, OntologyClass, TimeElement, TimeInterval } from '../models/base';
import { PhenotypicFeature } from '../models/phenotypic-feature';


describe('DownloadService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DownloadService, HttpHandler, HttpClient]
        });
    });

    it('should be created', inject([DownloadService], (service: DownloadService) => {
        expect(service).toBeTruthy();
    }));

    it('The phenopacket object should be correctly saved a JSON string', inject([DownloadService], (service: DownloadService) => {
        // convert phenopacket to JSON
        const phenopacket = new Phenopacket();
        phenopacket.id = 'arbitrary.phenopacket.id';
        const individual = new Individual();
        individual.id = 'P123542';
        individual.sex = Sex.MALE;
        individual.timeAtLastEncounter = new TimeElement(new Age('P70Y'));
        individual.vitalStatus = new VitalStatus(Status.DECEASED, null, new OntologyClass('MONDO:0100096', 'COVID-19'));
        phenopacket.subject = individual;
        phenopacket.phenotypicFeatures = [];
        const feature1 = new PhenotypicFeature('HP:0001945', 'Fever');
        feature1.onset = new TimeElement('2021-02-01T05:00:00Z');
        phenopacket.phenotypicFeatures.push(feature1);
        const feature2 = new PhenotypicFeature('HP:0030157', 'Flank pain');
        feature2.onset = new TimeElement('2021-02-01T05:00:00Z');
        phenopacket.phenotypicFeatures.push(feature2);

        const feature3 = new PhenotypicFeature('HP:0000790', 'Hematuria');
        feature3.onset = new TimeElement('2021-02-01T05:00:00Z');
        phenopacket.phenotypicFeatures.push(feature3);

        const feature4 = new PhenotypicFeature('HP:0012625', 'Stage 3 chronic kidney disease');
        feature4.onset = new TimeElement('2021-02-01T05:00:00Z');
        phenopacket.phenotypicFeatures.push(feature4);

        const feature5 = new PhenotypicFeature('HP:0003326', 'Myalgia');
        feature5.onset = new TimeElement(new TimeInterval('2020-03-18T00:00:00Z', '2020-03-20T00:00:00Z'));
        phenopacket.phenotypicFeatures.push(feature5);

        const savedJson = service.saveAsJson(phenopacket);
        // parse saved string as json
        const jsonObj = JSON.parse(savedJson);
        expect(jsonObj.hasOwnProperty('id')).toBe(true);
        expect(jsonObj.hasOwnProperty('subject')).toBe(true);
        expect(jsonObj['subject'].id).toBe('P123542');
        expect(jsonObj['phenotypicFeatures'][0].onset.timestamp).toBe('2021-02-01T05:00:00Z');
        expect(jsonObj['phenotypicFeatures'].length).toBe(5);

    }));

    afterAll(() => {
        TestBed.resetTestingModule();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
