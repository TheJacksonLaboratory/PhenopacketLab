import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiseaseDetailDialogComponent } from './disease-detail-dialog.component';

describe('DiseaseDetailDialogComponent', () => {
  let component: DiseaseDetailDialogComponent;
  let fixture: ComponentFixture<DiseaseDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
