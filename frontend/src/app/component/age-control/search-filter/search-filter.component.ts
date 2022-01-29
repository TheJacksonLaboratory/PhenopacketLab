import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})

export class SearchFilterComponent {
  myFormControl = new FormControl();
  @Input()
  title: string;
  @Input()
  options: string[];
  
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

    return this.options.filter(day => day.toLowerCase().includes(filterValue));
  }
}