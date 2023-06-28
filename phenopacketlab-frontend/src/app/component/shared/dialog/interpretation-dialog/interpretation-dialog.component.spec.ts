import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InterpretationDialogComponent } from './interpretation-dialog.component';

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
