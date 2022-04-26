import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortListComponent } from './cohort-list.component';

describe('CohortListComponent', () => {
  let component: CohortListComponent;
  let fixture: ComponentFixture<CohortListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CohortListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
