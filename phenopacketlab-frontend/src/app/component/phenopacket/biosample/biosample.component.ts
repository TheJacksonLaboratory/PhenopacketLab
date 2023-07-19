import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OntologyClass } from 'src/app/models/base';
import { BioSample } from 'src/app/models/biosample';
import { ConfirmationService, MessageService } from 'primeng/api';


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

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    if (this.biosamples === undefined) {
      this.biosamples = [];
    }
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
    this.onBiosampleChanged.emit(this.biosamples);
  }

  /**
   * Removes the chosen sample, if ok is pressed on the popup window.
   * @param sample
   * @returns
   */
  deleteSample(sample: BioSample) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete \'' + sample.id + '\'?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.biosamples = this.biosamples.filter(val => val.key !== sample.key);
            this.onBiosampleChanged.emit(this.biosamples);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Biosample Deleted', life: 3000 });
        },
        reject: () => {
            this.confirmationService.close();
        }
    });
}

  changeBiosample(biosample: BioSample) {
    for (let i = 0; i < this.biosamples.length; i ++) {
      if (this.biosamples[i].id ===  biosample.id) {
        this.biosamples[i] = biosample;
      }
    }
  }

}
