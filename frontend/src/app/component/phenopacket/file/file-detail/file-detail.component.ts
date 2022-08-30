import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { File } from 'src/app/models/base';
import { FileDetailDialogComponent } from './file-detail-dialog/file-detail-dialog.component';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.scss']
})
export class FileDetailComponent implements OnInit {

  @Input() file: File;
  @Output() onFileChanged = new EventEmitter<File>();

  uri: string;
  description: string;

  uriControl = new UntypedFormControl('', [Validators.required]);
  uriSubscription: Subscription;
  descriptionControl = new UntypedFormControl('');
  descriptionSubscription: Subscription;

  mappingColumns = ['subjectid', 'fileid', 'remove'];
  attributeColumns = ['id', 'value', 'remove'];
  mappingDataSource = new MatTableDataSource<Mapping>();
  attributeDataSource = new MatTableDataSource<Attribute>();
  mappings: Mapping[];
  attributes: Attribute[];


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.file) {
      // uri update
      this.uri = this.file.uri;
      this.uriControl.setValue(this.uri);
      if (this.uriSubscription) {
        this.uriSubscription.unsubscribe();
      }
      this.uriSubscription = this.uriControl.valueChanges.subscribe(value => {
        if (value && value.length > 0) {
          this.uri = value;
          this.file.uri = value;
          this.onFileChanged.emit(this.file);
        }
      });
      this.description = this.file.fileAttribute.get('description');
      this.descriptionControl.setValue(this.description);
      if (this.descriptionSubscription) {
        this.descriptionSubscription.unsubscribe();
      }
      this.descriptionSubscription = this.descriptionControl.valueChanges.subscribe(value => {
        if (value && value.length > 0) {
          this.description = value;
          this.file.fileAttribute.set('description', value);
          this.onFileChanged.emit(this.file);
        }
      });
      this.mappings = this.getMapping(this.file.individualToFileIdentifier);
      this.mappingDataSource.data = this.mappings;
      this.attributes = this.getAttribute(this.file.fileAttribute);
      this.attributeDataSource.data = this.attributes;
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
      if (key !== 'description') {
        attributes.push(new Attribute(key, value))
      }
    });
    return attributes;
  }
  addAttribute() {
    const fileDetailData = { 'title': 'Add attribute to file' };
    fileDetailData['description'] = 'Select one of the available attribute or add a custom attribute.';
    fileDetailData['comboTitle'] = 'ID';
    fileDetailData['comboItems'] = Attribute.getValues();//['File format', 'Genome assembly'];
    fileDetailData['txtFieldTitle'] = 'Value';
    fileDetailData['placeholderId'] = 'eg. VCF, BAM, SAM, BED, FASTQ, PED';
    fileDetailData['placeholderValue'] = 'eg. GRCh37, GRCh38, GRCm38, GRCm39';
    fileDetailData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(FileDetailDialogComponent, {
      width: '400px',
      data: fileDetailData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let id = result.key;
        let value = result.value;
        if (id !== undefined && value !== undefined) {
          // check if entry already exists
          if (this.file.fileAttribute.has(id)) {
            this.attributes.forEach((element, index) => {
              if (element.id == id) {
                this.attributes[index].value = value;
              }
            });
          } else {
            this.attributes.push(new Attribute(id, value));
          }
          this.attributeDataSource.data = this.attributes;
          // change file
          this.file.fileAttribute.set(id, value);
          // emit change
          this.onFileChanged.emit(this.file);
        }
      }
    });
    return dialogRef;

  }
  addMapping() {
    const fileDetailData = { 'title': 'Add mapping to file' };
    // fileDetailData['description'] = 'Add following mapping to file:';
    fileDetailData['comboTitle'] = 'Subject ID';
    fileDetailData['comboItems'] = Mapping.getValues(); //['I:1', 'I:2', 'I:3']; // TODO get these values from file
    fileDetailData['txtFieldTitle'] = 'ID used in file';
    fileDetailData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(FileDetailDialogComponent, {
      width: '400px',
      data: fileDetailData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let subjectId = result.key;
        let fileId = result.value;
        if (subjectId !== undefined && fileId !== undefined) {
          // check if entry already exists
          if (this.file.individualToFileIdentifier.has(subjectId)) {
            this.mappings.forEach((element, index) => {
              if (element.subjectId == subjectId) {
                this.mappings[index].fileId = fileId;
              }
            });
          } else {
            this.mappings.push(new Mapping(subjectId, fileId));
          }
          this.mappingDataSource.data = this.mappings;
          // change file
          this.file.individualToFileIdentifier.set(subjectId, fileId);
          // emit change
          this.onFileChanged.emit(this.file);
        }
      }
    });
    return dialogRef;
  }

  deleteMapping(mapping: Mapping) {
    this.mappings.forEach((element, index) => {
      if (element == mapping) {
        this.mappings.splice(index, 1);
      }
    });
    // update datasource
    this.mappingDataSource.data = this.mappings;
    // update file and emit change
    this.file.individualToFileIdentifier.delete(mapping.subjectId);
    this.onFileChanged.emit(this.file);
  }

  deleteAttribute(attribute: Attribute) {
    this.attributes.forEach((element, index) => {
      if (element == attribute) {
        this.attributes.splice(index, 1);
      }
    });
    // update datasource
    this.attributeDataSource.data = this.attributes;
    // update file and emit change
    this.file.fileAttribute.delete(attribute.id);
    this.onFileChanged.emit(this.file);
  }

}

export class Mapping {
  subjectId: string;
  fileId: string;

  constructor(subjectId: string, fileId: string) {
    this.subjectId = subjectId;
    this.fileId = fileId;
  }

  /**
   * get Mapping values
   */
  public static getValues() {
    let values = [];
    for (var key in Mapping.Keys) {
      values.push(Mapping.Keys[key]);
    }
    return values;
  }
}
export namespace Mapping {
  export enum Keys {
    i1 = 'I:1',
    i2 = 'I:2',
    i3 = 'I:3',
    i4 = 'I:4',
    i5 = 'I:5'
  }

}

export class Attribute {
  id: string;
  value: string;
  key: Attribute.Keys;

  constructor(id: string, value: string) {
    this.id = id;
    this.value = value;
  }
  /**
  * get Attribute values
  */
  public static getValues() {
    let values = [];
    for (var key in Attribute.Keys) {
      values.push(Attribute.Keys[key]);
    }
    return values;
  }

}
export namespace Attribute {
  export enum Keys {
    FileFormat = 'File format',
    GenomeAssembly = 'Genome assembly'
  }
}


