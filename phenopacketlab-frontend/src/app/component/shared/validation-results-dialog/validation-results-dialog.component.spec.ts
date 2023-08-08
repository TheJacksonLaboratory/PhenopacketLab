import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidationResultsDialogComponent } from './validation-results-dialog.component';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

describe('ValidationResultsDialogComponent', () => {
  let component: ValidationResultsDialogComponent;
  let fixture: ComponentFixture<ValidationResultsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationResultsDialogComponent ],
      imports: [
        HttpClientModule,
        ButtonModule
      ],
      providers: [
        MessageService,
        { provide: DynamicDialogConfig, useValue: {} },
        { provide: DynamicDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
