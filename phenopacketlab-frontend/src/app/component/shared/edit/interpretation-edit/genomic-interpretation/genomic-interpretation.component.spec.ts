import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'src/app/component/shared/shared.module';
import { GenomicInterpretationComponent } from './genomic-interpretation.component';

describe('GenomicInterpretationComponent', () => {
  let component: GenomicInterpretationComponent;
  let fixture: ComponentFixture<GenomicInterpretationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenomicInterpretationComponent ],
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
    fixture = TestBed.createComponent(GenomicInterpretationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
