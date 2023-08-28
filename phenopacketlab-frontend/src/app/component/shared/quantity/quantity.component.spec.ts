import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'src/app/component/shared/shared.module';
import { QuantityComponent } from './quantity.component';
import { Quantity } from 'src/app/models/measurement';

describe('QuantityComponent', () => {
  let component: QuantityComponent;
  let fixture: ComponentFixture<QuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityComponent ],
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
    fixture = TestBed.createComponent(QuantityComponent);
    component = fixture.componentInstance;
    // initialize subject
    component.quantity = new Quantity();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
