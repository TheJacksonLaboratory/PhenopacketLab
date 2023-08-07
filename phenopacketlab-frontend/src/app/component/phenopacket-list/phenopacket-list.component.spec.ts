import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthConfig, AuthModule } from "@auth0/auth0-angular";
import { PhenopacketModule } from '../phenopacket/phenopacket.module';

import { PhenopacketListComponent } from './phenopacket-list.component';

describe('PhenopacketListComponent', () => {
  let component: PhenopacketListComponent;
  let fixture: ComponentFixture<PhenopacketListComponent>;

  beforeEach(async () => {
    const authConfig: AuthConfig  = {
      domain: 'fake',
      clientId: 'fake'
    };
    await TestBed.configureTestingModule({
      declarations: [ PhenopacketListComponent ],
      imports: [
        NoopAnimationsModule,
        PhenopacketModule,
        HttpClientTestingModule,
        AuthModule.forRoot(authConfig)
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
