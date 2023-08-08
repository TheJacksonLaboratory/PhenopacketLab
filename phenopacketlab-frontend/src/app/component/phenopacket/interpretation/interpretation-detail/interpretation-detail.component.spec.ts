import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { InterpretationDetailComponent } from './interpretation-detail.component';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';


describe('InterpretationDetailComponent', () => {
  let component: InterpretationDetailComponent;
  let fixture: ComponentFixture<InterpretationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpretationDetailComponent ],
      imports: [
        NoopAnimationsModule,
        ToastModule,
        PanelModule,
        TableModule
      ],
      providers: [
        ConfirmationService,
        { provide: DialogService, useValue: {} },
        { provide: MessageService, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpretationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
