import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PhenotypicDetailComponent } from './phenotypic-detail.component';


describe('PhenotypicDetailComponent', () => {
  let component: PhenotypicDetailComponent;
  let fixture: ComponentFixture<PhenotypicDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenotypicDetailComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialog, useValue: {} },
        // { provide: MAT_DIALOG_DATA, useValue: {} },
        // { provide: MatDialogRef,useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
