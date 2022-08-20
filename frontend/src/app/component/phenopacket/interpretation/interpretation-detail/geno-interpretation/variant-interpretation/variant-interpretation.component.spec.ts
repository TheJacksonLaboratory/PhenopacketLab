import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { VariantInterpretationComponent } from './variant-interpretation.component';


describe('VariantInterpretationComponent', () => {
  let component: VariantInterpretationComponent;
  let fixture: ComponentFixture<VariantInterpretationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantInterpretationComponent ],
      imports: [
        MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantInterpretationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
