import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeasurementDetailComponent } from './measurement-detail.component';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Measurement } from 'src/app/models/measurement';


describe('MeasurementDetailComponent', () => {
  let component: MeasurementDetailComponent;
  let fixture: ComponentFixture<MeasurementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementDetailComponent ],
      imports: [
        BrowserAnimationsModule,
        PanelModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementDetailComponent);
    component = fixture.componentInstance;
    component.measurement = new Measurement();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
