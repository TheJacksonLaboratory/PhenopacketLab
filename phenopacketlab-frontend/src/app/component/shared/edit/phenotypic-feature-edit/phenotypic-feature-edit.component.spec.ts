import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/component/shared/shared.module';
import { PhenotypicFeatureEditComponent } from './phenotypic-feature-edit.component';
import { DialogService } from 'primeng/dynamicdialog';


describe('PhenotypicFeatureEditComponent', () => {
  let component: PhenotypicFeatureEditComponent;
  let fixture: ComponentFixture<PhenotypicFeatureEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenotypicFeatureEditComponent ],
      imports: [
        NoopAnimationsModule,
        SharedModule,
        HttpClientTestingModule
      ],
      providers: [
        DialogService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypicFeatureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
