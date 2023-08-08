import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PhenopacketModule } from '../../../../phenopacket-list/phenopacket-list.module';
import { BiosampleDetailComponent } from './biosample-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('BiosampleDetailComponent', () => {
  let component: BiosampleDetailComponent;
  let fixture: ComponentFixture<BiosampleDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BiosampleDetailComponent ],
      imports: [
        HttpClientTestingModule,
        PhenopacketModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiosampleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
