import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/component/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NoopAnimationsModule,
        SharedModule,
        ReactiveFormsModule
      ],
      declarations: [ ConfirmationDialogComponent ],
      providers: [
        DynamicDialogRef,
        DynamicDialogConfig
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
