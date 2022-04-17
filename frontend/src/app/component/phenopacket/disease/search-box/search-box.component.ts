import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DiseaseSearchService } from '../disease-search.service';


@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

    @Input()
    searchType: string;

    @Input()
    selectedSearchBy: string;

    @Output()
    selectedSearchItem = new EventEmitter<any>();

    @Input()
    showHint;

    @Input()
    showFilters: boolean;

    @Input()
    resetSearch: boolean;

    @Output()
    showFiltersChange = new EventEmitter<boolean>();

    searchCriteria: any = { selectedItems: [] };

    myControl = new FormControl();
    myControlSubscription: any;

    diseaseOptions: any[] = [];
    diseaseCount: number;

    placeHolderTxt = '';

    selectable = true;
    removable = true;


    constructor(private searchService: DiseaseSearchService) {
    }

    ngOnInit() {
        if (!this.resetSearch) {
            this.searchCriteria = this.searchService.getSelectedSearchItems();
        }
        if (this.searchCriteria.selectedSearchBy) {
            this.selectedSearchBy = this.searchCriteria.selectedSearchBy;
            this.initSearch(this.searchCriteria);
        }
        this.setSearchBox();
        // get list of mvar genes and store them in LocalStorage
        this.searchService.getAllHpoDiseases().subscribe(data => {
            localStorage.setItem("hpo_diseases", JSON.stringify(data));
        });
    }


    initSearch(searchItems: any) {
        this.selectedSearchItem.emit(this.searchCriteria);
        if (!this.searchCriteria.selectedItems) {
            this.searchCriteria.selectedItems = []
        }
    }

    setSearchBox() {
        if (this.myControlSubscription) {
            this.myControlSubscription.unsubscribe();
        }

        this.placeHolderTxt = 'Enter disease name';
        this.myControlSubscription = this.myControl.valueChanges.subscribe(value => {
            this.diseaseOptions = [];
            if (value && value.length > 0) {
                this._diseaseFilter(value);
            }
        });
    }

    private _diseaseFilter(value: string) {
        const filterValue = value.toLowerCase();
        this._searchDiseases(filterValue);
    }

    private _searchDiseases(filterValue: string) {
        // get list of mvar genes from localStorage
        let hpoDiseases = JSON.parse(localStorage.getItem("hpo_diseases"));
        let filteredList = hpoDiseases.filter(item => 
            // console.log(item.name);
            item.name.toLowerCase().includes(filterValue.toLowerCase()));
        // display only a max of 10 diseases in the combo box
        if (filteredList.length > 9) {
            this.diseaseCount = 10;
            this.diseaseOptions = filteredList.slice(0, 10);
        } else {
            this.diseaseCount = filteredList.length;
            this.diseaseOptions = filteredList;
        }
    }

    public selectedChanged(value: any, displayValue: string) {
        if (!this.searchCriteria.selectedItems) {
            this.searchCriteria.selectedItems = []
        }
        this.searchCriteria.selectedItems = [];
        this.searchCriteria.selectedItems.push({
            selectedValue: value,
            displayedValue: displayValue
        });
        this.selectedSearchItem.emit(this.searchCriteria);
    }

    private _searchItem() {

        this.searchCriteria.selectedSearchBy = this.selectedSearchBy;
        //this.showFilterOptions();
        this.selectedSearchItem.emit(this.searchCriteria);
    }

    reset() {
        this.searchCriteria.selectedItems = [];

        if (!this.resetSearch) {
            this.selectedSearchItem.emit(this.searchCriteria);
        }
    }

    remove(selected: any) {
        const indx = this.searchCriteria.selectedItems.indexOf(selected)
        if (indx > -1) {
            this.searchCriteria.selectedItems.splice(indx, 1)
        }
        this.selectedSearchItem.emit(this.searchCriteria);
    }

    showFilterOptions() {
        if (this.showFilters) {
            this.showFilters = false;
        } else {
            this.showFilters = true;
        }
        this.showFiltersChange.emit(this.showFilters)
    }

}

