import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SpinnerDialogComponent } from './spinner-dialog.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

describe('SpinnerDialogComponent', () => {
  let component: SpinnerDialogComponent;
  let fixture: ComponentFixture<SpinnerDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ProgressSpinnerModule
      ],
      providers: [
        DynamicDialogConfig
      ],
      declarations: [ SpinnerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
