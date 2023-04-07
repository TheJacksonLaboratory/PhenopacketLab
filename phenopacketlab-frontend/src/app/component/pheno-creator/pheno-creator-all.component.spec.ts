import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { PhenoCreatorAllComponent } from './pheno-creator-all.component';


describe('PhenoCreatorAllComponent', () => {
  let component: PhenoCreatorAllComponent;
  let fixture: ComponentFixture<PhenoCreatorAllComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenoCreatorAllComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        CardModule,
        StepsModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenoCreatorAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
