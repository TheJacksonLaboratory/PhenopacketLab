import { TestBed, inject } from '@angular/core/testing';
import { UploadService } from './upload-service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import covid from 'src/assets/data/covid.json';
import covidIncorrect from 'src/assets/data/covid-incorrect.json';
import { Phenopacket } from '../models/phenopacket';


describe('UploadService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UploadService, HttpHandler, HttpClient]
        });
    });

    it('should be created', inject([UploadService], (service: UploadService) => {
        expect(service).toBeTruthy();
    }));

    it('covid.json phenopacket should be correctly imported as a Phenopacket object', inject([UploadService], (service: UploadService) => {
        // convert loaded JSON to Phenopacket object
        const phenopacket = Phenopacket.convert(covid);
        expect(phenopacket.id).toBe('arbitrary.phenopacket.id');
        expect(phenopacket.phenotypicFeatures.length).toBe(8);
        expect(phenopacket.measurements[0].assay.id).toBe('LOINC:26474-7');
        expect(phenopacket.medicalActions.length).toBe(6);
        expect(phenopacket.interpretations).toBe([]);

    }));

    it('Incorrect phenopacket file should not be imported as a Phenopacket object', inject([UploadService], (service: UploadService) => {
        // Try to convert incorrect phenopacket file
        expect((function() { Phenopacket.convert(covidIncorrect); } )).toThrowError(`Phenopacket file is missing 'id' field.`);

    }));

    afterAll(() => {
        TestBed.resetTestingModule();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
