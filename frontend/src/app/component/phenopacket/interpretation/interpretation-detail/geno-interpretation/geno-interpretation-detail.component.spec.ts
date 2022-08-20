import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { GenoInterpretationDetailComponent } from './geno-interpretation-detail.component';


describe('GenoInterpretationDetailComponent', () => {
  let component: GenoInterpretationDetailComponent;
  let fixture: ComponentFixture<GenoInterpretationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenoInterpretationDetailComponent ],
      imports: [
        MatDialogModule
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
