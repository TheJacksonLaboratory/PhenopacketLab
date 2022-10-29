import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VariantInterpretationComponent } from './variant-interpretation.component';


describe('VariantInterpretationComponent', () => {
  let component: VariantInterpretationComponent;
  let fixture: ComponentFixture<VariantInterpretationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantInterpretationComponent ],
      imports: [
        MatDialogModule,
        MatIconModule,
        CdkAccordionModule,
        MatExpansionModule,
        MatTooltipModule,
        MatIconModule
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
