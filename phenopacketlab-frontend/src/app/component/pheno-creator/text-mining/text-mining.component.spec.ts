import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';

import { TextMiningComponent } from './text-mining.component';

describe('TextMiningComponent', () => {
  let component: TextMiningComponent;
  let fixture: ComponentFixture<TextMiningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextMiningComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        SharedModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextMiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
