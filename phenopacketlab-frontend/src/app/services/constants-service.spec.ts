import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { DialogService } from 'primeng/dynamicdialog';
import { ConstantsService } from './constants.service';

const lateralitiesData = require('../../assets/data/laterality.json');
const modifiersData = require('../../assets/data/modifiers.json');
const severitiesData = require('../../assets/data/severity.json');
const sexesData = require('../../assets/data/sex.json');
// const gendersData = require('../../assets/data/gender.json');
// const evidences = require('../../assets/data/evidences.json');
// const tnmTumorFindings = require('../../assets/data/tnmTumorFindings.json');
// const tnmNodeFindings = require('../../assets/data/tnmNodeFindings.json');
// const tnmMetastasisFindings = require('../../assets/data/tnmMetastasisFindings.json');
// const diseaseStages = require('../../assets/data/diseaseStages.json');

describe('ConstantsService', () => {

    let httpMock: HttpTestingController;
    let constantsService: ConstantsService;
    let dialogService: DialogService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ConstantsService,
                DialogService
            ]
        });

        constantsService = TestBed.get(ConstantsService);
        dialogService = TestBed.get(DialogService);
        httpMock = TestBed.get(HttpTestingController);

    });


    it('should be created', inject([ConstantsService], (service: ConstantsService) => {
        expect(service).toBeTruthy();
    }));

    it('getLaterality() should http GET lateralities', () => {
        constantsService.getLateralities().subscribe((lateralities) => {
            if (lateralities) {
                expect(lateralities).toBe(lateralitiesData);
            }
        });
        const req = httpMock.expectOne(environment.LATERALITY_URL);
        expect(req.request.method).toEqual('GET');
        req.flush(lateralitiesData);
        httpMock.verify();
    });

    it('getModifiers() should http GET Modifiers', () => {
        constantsService.getModifiers().subscribe((modifiers) => {
            if (modifiers) {
                expect(modifiers).toBe(modifiersData);
            }
        });
        const req = httpMock.expectOne(environment.MODIFIERS_URL);
        expect(req.request.method).toEqual('GET');
        req.flush(modifiersData);
        httpMock.verify();
    });

    it('getSeverity() should http GET severities', () => {
        constantsService.getSeverities().subscribe((severities) => {
            if (severities) {
                expect(severities).toBe(severitiesData);
            }
        });
        const req = httpMock.expectOne(environment.SEVERITY_URL);
        expect(req.request.method).toEqual('GET');
        req.flush(severitiesData);
        httpMock.verify();
    });

    it('getSex() should http GET sexes', () => {
        constantsService.getSex().subscribe((sexes) => {
            if (sexes) {
                expect(sexes).toBe(sexesData);
            }
        });
        const req = httpMock.expectOne(environment.SEX_URL);
        expect(req.request.method).toEqual('GET');
        req.flush(sexesData);
        httpMock.verify();
    });

    // it('getGender() should http GET genders', () => {
    //     phenopacketService.getGenders(dialogService).subscribe((genders) => {
    //         expect(genders).toBe(gendersData);
    //     });
    //     const req = httpMock.expectOne(environment.GENDER_URL);
    //     expect(req.request.method).toEqual('GET');
    //     req.flush(gendersData);
    //     httpMock.verify();
    // });

    afterAll(() => {
        TestBed.resetTestingModule();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
