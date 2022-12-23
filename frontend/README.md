# Frontend

This is the Phenopacketlab UI, built with Angular Material and Node.

The live application can be accessed [here](http://34.23.111.136/dashboard).

## Getting started

The Node version is 14.2.
If on MacOs, you can install Node using homebrew and the following command:

`brew install node@14`

Fother operating systems, the specific version of Node can be downloaded [here](https://nodejs.org/en/download/) for the corresponding platform.

NPM (Node Package Manager) should be installed with Node and is then used to pull all the required dependencies in order to run the Frontend UI application.

Once the development branch of [Phenopacketlab](https://github.com/TheJacksonLaboratory/PhenopacketLab) has been checkedout, cd to `../Phenopacketlab/frontend/`.

Make sure that Node memory has its size increased with the following command: `export NODE_OPTIONS=--max_old_space_size=4096`
To install all packages required for the Frontend app, run `npm install`. This will create a `node_module` folder in the frontend app folder which will be quite large (with all the required Angular dependencies).

## Run Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. In order to run in dev mode with the fakebackend use the following command: `ng serve --configuration dev`. This is recommanded in order to have a running Frontend UI.

Below are more info useful to developers and collaborators.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
