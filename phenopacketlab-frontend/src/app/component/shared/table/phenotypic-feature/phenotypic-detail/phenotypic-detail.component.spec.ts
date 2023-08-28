import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule } from 'src/app/component/shared/shared.module';
import { PhenotypicFeature } from 'src/app/models/phenotypic-feature';

import { PhenotypicDetailComponent } from './phenotypic-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('PhenotypicDetailComponent', () => {
  let component: PhenotypicDetailComponent;
  let fixture: ComponentFixture<PhenotypicDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenotypicDetailComponent ],
      imports: [
        SharedModule,
        BrowserAnimationsModule
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypicDetailComponent);
    component = fixture.componentInstance;
    component.phenotypicFeature = new PhenotypicFeature();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
