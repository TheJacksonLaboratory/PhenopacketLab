import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PhenopacketModule } from '../phenopacket/phenopacket.module';

import { CohortListComponent } from './cohort-list.component';

describe('CohortListComponent', () => {
  let component: CohortListComponent;
  let fixture: ComponentFixture<CohortListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CohortListComponent ],
      imports: [
        MatDialogModule,
        MatTabsModule,
        MatTableModule,
        MatIconModule,
        PhenopacketModule,
        MatTooltipModule,
        MatButtonModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
