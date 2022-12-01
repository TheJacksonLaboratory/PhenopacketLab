import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})

export class SearchFilterComponent implements OnInit {
  myFormControl = new UntypedFormControl();
  @Input()
  title: string;
  @Input()
  options: string[];
  @Output()
  onSelected = new EventEmitter<string>();
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterOptions(value))
      );
  }

  private _filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.options) {
      const result = this.options.filter(val => {
        val.toLowerCase().includes(filterValue);
      });
      if (result.length === 0) {
        return [ value ];
      }
      return result;
    }
    return [];
  }

  selectItem(selected?: any) {
    if (selected === undefined) {
      this.onSelected.emit('');
    } else {
      this.onSelected.emit(selected);
    }
  }
}
