import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MeasurementDetailDialogComponent } from './measurement-detail-dialog.component';

describe('MeasurementDetailDialogComponent', () => {
  let component: MeasurementDetailDialogComponent;
  let fixture: ComponentFixture<MeasurementDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementDetailDialogComponent ],
      imports: [
        MatDialogModule,
        HttpClientModule
      ],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
