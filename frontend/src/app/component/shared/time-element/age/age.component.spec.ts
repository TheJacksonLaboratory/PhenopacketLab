import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AgeComponent } from './age.component';

describe('DateComponent', () => {
  let component: AgeComponent;
  let fixture: ComponentFixture<AgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
