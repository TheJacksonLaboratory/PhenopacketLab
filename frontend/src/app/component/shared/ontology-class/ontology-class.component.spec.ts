import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologyClassComponent } from './ontology-class.component';

describe('OntologyClassComponent', () => {
  let component: OntologyClassComponent;
  let fixture: ComponentFixture<OntologyClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
