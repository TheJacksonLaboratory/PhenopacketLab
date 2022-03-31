import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';
import { SearchService } from './search.service';
import { PhenotypicFeatureData } from './phenotypic-feature-data';
import { MatTable } from '@angular/material/table';
import { Age, AgeRange, Evidence, GestationalAge, OntologyClass, TimeElement, TimeInterval } from 'src/app/models/base';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';

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

    @ViewChild('varPaginator', { static: true }) varPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    //Table items
    displayedColumns = ['label', 'status', 'onset', 'resolution', 'severity', 'modifiers', 'evidence', 'category', 'remove'];

    phenotypicDataSource: PhenotypicFeature[] = [];
    varCount: number;

    // MatPaginator Inputs
    pageLength = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 50, 100];

    //searchparams
    currSearchParams: any = {}

    showVarFilters = false;
    enableFilters = false;

    expandedElement: PhenotypicFeature | null;
    @ViewChild(MatTable) table: MatTable<PhenotypicFeature>;

    dialogRef: any;
    spinnerDialogRef: any;

    constructor(private searchService: SearchService, private route: ActivatedRoute, public dialog: MatDialog, private router: Router) {
    }

    ngOnInit() {

        // load example data
        this.phenotypicDataSource = new PhenotypicFeatureData().PHENOTYPIC_DATA;
        // const params: any = {};

        // this.route.paramMap.subscribe(paramsIn => {

        //     const variant = paramsIn.get('variant');

        //     if (variant) {

        //         // this.currSearchParams.selectedItems = this.searchService.getSelectedSearchItems;

        //         this._getPhenotypicFeatures(this.currSearchParams);
        //     }
        // });
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
    addPhenotypicFeature() {
        let phenotypicFeature = new PhenotypicFeature();
        phenotypicFeature.description = 'Phenotypic Feature description';
        phenotypicFeature.type = new OntologyClass('id ', 'Name');
        phenotypicFeature.onset = new TimeElement(new GestationalAge(0, 0), new Age(''), new AgeRange(new Age(''), new Age('')), new OntologyClass('', ''), '', new TimeInterval('', ''));
        phenotypicFeature.evidence = new Evidence(new OntologyClass('', ''), new OntologyClass('', ''), new TimeElement(new GestationalAge(0, 0), new Age(''), new AgeRange(new Age(''), new Age('')), new OntologyClass('', ''), '', new TimeInterval('', '')));
        phenotypicFeature.excluded = false;
        phenotypicFeature.resolution = new TimeElement(new GestationalAge(0, 0), new Age(''), new AgeRange(new Age(''), new Age('')), new OntologyClass('', ''), '', new TimeInterval('', ''));
        phenotypicFeature.severity = new OntologyClass('', '');
        phenotypicFeature.modifiers = new OntologyClass('', '');
        this.phenotypicDataSource.push(phenotypicFeature);
        this.table.renderRows();
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
                this.table.renderRows();
            }
        });
        return dialogRef;
    }

    removeFromDatasource(phenoFeature: PhenotypicFeature) {
        this.phenotypicDataSource.forEach((element, index) => {
            if (element == phenoFeature) {
                this.phenotypicDataSource.splice(index, 1);
            }
        });
        // this.searchService.getDataFilesAndParameters().subscribe(resp => {
        //     // let jsonObj = JSON.parse(resp)
        //     this.dataSource = new MatTableDataSource(resp);
        //     this.dataSource.paginator = this.paginator;
        //     this.dataSource.sort = this.sort;
        // }, err => {
        //     // TODO: display our server error dialog?
        //     console.log(err);
        // });
        // this.changeDetectorRefs.detectChanges();
    }

    private clearSort() {
        this.sort.sort({ id: '', start: 'asc', disableClear: false });
    }

    private _getPhenotypicFeatures(params: any) {
        // this.openSpinnerDialog();
        this.searchService.queryPhenotypicFeature(params).subscribe(data => {

            let temp = data.phenotypicFeatures as [];

            this.phenotypicDataSource = temp;

            this.varCount = data.variantCount;
            this.pageLength = this.varCount;
            this.varPaginator.pageSize = params.max;
            this.enableFilters = true;
            this.spinnerDialogRef.close();
        },
            (error) => {
                this.spinnerDialogRef.close();
            });
    }

    doPageChange(pageEvent: any) {

        if (this.currSearchParams) {
            this.currSearchParams.offset = pageEvent.pageIndex * pageEvent.pageSize;
            this.currSearchParams.max = pageEvent.pageSize;
            this._getPhenotypicFeatures(this.currSearchParams);
        }
    }

    showFilters() {
        if (this.enableFilters) {
            if (this.showVarFilters) {
                this.showVarFilters = false;
            } else {
                this.showVarFilters = true;
            }
        }
    }

    expandCollapse(element: any) {
        this.expandedElement = this.expandedElement === element ? null : element

    }



    // openSpinnerDialog() {
    //     this.spinnerDialogRef = this.dialog.open(SpinnerDialogComponent, {
    //             panelClass: 'transparent',
    //             disableClose: true
    //     });
    // }

}

