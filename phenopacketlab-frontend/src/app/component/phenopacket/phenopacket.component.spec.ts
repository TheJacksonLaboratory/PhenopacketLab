import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DividerModule } from 'primeng/divider';

import { PhenotypeSearchService } from 'src/app/services/phenotype-search.service';
import { PhenopacketComponent } from './phenopacket.component';
import { PhenopacketModule } from './phenopacket.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PhenopacketComponent', () => {
  let component: PhenopacketComponent;
  let fixture: ComponentFixture<PhenopacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhenopacketComponent ],
      imports: [
        NoopAnimationsModule,
        DividerModule,
        MatExpansionModule,
        MatIconModule,
        PhenopacketModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule
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
