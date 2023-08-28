import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InterpretationDialogComponent } from './interpretation-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

describe('InterpretationDialogComponent', () => {
  let component: InterpretationDialogComponent;
  let fixture: ComponentFixture<InterpretationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpretationDialogComponent ],
      imports: [
        HttpClientModule,
        ToastModule,
        ConfirmDialogModule,
        PanelModule,
        CardModule,
        FormsModule,
        CheckboxModule,
        DropdownModule
      ],
      providers: [
        ConfirmationService,
        MessageService,
        DialogService,
        { provide: DynamicDialogConfig, useValue: {} },
        { provide: DynamicDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpretationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
