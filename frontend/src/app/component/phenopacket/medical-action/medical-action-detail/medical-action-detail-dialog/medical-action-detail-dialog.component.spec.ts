import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalActionDetailDialogComponent } from './medical-action-detail-dialog.component';

describe('MedicalActionDetailDialogComponent', () => {
  let component: MedicalActionDetailDialogComponent;
  let fixture: ComponentFixture<MedicalActionDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalActionDetailDialogComponent ]
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
