import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';

import { PhenotypicDetailComponent } from './phenotypic-detail.component';


describe('PhenotypicDetailComponent', () => {
  let component: PhenotypicDetailComponent;
  let fixture: ComponentFixture<PhenotypicDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenotypicDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypicDetailComponent);
    component = fixture.componentInstance;
    component.phenotypicFeature = new PhenotypicFeature();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
