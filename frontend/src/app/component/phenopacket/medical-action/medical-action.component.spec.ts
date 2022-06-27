import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalActionComponent } from './medical-action.component';

describe('MedicalActionComponent', () => {
  let component: MedicalActionComponent;
  let fixture: ComponentFixture<MedicalActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
