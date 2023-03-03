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
const tnmTumors = require('../../assets/data/tnm-tumors.json');
const tnmNodes = require('../../assets/data/tnm-nodes.json');
const tnmMetastasis = require('../../assets/data/tnm-metastasis.json');
const mondoDiseases = require('../../assets/data/disease-mondo.json');
const textMinedExample = require('../../assets/data/text-mined-example.json');
const sexes = require('../../assets/data/sex.json');
const genders = require('../../assets/data/gender.json');
const laterality = require('../../assets/data/laterality.json');
const severity = require('../../assets/data/severity.json');

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
                case url.endsWith('sex') && method === 'GET':
                    return getSexes();
                case url.endsWith('gender') && method === 'GET':
                    return getGenders();
                case url.endsWith('laterality') && method === 'GET':
                    return getLaterality();
                case url.endsWith('severity') && method === 'GET':
                    return getSeverity();
                case url.endsWith('onset') && method === 'GET':
                    return getOnsets();
                case url.endsWith('tree-tnm-tumor') && method === 'GET':
                    return getTnmTumor();
                case url.endsWith('tree-tnm-node') && method === 'GET':
                    return getTnmNode();
                case url.endsWith('tree-tnm-metastasis') && method === 'GET':
                    return getTnmMetastasis();
                case url.endsWith('mondo-diseases') && method === 'GET':
                    return getMondoDiseases();
                case url.endsWith('textminer') && method === 'POST':
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
        function getSexes() {
            return ok(sexes);
        }
        function getGenders() {
            return ok(genders);
        }
        function getLaterality() {
            return ok(laterality);
        }
        function getSeverity() {
            return ok(severity);
        }
        function getModifiers() {
            return ok(modifiers);
        }
        function getOnsets() {
            return ok(onsets);
        }
        function getTnmTumor() {
            return ok(tnmTumors);
        }
        function getTnmNode() {
            return ok(tnmNodes);
        }
        function getTnmMetastasis() {
            return ok(tnmMetastasis);
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
