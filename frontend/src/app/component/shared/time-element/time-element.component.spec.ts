import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TimeElementComponent } from './time-element.component';

describe('TimeElementComponent', () => {
  let component: TimeElementComponent;
  let fixture: ComponentFixture<TimeElementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
