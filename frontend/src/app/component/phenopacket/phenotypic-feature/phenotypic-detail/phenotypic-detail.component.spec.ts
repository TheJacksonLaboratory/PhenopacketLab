import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PhenotypicDetailComponent } from './phenotypic-detail.component';


describe('PhenotypicDetailComponent', () => {
  let component: PhenotypicDetailComponent;
  let fixture: ComponentFixture<PhenotypicDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenotypicDetailComponent ]
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
