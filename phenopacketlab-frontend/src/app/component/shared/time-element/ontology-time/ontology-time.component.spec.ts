import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { OntologyTimeComponent } from './ontology-time.component';
import { TreeSelectModule } from 'primeng/treeselect';

describe('OntologyTimeComponent', () => {
  let component: OntologyTimeComponent;
  let fixture: ComponentFixture<OntologyTimeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        InputNumberModule,
        FormsModule,
        TreeSelectModule,
        HttpClientTestingModule
      ],
      declarations: [ OntologyTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
