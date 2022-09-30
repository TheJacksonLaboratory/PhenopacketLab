import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OntologyClass, TimeElement } from 'src/app/models/base';
import { KaryotypicSex, Sex, Status } from 'src/app/models/individual';
import { Phenopacket } from 'src/app/models/phenopacket';

@Component({
  selector: 'app-pheno-creator',
  templateUrl: './pheno-creator.component.html',
  styleUrls: ['./pheno-creator.component.scss']

})

export class PhenoCreatorComponent implements OnInit {

  phenopacket: Phenopacket;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
  eigthFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      phenopacketIdCtrl: ['', Validators.required],
      summaryCtrl: '',
      dobCtrl: new FormControl(new Date()),
      toleCtrl: [''],
      sexCtrl: new FormControl(''),
      karyoSexCtrl: new FormControl(''),
      genderCtrl: new FormControl(new OntologyClass('', '')),
      vitalStatusFormGroup: new FormGroup({
        statusCtrl: new FormControl(Status.UNKNOWN_STATUS),
        timeOfDeathCtrl: new FormControl(new TimeElement()),
        causeOfDeathCtrl: new FormControl(new OntologyClass('', '')),
        survivalTimeCtrl: new FormControl()
      })

    });
    // this.firstFormGroup.get('viatlStatusFormGroup').get('causeOfDeathCtrl')
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: '',
    });
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.sixthFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.seventhFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.eigthFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });

  }

  getSexes() {
    // tslint:disable-next-line:radix
    return Object.values(Sex).filter(x => !(parseInt(x) >= 0));
  }

  getKaryotypicSexes() {
    // tslint:disable-next-line:radix
    return Object.values(KaryotypicSex).filter(x => !(parseInt(x) >= 0));
  }
  getStatuses() {
    // tslint:disable-next-line:radix
    return Object.values(Status).filter(x => !(parseInt(x) >= 0));
  }

  getCauseOfDeath(): OntologyClass {
    return OntologyClass.create(this.fifthFormGroup.get('vitalStatusFormGroup').get('causeOfDeathCtrl'));
  }
  changeCauseOfDeath(eventObj: OntologyClass) {
    // this.procedureCode = eventObj;
    // // update medicalAction
    // if (this.medicalAction) {
    //   this.medicalAction.action.code = this.procedureCode;
    // }
  }
}
