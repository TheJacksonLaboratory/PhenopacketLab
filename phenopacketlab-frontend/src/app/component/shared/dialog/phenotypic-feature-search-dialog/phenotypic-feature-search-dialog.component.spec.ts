import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhenotypicFeatureSearchDialogComponent } from './phenotypic-feature-search-dialog.component';

describe('PhenotypicFeatureSearchDialogComponent', () => {
  let component: PhenotypicFeatureSearchDialogComponent;
  let fixture: ComponentFixture<PhenotypicFeatureSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhenotypicFeatureSearchDialogComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [
        DialogService,
        { provide: DynamicDialogConfig, useValue: {} },
        { provide: DynamicDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypicFeatureSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
