import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BiosampleComponent } from './biosample.component';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedModule } from '../../shared/shared.module';


describe('BiosampleComponent', () => {
  let component: BiosampleComponent;
  let fixture: ComponentFixture<BiosampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiosampleComponent ],
      imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule
      ],
      providers: [
        DialogService
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
