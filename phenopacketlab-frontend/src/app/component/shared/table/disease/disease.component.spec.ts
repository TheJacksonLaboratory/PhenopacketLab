import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from '../../shared.module';

import { DiseaseComponent } from './disease.component';

describe('DiseaseComponent', () => {
  let component: DiseaseComponent;
  let fixture: ComponentFixture<DiseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseComponent ],
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        SharedModule
      ],
      providers: [
        DialogService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
