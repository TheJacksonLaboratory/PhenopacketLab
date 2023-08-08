import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthConfig, AuthModule } from "@auth0/auth0-angular";
import { PhenopacketListModule } from './phenopacket-list.module';

import { PhenopacketListComponent } from './phenopacket-list.component';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
        PhenopacketListModule,
        FileUploadModule,
        PanelModule,
        HttpClientTestingModule,
        TabViewModule,
        TableModule,
        ConfirmDialogModule,
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
