import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
        NoopAnimationsModule,
        PhenopacketModule,
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
