import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { OntologyClassComponent } from './ontology-class.component';

describe('OntologyClassComponent', () => {
  let component: OntologyClassComponent;
  let fixture: ComponentFixture<OntologyClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ OntologyClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
