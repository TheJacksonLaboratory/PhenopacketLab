import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedModule } from 'src/app/component/shared/shared.module';
import { PhenotypicFeatureDialogComponent } from './phenotypic-feature-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('PhenotypicFeatureDialogComponent', () => {
  let component: PhenotypicFeatureDialogComponent;
  let fixture: ComponentFixture<PhenotypicFeatureDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenotypicFeatureDialogComponent ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        DynamicDialogRef,
        DynamicDialogConfig,
        DialogService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypicFeatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
