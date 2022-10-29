import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchFilterComponent } from './search-filter.component';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFilterComponent ],
      imports: [
        MatAutocompleteModule,
        MatFormFieldModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
