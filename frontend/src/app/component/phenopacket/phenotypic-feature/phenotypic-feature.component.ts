import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';

import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';
import { Age, AgeRange, Evidence, GestationalAge, OntologyClass, TimeElement, TimeInterval } from 'src/app/models/base';
import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';
import { SpinnerDialogComponent } from '../../shared/spinner-dialog/spinner-dialog.component';

@Component({
    selector: 'app-phenotypic-feature',
    templateUrl: './phenotypic-feature.component.html',
    styleUrls: ['./phenotypic-feature.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class PhenotypicFeatureComponent implements AfterViewInit, OnInit {
    // search params
    itemName = "Phenotypic feature";
    searchLabel = "Phenotypic feature";
    placeHolderTxt = "Enter a phenotypic feature name";
    localStorageKey = "phenotypic_features";

    @ViewChild('phenotypicPaginator', { static: true }) phenotypicPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    //Table items
    displayedColumns = ['label', 'status', 'onset', 'resolution', 'severity', 'modifiers', 'evidence', 'category', 'remove'];

    phenotypicDataSource = new MatTableDataSource<PhenotypicFeature>();
    phenotypicCount: number;

    // MatPaginator Inputs
    pageLength = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 50, 100];

    //searchparams
    currSearchParams: any = {}

    expandedElement: PhenotypicFeature | null;
    @Input()
    phenotypicFeatures: PhenotypicFeature[] = [];
    // @ViewChild('phenotypicTable', {static:false}) table: MatTable<PhenotypicFeature>;

    dialogRef: any;
    spinnerDialogRef: any;

    constructor(public searchService: PhenotypeSearchService, private route: ActivatedRoute, public dialog: MatDialog, private router: Router) {
    }

    ngOnInit() {

        // load example data
        // this.phenotypicDataSource = new PhenotypicFeatureData().PHENOTYPIC_DATA;
        this.phenotypicDataSource.data = this.phenotypicFeatures;
    }

    ngAfterViewInit() {

        // this.sort.sortChange.subscribe(() => {

        //     this.currSearchParams.sortBy = this.sort.active;
        //     this.currSearchParams.sortDirection = this.sort.direction;
        //     this.currSearchParams.offset = 0;
        //     this.varPaginator.pageIndex = 0;

        //     if (this.currSearchParams.selectedItems) {
        //         if (this.sort.active && this.currSearchParams.selectedItems.length > 0) {
        //             this._getPhenotypicFeatures(this.currSearchParams)
        //         }
        //     }
        // });
    }

    /**
     * Add a new phenotypic feature with default values or no values
     */
    addPhenotypicFeature(phenotypicFeature?: PhenotypicFeature) {
        if (phenotypicFeature === undefined) {
            let feature = new PhenotypicFeature();
            feature.description = 'Phenotypic Feature description';
            feature.type = new OntologyClass('id ', 'Name');
            feature.onset = new TimeElement(new GestationalAge(0, 0), new Age(''), new AgeRange(new Age(''), new Age('')), new OntologyClass('', ''), '', new TimeInterval('', ''));
            feature.evidence = new Evidence(new OntologyClass('', ''), new OntologyClass('', ''), new TimeElement(new GestationalAge(0, 0), new Age(''), new AgeRange(new Age(''), new Age('')), new OntologyClass('', ''), '', new TimeInterval('', '')));
            feature.excluded = false;
            feature.resolution = new TimeElement(new GestationalAge(0, 0), new Age(''), new AgeRange(new Age(''), new Age('')), new OntologyClass('', ''), '', new TimeInterval('', ''));
            feature.severity = new OntologyClass('', '');
            feature.modifiers = new OntologyClass('', '');
            this.phenotypicFeatures.push(feature);
        } else {
            this.phenotypicFeatures.push(phenotypicFeature);
        }
        this.phenotypicDataSource.data = this.phenotypicFeatures;
        // TODO push changes to api
    }

    /**
     * Removes the chosen element, if ok is pressed on the popup window.
     * @param element 
     * @returns 
     */
    deleteFeature(element: PhenotypicFeature) {
        const msgData = { 'title': 'Delete Phenotypic Feature' };
        msgData['description'] = 'Delete the Phenotypic Feature named "' + element.type.label + '" ?';
        msgData['displayCancelButton'] = true;
        const dialogRef = this.dialog.open(MessageDialogComponent, {
            width: '400px',
            data: msgData
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'ok') {
                this.removeFromDatasource(element);
            }
        });
        return dialogRef;
    }

    removeFromDatasource(phenoFeature: PhenotypicFeature) {
        this.phenotypicFeatures.forEach((element, index) => {
            if (element == phenoFeature) {
                this.phenotypicFeatures.splice(index, 1);
            }
        });
        this.phenotypicDataSource.data = this.phenotypicFeatures;
    }

    private clearSort() {
        this.sort.sort({ id: '', start: 'asc', disableClear: false });
    }

    onSearchCriteriaChange(searchCriteria: any) {
        const params: any = {};
        this.currSearchParams.offset = 0;
        console.log("selectedItems[]");
        console.log(searchCriteria.selectedItems[0].selectedValue.id);
        let id = searchCriteria.selectedItems[0].selectedValue.id;
        this.phenotypicPaginator.pageIndex = 0;
        this.clearSort();

        if ((searchCriteria.selectedItems && searchCriteria.selectedItems.length > 0)) {
            this.currSearchParams = searchCriteria;
            this._queryPhenotypicFeatureById(id);
        }
    }

    private _queryPhenotypicFeatureById(id: string) {
        this.openSpinnerDialog();
        this.searchService.queryPhenotypicFeatureById(id).subscribe(data => {
            let phenotypicFeature = new PhenotypicFeature();
            phenotypicFeature.type = new OntologyClass(data.id, data.name);
            phenotypicFeature.description = data.description;
            phenotypicFeature.onset = new TimeElement(new GestationalAge(0, 0), new Age(''), new AgeRange(new Age(''), new Age('')), new OntologyClass('', ''), '', new TimeInterval('', ''));
            phenotypicFeature.evidence = new Evidence(new OntologyClass('', ''), new OntologyClass('', ''), new TimeElement(new GestationalAge(0, 0), new Age(''), new AgeRange(new Age(''), new Age('')), new OntologyClass('', ''), '', new TimeInterval('', '')));
            phenotypicFeature.excluded = false;
            phenotypicFeature.resolution = new TimeElement(new GestationalAge(0, 0), new Age(''), new AgeRange(new Age(''), new Age('')), new OntologyClass('', ''), '', new TimeInterval('', ''));
            phenotypicFeature.severity = new OntologyClass('', '');
            phenotypicFeature.modifiers = new OntologyClass('', '');
            this.addPhenotypicFeature(phenotypicFeature);
            this.spinnerDialogRef.close();
        },
            (error) => {
                this.spinnerDialogRef.close();
            });
    }

    doPageChange(pageEvent: any) {

        // if (this.currSearchParams) {
        //     this.currSearchParams.offset = pageEvent.pageIndex * pageEvent.pageSize;
        //     this.currSearchParams.max = pageEvent.pageSize;
        //     this._getPhenotypicFeatures(this.currSearchParams);
        // }
    }

    expandCollapse(element: any) {
        this.expandedElement = this.expandedElement === element ? null : element

    }

    openSpinnerDialog() {
        this.spinnerDialogRef = this.dialog.open(SpinnerDialogComponent, {
            panelClass: 'transparent',
            disableClose: true
        });
    }

}

