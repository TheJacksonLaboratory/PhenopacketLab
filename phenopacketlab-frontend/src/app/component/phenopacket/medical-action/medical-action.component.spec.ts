import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalActionComponent } from './medical-action.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('MedicalActionComponent', () => {
  let component: MedicalActionComponent;
  let fixture: ComponentFixture<MedicalActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalActionComponent ],
      imports: [
      ],
      providers: [
        { provide: DialogService, useValue: {} },
        { provide: MessageService, useValue: {} },
        { provide: ConfirmationService, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
