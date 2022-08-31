import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ExternalReference } from 'src/app/models/base';
import { MetaData, Resource, Update } from 'src/app/models/metadata';
import { DataPresentMatTableDataSource } from '../../shared/DataPresentMatTableDataSource';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MetadataComponent implements OnInit {

  created: string;
  createdBy: string;
  submittedBy: string;
  resources: Resource[];
  phenopacketSchemaVersion: string;
  externalReferences: ExternalReference[];
  updates: Update[];

  updatesDisplayedColumns = ['timestamp', 'updatedby', 'comment'];
  updatesDataSource = new DataPresentMatTableDataSource<Update>();
  updatesExpandedElement: Update | null;

  resourcesDisplayedColumns = ['id', 'name', 'version'];
  resourcesDataSource = new DataPresentMatTableDataSource<Resource>();
  resourcesExpandedElement: Resource | null;

  externalRefDisplayedColumns = ['id', 'reference', 'description'];
  externalRefDataSource = new DataPresentMatTableDataSource<ExternalReference>();
  externalRefExpandedElement: ExternalReference | null;

  @Input()
  metadata: MetaData;

  constructor() { }

  ngOnInit() {
    if (this.metadata) {
      this.created = this.metadata.created;
      this.createdBy = this.metadata.createdBy;
      this.submittedBy = this.metadata.submittedBy;
      this.resources = this.metadata.resources;
      this.phenopacketSchemaVersion = this.metadata.phenopacketSchemaVersion;
      this.externalReferences = this.metadata.externalReferences;
      this.updates = this.metadata.updates;

      this.updatesDataSource.data = this.updates;
      this.resourcesDataSource.data = this.resources;
      this.externalRefDataSource.data = this.externalReferences;
    
    }
  }

  updatesExpandCollapse(element: any) {
    this.updatesExpandedElement = this.updatesExpandedElement === element ? null : element

  }

  resourcesExpandCollapse(element: any) {
    this.resourcesExpandedElement = this.resourcesExpandedElement === element ? null : element

  }


}

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class ResourceDetailComponent implements OnInit {

  @Input()
  resource: Resource;

  id: string;
  name: string;
  version: string;
  namespacePrefix: string;
  iriPrefix: string;
  url: string;

  constructor() {

  }

  ngOnInit(): void {
    if (this.resource) {
      this.id = this.resource.id;
      this.name = this.resource.name;
      this.version = this.resource.version;
      this.namespacePrefix = this.resource.namespacePrefix;
      this.iriPrefix = this.resource.iriPrefix;
      this.url = this.resource.url;
    }
  }
}