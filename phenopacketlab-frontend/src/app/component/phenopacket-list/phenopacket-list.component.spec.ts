import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PhenopacketModule } from '../phenopacket/phenopacket.module';

import { PhenopacketListComponent } from './phenopacket-list.component';

describe('PhenopacketListComponent', () => {
  let component: PhenopacketListComponent;
  let fixture: ComponentFixture<PhenopacketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhenopacketListComponent ],
      imports: [
        MatDialogModule,
        MatTabsModule,
        MatTableModule,
        MatIconModule,
        NoopAnimationsModule,
        PhenopacketModule,
        MatTooltipModule,
        MatButtonModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenopacketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
