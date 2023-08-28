import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchBoxComponent } from './search-box.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';


describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoxComponent ],
      imports: [ 
        HttpClientTestingModule,
        AutoCompleteModule,
        FormsModule
       ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
