import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalActionDetailComponent } from './medical-action-detail.component';
import { PanelModule } from 'primeng/panel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastModule } from 'primeng/toast';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
