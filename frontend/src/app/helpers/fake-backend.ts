import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for list of diseases
// let diseasesf = JSON.parse("") || [];
const diseases = require('../../assets/data/mondo.json');
const diseaseNames = require('../../assets/data/mondo-id-names.json');
const phenotypicFeatures = require('../../assets/data/hp.json');
const phenotypicFeaturesNames = require('../../assets/data/hp-id-names.json');
const bodySites = require('../../assets/data/human-view.json');
const modifiers = require('../../assets/data/modifiers.json');
const onsets = require('../../assets/data/onset.json');
const tnmFindings = require('../../assets/data/tnm.json');
const mondoDiseases = require('../../assets/data/disease-mondo.json');
const textMinedExample = require('../../assets/data/text-mined-example.json');
const genders = require('../../assets/data/gender.json');

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            // tslint:disable-next-line:max-line-length
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/diseases') && method === 'GET':
                    return getDiseases();
                case url.match(/\/diseases\/.*/) && method === 'GET':
                    return getDiseaseById();
                case url.endsWith('/phenotypic-features') && method === 'GET':
                    return getPhenotypicFeatures();
                case url.match(/\/phenotypic-features\/.*/) && method === 'GET':
                    return getPhenotypicFeatureById();
                case url.endsWith('/bodysites') && method === 'GET':
                    return getBodySites();
                case url.endsWith('modifier') && method === 'GET':
                    return getModifiers();
                case url.endsWith('gender') && method === 'GET':
                    return getGenders();
                case url.endsWith('onset') && method === 'GET':
                    return getOnsets();
                case url.endsWith('tnm-findings') && method === 'GET':
                    return getTnmFindings();
                case url.endsWith('mondo-diseases') && method === 'GET':
                    return getMondoDiseases();
                case url.endsWith('text-miner') && method === 'POST':
                    return getTextMined();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions
        function getDiseases() {
            return ok(diseaseNames);
        }

        function getDiseaseById() {
            const disease = diseases.find(x => x.id === idFromUrl());
            return ok(disease);
        }

        function getPhenotypicFeatures() {
            return ok(phenotypicFeaturesNames);
        }

        function getPhenotypicFeatureById() {
            const phenotypicFeature = phenotypicFeatures.find(x => x.id === idFromUrl());
            return ok(phenotypicFeature);
        }

        function getBodySites() {
            return ok(bodySites);
        }
        function getGenders() {
            return ok(genders);
        }
        function getModifiers() {
            return ok(modifiers);
        }
        function getOnsets() {
            return ok(onsets);
        }
        function getTnmFindings() {
            return ok(tnmFindings);
        }
        function getMondoDiseases() {
            return ok(mondoDiseases);
        }
        function getTextMined() {
            return ok(textMinedExample);
        }
        // helper functions

        // tslint:disable-next-line:no-shadowed-variable
        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return urlParts[urlParts.length - 1];
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
