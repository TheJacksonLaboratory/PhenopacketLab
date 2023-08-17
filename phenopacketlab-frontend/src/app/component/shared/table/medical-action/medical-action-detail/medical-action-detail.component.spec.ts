import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalActionDetailComponent } from './medical-action-detail.component';
import { PanelModule } from 'primeng/panel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MedicalAction } from 'src/app/models/medical-action';

describe('MedicalActionDetailComponent', () => {
  let component: MedicalActionDetailComponent;
  let fixture: ComponentFixture<MedicalActionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalActionDetailComponent ],
      imports: [
        NoopAnimationsModule,
        ToastModule,
        PanelModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalActionDetailComponent);
    component = fixture.componentInstance;
    component.medicalAction = new MedicalAction();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
