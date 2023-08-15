import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Attribute, File, IndividualToFileID } from 'src/app/models/base';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.scss'],
})
export class FileDetailComponent implements OnInit {

  @Input() file: File;
  @Output() onFileChanged = new EventEmitter<File>();

  uri: string;
  description: string;

  mappings: IndividualToFileID[];
  attributes: Attribute[];

  constructor() { }

  ngOnInit(): void {
    if (this.file) {
      this.uri = this.file.uri;
      if (this.file.fileAttributes) {
        this.description = this.file.fileAttributes['description'];
      }
      this.mappings = IndividualToFileID.toIndividualToFileId(this.file.individualToFileIdentifiers);
      this.attributes = Attribute.toAttributes(this.file.fileAttributes);
    }
  }

}

