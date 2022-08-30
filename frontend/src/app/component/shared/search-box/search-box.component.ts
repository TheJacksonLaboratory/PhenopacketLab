import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { BaseSearchService } from 'src/app/services/base-search.service';


@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

    @Input()
    localStorageKey: string;
    @Input()
    searchLabel: string;
    @Input()
    itemName: string;
    @Input()
    searchService: BaseSearchService;

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

    myControl = new UntypedFormControl();
    myControlSubscription: any;

    itemOptions: any[] = [];
    itemCount: number;

    @Input()
    placeHolderTxt;

    selectable = true;
    removable = true;


    constructor() {
    }

    ngOnInit() {
        if (this.searchService) {
            if (!this.resetSearch) {
                this.searchCriteria = this.searchService.getSelectedSearchItems();
            }
            if (this.searchCriteria.selectedSearchBy) {
                this.selectedSearchBy = this.searchCriteria.selectedSearchBy;
                this.initSearch(this.searchCriteria);
            }
            this.setSearchBox();
            this.searchService.getAll().subscribe(data => {
                localStorage.setItem(this.localStorageKey, JSON.stringify(data));
            });
        }
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

        this.myControlSubscription = this.myControl.valueChanges.subscribe(value => {
            this.itemOptions = [];
            if (value && value.length > 0) {
                this._itemFilter(value);
            }
        });
    }

    private _itemFilter(value: string) {
        const filterValue = value.toLowerCase();
        this._searchItems(filterValue);
    }

    private _searchItems(filterValue: string) {
        // get list of items from localStorage TODO replace by localStorageKey
        let items = JSON.parse(localStorage.getItem(this.localStorageKey));
        let filteredList = items.filter(item => 
            // console.log(item.name);
            item.name.toLowerCase().includes(filterValue.toLowerCase()));
        // display only a max of 10 items in the combo box
        if (filteredList.length > 9) {
            this.itemCount = 10;
            this.itemOptions = filteredList.slice(0, 10);
        } else {
            this.itemCount = filteredList.length;
            this.itemOptions = filteredList;
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

