import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { OntologyClass } from "src/app/models/base";
import { BioSample } from "src/app/models/biosample";
import { DataPresentMatTableDataSource } from "../../shared/DataPresentMatTableDataSource";
import { MessageDialogComponent } from "../../shared/message-dialog/message-dialog.component";


@Component({
  selector: 'app-biosample',
  templateUrl: './biosample.component.html',
  styleUrls: ['./biosample.component.scss']
})
export class BiosampleComponent implements OnInit {

  //Table items
  displayedColumns = ['id', 'individualid', 'tissue', 'type', 'description', 'remove'];

  expandedElement: BioSample | null;

  biosampleDataSource = new DataPresentMatTableDataSource<BioSample>();

  biosampleCount: number;
  @Input()
  biosamples: BioSample[];

  @Output()
  onBiosampleChanged = new EventEmitter<BioSample[]>();

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
    if (biosample === undefined) {
      let biosample = new BioSample();
      let newId = 'id-';
      if (this.biosamples.length > 0) {
        newId = `${newId}${this.biosamples.length}`;
      } else {
        newId = `${newId}0`
      }
      biosample.id = newId;
      biosample.individualId = '';
      biosample.derivedFromId = '';
      biosample.description = '';
      biosample.sampledTissue = new OntologyClass('', '');
      biosample.sampleType = new OntologyClass('', '');
      
      this.biosamples.push(biosample);
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
      if (element == biosample) {
        this.biosamples.splice(index, 1);
      }
    });
    this.biosampleDataSource.data = this.biosamples;
    this.onBiosampleChanged.emit(this.biosamples);
  }

  expandCollapse(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element

  }

}