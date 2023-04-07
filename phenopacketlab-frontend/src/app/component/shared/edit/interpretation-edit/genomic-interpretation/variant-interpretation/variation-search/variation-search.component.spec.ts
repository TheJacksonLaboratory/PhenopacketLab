import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'src/app/component/shared/shared.module';
import { VariationSearchComponent } from './variation-search.component';

describe('VariationSearchComponent', () => {
  let component: VariationSearchComponent;
  let fixture: ComponentFixture<VariationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariationSearchComponent ],
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
        DynamicDialogConfig
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
