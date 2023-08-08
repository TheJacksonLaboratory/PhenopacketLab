import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from '../../shared.module';
import { PhenotypicFeatureComponent } from './phenotypic-feature.component';


describe('PhenotypicFeatureComponent', () => {
  let component: PhenotypicFeatureComponent;
  let fixture: ComponentFixture<PhenotypicFeatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenotypicFeatureComponent ],
      imports: [
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,
        SharedModule,
        NoopAnimationsModule
      ],
      providers: [
        DialogService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypicFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
