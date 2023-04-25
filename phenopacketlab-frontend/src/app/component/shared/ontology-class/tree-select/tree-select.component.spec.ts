import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { PhenopacketService } from 'src/app/services/phenopacket.service';

import { TreeSelectComponent } from './tree-select.component';

describe('TreeSelectComponent', () => {
  let component: TreeSelectComponent;
  let fixture: ComponentFixture<TreeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TreeSelectModule,
        FormsModule
      ],
      declarations: [ TreeSelectComponent ],
      providers: [
        PhenopacketService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
