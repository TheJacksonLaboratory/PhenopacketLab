import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseDetailComponent } from './disease-detail.component';

describe('DiseaseDetailComponent', () => {
  let component: DiseaseDetailComponent;
  let fixture: ComponentFixture<DiseaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
