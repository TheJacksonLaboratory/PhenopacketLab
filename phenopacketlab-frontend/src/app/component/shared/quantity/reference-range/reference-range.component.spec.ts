import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'src/app/component/shared/shared.module';
import { ReferenceRangeComponent } from './reference-range.component';
import { ReferenceRange } from 'src/app/models/measurement';

describe('ReferenceRangeComponent', () => {
  let component: ReferenceRangeComponent;
  let fixture: ComponentFixture<ReferenceRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceRangeComponent ],
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
    fixture = TestBed.createComponent(ReferenceRangeComponent);
    component = fixture.componentInstance;
    // initialize subject
    component.referenceRange = new ReferenceRange();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
