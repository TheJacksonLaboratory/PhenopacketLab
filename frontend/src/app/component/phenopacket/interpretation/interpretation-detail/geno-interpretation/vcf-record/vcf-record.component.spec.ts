import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { VcfRecordComponent } from './vcf-record.component';


describe('VcfRecordComponent', () => {
  let component: VcfRecordComponent;
  let fixture: ComponentFixture<VcfRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcfRecordComponent ],
      imports: [
        MatDialogModule,
        CommonModule,
        BrowserModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcfRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
