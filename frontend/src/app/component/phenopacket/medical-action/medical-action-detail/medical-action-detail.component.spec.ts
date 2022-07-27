import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalActionDetailComponent } from './medical-action-detail.component';

describe('MedicalActionDetailComponent', () => {
  let component: MedicalActionDetailComponent;
  let fixture: ComponentFixture<MedicalActionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalActionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalActionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});