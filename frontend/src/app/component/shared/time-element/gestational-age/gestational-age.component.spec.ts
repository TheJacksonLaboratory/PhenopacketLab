import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { GestationalAgeComponent } from './gestational-age.component';

describe('GestationalAgeComponent', () => {
  let component: GestationalAgeComponent;
  let fixture: ComponentFixture<GestationalAgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        InputNumberModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ GestationalAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestationalAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
