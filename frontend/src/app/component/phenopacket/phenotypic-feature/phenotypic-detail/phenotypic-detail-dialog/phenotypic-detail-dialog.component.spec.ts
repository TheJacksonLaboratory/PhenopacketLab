import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PhenotypicDetailDialogComponent } from './phenotypic-detail-dialog.component';


describe('PhenotypicDetailDialogComponent', () => {
  let component: PhenotypicDetailDialogComponent;
  let fixture: ComponentFixture<PhenotypicDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenotypicDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypicDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
