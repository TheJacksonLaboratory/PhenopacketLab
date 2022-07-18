import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeasurementDetailDialogComponent } from './measurement-detail-dialog.component';

describe('MeasurementDetailDialogComponent', () => {
  let component: MeasurementDetailDialogComponent;
  let fixture: ComponentFixture<MeasurementDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementDetailDialogComponent ]
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
