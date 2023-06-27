import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MedicalActionEditComponent } from './medical-action-edit.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

describe('MedicalActionEditComponent', () => {
  let component: MedicalActionEditComponent;
  let fixture: ComponentFixture<MedicalActionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalActionEditComponent ],
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
      ],
      providers: [
        DynamicDialogRef,
        DynamicDialogConfig,
        { provide: MessageService, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalActionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
