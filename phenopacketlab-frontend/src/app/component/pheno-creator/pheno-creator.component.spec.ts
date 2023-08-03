import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthConfig, AuthModule } from "@auth0/auth0-angular";
import { DialogService } from "primeng/dynamicdialog";
import { StepsModule } from 'primeng/steps';
import { PhenoCreatorComponent } from './pheno-creator.component';
import { SharedModule } from '../shared/shared.module';


describe('PhenoCreatorComponent', () => {
  let component: PhenoCreatorComponent;
  let fixture: ComponentFixture<PhenoCreatorComponent>;

  beforeEach(waitForAsync(() => {
    const authConfig: AuthConfig  = {
      domain: 'fake',
      clientId: 'fake'
    };
    TestBed.configureTestingModule({
      declarations: [ PhenoCreatorComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StepsModule,
        SharedModule,
        AuthModule.forRoot(authConfig)
      ],
      providers: [
          DialogService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenoCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
