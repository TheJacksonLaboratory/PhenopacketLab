import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OntologyClass } from 'src/app/models/base';
import { BioSample } from 'src/app/models/biosample';
import { DataPresentMatTableDataSource } from '../../shared/DataPresentMatTableDataSource';
import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';


@Component({
  selector: 'app-biosample',
  templateUrl: './biosample.component.html',
  styleUrls: ['./biosample.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class BiosampleComponent implements OnInit {

  @Input()
  biosamples: BioSample[];

  @Output()
  onBiosampleChanged = new EventEmitter<BioSample[]>();

  // Table items
  displayedColumns = ['id', 'individualid', 'tissue', 'type', 'description', 'remove'];

  expandedElement: BioSample | null;

  biosampleDataSource = new DataPresentMatTableDataSource<BioSample>();

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    if (this.biosamples === undefined) {
      this.biosamples = [];
    }
    this.biosampleDataSource.data = this.biosamples;

  }

  /**
     * Add a new phenotypic feature with default values or no values
     */
  addBiosample(biosample?: BioSample) {
    let newBiosample = biosample;
    if (newBiosample === undefined) {
      newBiosample = new BioSample();
      let newId = 'id-';
      if (this.biosamples.length > 0) {
        newId = `${newId}${this.biosamples.length}`;
      } else {
        newId = `${newId}0`;
      }
      newBiosample.id = newId;
      newBiosample.individualId = '';
      newBiosample.derivedFromId = '';
      newBiosample.description = '';
      newBiosample.sampledTissue = new OntologyClass('', '');
      newBiosample.sampleType = new OntologyClass('', '');

      this.biosamples.push(newBiosample);
    } else {
      this.biosamples.push(biosample);
    }
    this.biosampleDataSource.data = this.biosamples;
    this.onBiosampleChanged.emit(this.biosamples);
    // TODO push changes to api
  }

  /**
   * Removes the chosen element, if ok is pressed on the popup window.
   * @param element
   * @returns
   */
  deleteBiosample(element: BioSample) {
    const msgData = { 'title': 'Delete Biosample' };
    msgData['description'] = `Delete the Biosample with the ID "${element.id}" ?`;
    msgData['displayCancelButton'] = true;
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: msgData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.removeFromDatasource(element);
      }
    });
    return dialogRef;
  }

  changeBiosample(biosample: BioSample) {
    for (let i = 0; i < this.biosamples.length; i ++) {
      if (this.biosamples[i].id ===  biosample.id) {
        this.biosamples[i] = biosample;
      }
    }
  }

  removeFromDatasource(biosample: BioSample) {
    this.biosamples.forEach((element, index) => {
      if (element === biosample) {
        this.biosamples.splice(index, 1);
      }
    });
    this.biosampleDataSource.data = this.biosamples;
    this.onBiosampleChanged.emit(this.biosamples);
  }

  expandCollapse(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;

  }

}
