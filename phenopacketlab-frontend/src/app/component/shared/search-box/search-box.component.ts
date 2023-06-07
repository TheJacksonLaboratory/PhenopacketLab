import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

    @Input()
    searchLabel: string;
    @Input()
    itemName: string;
    @Input()
    searchType: string;
    @Input()
    showHint;
    @Input()
    items: any[];
    @Output()
    selectedItemChange = new EventEmitter<any>();
    // itemOptions: any[] = [];
    // itemCount: number;

    @Input()
    placeHolderTxt;

    selectable = true;
    removable = true;

    selectedItem: any;
    filteredItems: any[];

    constructor() {}

    ngOnInit() {}

    itemSelected(item: any) {
        this.selectedItemChange.emit(item);
    }

    filterItems(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.id.value.toLowerCase().indexOf(query.toLowerCase()) === 0
                || item.lbl.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(item);
            }
        }
        this.filteredItems = filtered;
    }
}

