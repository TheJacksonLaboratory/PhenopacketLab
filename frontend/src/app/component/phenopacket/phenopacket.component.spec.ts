import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { DividerModule } from 'primeng/divider';
import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';

import { PhenopacketComponent } from './phenopacket.component';
import { PhenopacketModule } from './phenopacket.module';

describe('PhenopacketComponent', () => {
  let component: PhenopacketComponent;
  let fixture: ComponentFixture<PhenopacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhenopacketComponent ],
      imports: [
        DividerModule,
        MatExpansionModule,
        MatIconModule,
        PhenopacketModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        PhenotypeSearchService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenopacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
