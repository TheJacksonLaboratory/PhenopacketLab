import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BiosampleComponent } from './biosample.component';


describe('BiosampleComponent', () => {
  let component: BiosampleComponent;
  let fixture: ComponentFixture<BiosampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiosampleComponent ],
      imports: [
        BrowserModule,
        HttpClientModule,
        MatDialogModule
      ],
      providers: [
        HttpClient
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiosampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
