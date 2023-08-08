import { Component, Input, OnInit } from '@angular/core';
import { ExternalReference } from 'src/app/models/base';
import { MetaData, Resource, Update } from 'src/app/models/metadata';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {

  @Input()
  metadata: MetaData;

  created: string;
  createdBy: string;
  submittedBy: string;
  resources: Resource[];
  phenopacketSchemaVersion: string;
  externalReferences: ExternalReference[];
  updates: Update[];

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
    }
  }
}
