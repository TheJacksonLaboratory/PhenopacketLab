import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Attribute, DialogMode, File, IndividualToFileID } from 'src/app/models/base';
import { Phenopacket } from 'src/app/models/phenopacket';
import { Utils } from '../../utils';

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.scss']
})
export class FileDialogComponent implements OnInit {

  fileFormGroup: FormGroup;
  file: File;
  uri: any;
  phenopacket: Phenopacket;
  mappings: IndividualToFileID[];
  clonedMappings: { [s: string]: IndividualToFileID } = {};
  attributes: Attribute[];
  clonedAttributes: { [s: string]: Attribute } = {};

  mode: DialogMode;
  okLabel = 'Add file';

  constructor(private fb: FormBuilder,
              public messageService: MessageService,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.file = this.config.data?.file;
    this.mode = this.config.data?.mode;
    if (this.mode === DialogMode.EDIT) {
      this.okLabel = 'Save file';
    }
    this.phenopacket = this.config.data?.phenopacket;
    if (this.file) {
      this.uri = this.file.uri;
      this.mappings = IndividualToFileID.toIndividualToFileId(this.file.individualToFileIdentifiers);
      this.attributes = Attribute.toAttributes(this.file.fileAttributes);
    }
    this.fileFormGroup = this.fb.group({
      'uriForm': new FormControl('', Validators.pattern('^(http|https|ftp|file)\:\/\/[a-zA-Z0-9\-\.]+\.?[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?\/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$')),
    });
  }

  // individual to file ID mapping
  addIndividualToFileMapping() {
    if (this.mappings === undefined) {
      this.mappings = [];
    }
    if (this.phenopacket && this.mappings.length === 0) {
      if (this.phenopacket.subject.id === undefined) {
        this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `This phenopacket has no subject ID.` });
        return;
      }
      const indiv = new IndividualToFileID(this.phenopacket.subject.id, undefined);
      indiv.key = Utils.getBiggestKey(this.mappings) + 1;
      this.mappings.push(indiv);
      this.onIndividualToIdentifierEditInit(indiv);
    }
  }
  deleteIndividualToIdentifier(indiv) {
    this.mappings = this.mappings.filter(val => val.key !== indiv.key);
  }
  onIndividualToIdentifierEditInit(indiv) {
    this.clonedMappings[indiv.key] = { ...indiv };
  }

  onIndividualToIdentifierEditSave(indiv) {
    delete this.clonedMappings[indiv.key];
  }

  onIndividualToIdentifierEditCancel(indiv, index: number) {
    this.mappings[index] = this.clonedMappings[indiv.key];
    delete this.clonedMappings[indiv.key];
  }

  // Attributes
  addAttribute() {
    if (this.attributes === undefined) {
      this.attributes = [];
    }
    const attribute = new Attribute();
    attribute.key = Utils.getBiggestKey(this.attributes) + 1;
    this.attributes.push(attribute);
  }
  // add attributes like 'genomeAssembly', 'description', 'fileFormat'
  addFileAttributes() {
    if (this.attributes === undefined) {
      this.attributes = [];
    }
    if (!this.attributeContains('genomeAssembly')) {
      const attribute = new Attribute('genomeAssembly', undefined);
      attribute.key = Utils.getBiggestKey(this.attributes) + 1;
      this.attributes.push(attribute);
    }
    if (!this.attributeContains('fileFormat')) {
      const attribute = new Attribute('fileFormat', undefined);
      attribute.key = Utils.getBiggestKey(this.attributes) + 1;
      this.attributes.push(attribute);
    }
    if (!this.attributeContains('description')) {
      const attribute = new Attribute('description', undefined);
      attribute.key = Utils.getBiggestKey(this.attributes) + 1;
      this.attributes.push(attribute);
    }
  }
  deleteAttribute(attribute) {
    this.attributes = this.attributes.filter(val => val.key !== attribute.key);
  }
  onAttributeEditInit(attribute) {
    if (!this.attributeContains(attribute.label)) {
      this.clonedAttributes[attribute.key] = { ...attribute };
    }
  }

  onAttributeEditSave(attribute) {
    if (!this.attributeContains(attribute.label)) {
      delete this.clonedAttributes[attribute.key];
    }
  }

  onAttributeEditCancel(attribute, index: number) {
    if (!this.attributeContains(attribute.label)) {
      this.attributes[index] = this.clonedAttributes[attribute.key];
      delete this.clonedAttributes[attribute.key];
    }

  }

  onCancelClick(): void {
    this.ref.close();
  }

  /**
   * Returns true if values for mapping and attributes are correctly entered
   * @returns
   */
  checkValuesEntered() {
    if (this.mappings) {
      for (const mapping of this.mappings) {
        if (mapping.fileId === undefined) {
          this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error',
            detail: `Please enter a value for the file identifier.` });
          return false;
        }
      }
    }
    if (this.attributes) {
      for (const attribute of this.attributes) {
        if (attribute.value === undefined) {
          this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `Please enter a value for the attribute '${attribute.label}'` });
          return false;
        }
        if (attribute.label === undefined) {
          this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `All attributes need to have a key` });
          return false;
        }
      }
    }
    return true;
  }
  attributeContains(label: string) {
    if (this.attributes) {
      for (const attrib of this.attributes) {
        if (attrib.label === label) {
          return true;
        }
      }
    }
    return false;
  }

  onOkClick(value?: string) {
    console.log(value);
    console.log(this.uri);
    if (this.uri && !this.fileFormGroup.invalid) {
      let key;
      // set key
      if (this.file) {
        // retrieve old key
        key = this.file.key;
      } else {
        if (this.phenopacket.files) {
          key = Utils.getBiggestKey(this.phenopacket.files) + 1;
        } else {
          key = 1;
        }
      }
      // check that file uri doesnt already exist
      if (this.phenopacket.files) {
        for (const file of this.phenopacket.files) {
          if (file.uri === this.uri && this.mode === DialogMode.ADD) {
            this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `A file with the URI '${this.uri}' already exist. Please create another URI.` });
            return;
          }
        }
      }
      this.file = new File(this.uri);
      this.file.key = key;
      this.file.individualToFileIdentifiers = IndividualToFileID.toKeyValue(this.mappings);
      this.file.fileAttributes = Attribute.toKeyValue(this.attributes);
      if (this.checkValuesEntered()) {
        this.ref.close(this.file);
      }
    } else {
      this.messageService.add({ key: 'cen', severity: 'error', summary: 'Error', detail: `A correctly formed URI needs to be set before adding a new file.` });
      return;
    }
  }

}
