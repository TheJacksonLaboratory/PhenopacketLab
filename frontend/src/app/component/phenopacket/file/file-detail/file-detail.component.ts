import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { File } from 'src/app/models/base';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.scss']
})
export class FileDetailComponent {

  @Input() file: File;

  uri: string;
  description: string;

  uriControl = new FormControl('', [Validators.required]);

  mappingColumns = ['subjectid', 'fileid', 'remove'];
  attributeColumns = ['id', 'value', 'remove'];
  mappingDataSource: Mapping[];
  attributeDataSource: Attribute[];


  constructor() { }

  ngOnInit(): void {
    if(this.file) {
      this.uri = this.file.uri;
      this.uriControl.setValue(this.uri);
      this.description = this.file.fileAttribute.get('description');
      this.mappingDataSource = this.getMapping(this.file.individualToFileIdentifier);
      this.attributeDataSource = this.getAttribute(this.file.fileAttribute);
    }
  }

  getMapping(indToFileId: Map<string, string>): Mapping[] {
    let mappings = [];
    indToFileId.forEach((value, key) => {
      mappings.push(new Mapping(key, value))
    });
    return mappings;
  }

  getAttribute(fileAttribute: Map<string, string>): Attribute[] {
    let attributes = [];
    fileAttribute.forEach((value, key) => {
      if(key !== 'description') {
        attributes.push(new Attribute(key, value))
      }
    });
    return attributes;
  }
  addAttribute() {
    this.attributeDataSource.push(new Attribute('', ''));
  }
  addMapping() {
    this.mappingDataSource.push(new Mapping('', ''));
  }
  
}

class Mapping {
  subjectId: string;
  fileId: string;
  constructor(subjectId: string, fileId: string) {
    this.subjectId = subjectId;
    this.fileId = fileId;
  }
}

class Attribute {
  id: string;
  value: string;
  constructor(id: string, value: string) {
    this.id = id;
    this.value = value;
  }
}


