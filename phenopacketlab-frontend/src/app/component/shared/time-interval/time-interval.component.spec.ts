import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextModule } from 'primeng/inputtext';
import { TimeIntervalComponent } from './time-interval.component';
import { TimeInterval } from 'src/app/models/base';

describe('TimeIntervalComponent', () => {
  let component: TimeIntervalComponent;
  let fixture: ComponentFixture<TimeIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeIntervalComponent ],
      imports: [
        InputTextModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeIntervalComponent);
    component = fixture.componentInstance;
    // initialize subject
    component.timeInterval = new TimeInterval();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
