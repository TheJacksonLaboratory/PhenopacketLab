import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { DiseaseDetailComponent } from './disease-detail.component';

describe('DiseaseDetailComponent', () => {
  let component: DiseaseDetailComponent;
  let fixture: ComponentFixture<DiseaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseDetailComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [
        DialogService,
        MessageService,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
