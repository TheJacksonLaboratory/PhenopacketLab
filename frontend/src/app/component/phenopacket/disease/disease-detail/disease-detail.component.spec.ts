import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/component/shared/shared.module';
import { Disease } from 'src/app/models/disease';

import { DiseaseDetailComponent } from './disease-detail.component';

describe('DiseaseDetailComponent', () => {
  let component: DiseaseDetailComponent;
  let fixture: ComponentFixture<DiseaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseDetailComponent ],
      imports: [ SharedModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseDetailComponent);
    component = fixture.componentInstance;
    component.disease = new Disease();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
