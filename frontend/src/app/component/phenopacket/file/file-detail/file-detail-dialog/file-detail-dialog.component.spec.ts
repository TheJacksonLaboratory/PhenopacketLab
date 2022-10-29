import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileDetailDialogComponent } from './file-detail-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/component/shared/shared.module';

describe('FileDetailDialogComponent', () => {
  let component: FileDetailDialogComponent;
  let fixture: ComponentFixture<FileDetailDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatDialogModule,
        SharedModule,
        MatFormFieldModule
      ],
      declarations: [ FileDetailDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
