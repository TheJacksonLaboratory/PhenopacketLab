import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DiseaseSearchDialogComponent } from './disease-search-dialog.component';
import { ConfirmationService } from 'primeng/api';

describe('DiseaseSearchDialogComponent', () => {
  let component: DiseaseSearchDialogComponent;
  let fixture: ComponentFixture<DiseaseSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseSearchDialogComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [
        DialogService,
        ConfirmationService,
        { provide: DynamicDialogConfig, useValue: {} },
        { provide: DynamicDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
