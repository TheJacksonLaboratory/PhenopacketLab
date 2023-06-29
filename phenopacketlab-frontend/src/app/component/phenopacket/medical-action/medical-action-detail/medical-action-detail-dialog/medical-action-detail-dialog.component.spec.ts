import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MedicalActionDetailDialogComponent } from './medical-action-detail-dialog.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

describe('MedicalActionDetailDialogComponent', () => {
  let component: MedicalActionDetailDialogComponent;
  let fixture: ComponentFixture<MedicalActionDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalActionDetailDialogComponent ],
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
      ],
      providers: [
        { provide: DynamicDialogConfig, useValue: {} },
        { provide: DynamicDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalActionDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
