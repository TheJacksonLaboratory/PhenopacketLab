import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BiosampleDetailDialogComponent } from './biosample-detail-dialog.component';


describe('BiosampleDetailDialogComponent', () => {
  let component: BiosampleDetailDialogComponent;
  let fixture: ComponentFixture<BiosampleDetailDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BiosampleDetailDialogComponent ],
      imports: [
      ],
      providers: [

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiosampleDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
