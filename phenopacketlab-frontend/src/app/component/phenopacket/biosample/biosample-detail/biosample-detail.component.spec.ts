import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PhenopacketModule } from '../../phenopacket.module';
import { BiosampleDetailComponent } from './biosample-detail.component';


describe('BiosampleDetailComponent', () => {
  let component: BiosampleDetailComponent;
  let fixture: ComponentFixture<BiosampleDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BiosampleDetailComponent ],
      imports: [
        PhenopacketModule,
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
