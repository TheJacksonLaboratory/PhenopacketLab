import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GenoInterpretationDetailComponent } from './geno-interpretation-detail.component';


describe('GenoInterpretationDetailComponent', () => {
  let component: GenoInterpretationDetailComponent;
  let fixture: ComponentFixture<GenoInterpretationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenoInterpretationDetailComponent ],
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatOptionModule,
        MatButtonModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenoInterpretationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});