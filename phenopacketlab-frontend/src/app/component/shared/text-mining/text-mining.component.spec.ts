import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared.module';

import { TextMiningComponent } from './text-mining.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

describe('TextMiningComponent', () => {
  let component: TextMiningComponent;
  let fixture: ComponentFixture<TextMiningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextMiningComponent ],
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [
        DynamicDialogRef,
        DynamicDialogConfig,
        DialogService
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
