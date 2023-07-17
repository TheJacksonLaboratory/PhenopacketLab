import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InterpretationDialogComponent } from './interpretation-dialog.component';
import { MessageService } from 'primeng/api';

describe('InterpretationDialogComponent', () => {
  let component: InterpretationDialogComponent;
  let fixture: ComponentFixture<InterpretationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpretationDialogComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [
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
