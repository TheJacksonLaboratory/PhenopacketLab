import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AgeControlComponent } from './age-control.component';

describe('AgeControlComponent', () => {
  let component: AgeControlComponent;
  let fixture: ComponentFixture<AgeControlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
