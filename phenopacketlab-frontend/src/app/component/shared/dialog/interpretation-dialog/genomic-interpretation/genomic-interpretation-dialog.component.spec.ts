import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'src/app/component/shared/shared.module';
import { GenomicInterpretationDialogComponent } from './genomic-interpretation-dialog.component';
import { GenomicInterpretation } from 'src/app/models/interpretation';

describe('GenomicInterpretationDialogComponent', () => {
  let component: GenomicInterpretationDialogComponent;
  let fixture: ComponentFixture<GenomicInterpretationDialogComponent>;
  let genomicInterpretation: GenomicInterpretation;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenomicInterpretationDialogComponent ],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        FormsModule,
        DropdownModule,
        RadioButtonModule,
        ButtonModule,
        SharedModule,
        HttpClientTestingModule
      ],
      providers: [
        DynamicDialogRef,
        DynamicDialogConfig,
        DialogService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomicInterpretationDialogComponent);
    component = fixture.componentInstance;
    genomicInterpretation = new GenomicInterpretation();
    component.genomicInterpretation = genomicInterpretation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
