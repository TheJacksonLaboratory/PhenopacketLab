import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { MedicalAction, RadiationTherapy, TherapeuticRegimen, Treatment } from 'src/app/models/medical-action';
import { Disease } from 'src/app/models/disease';
import { Procedure } from 'src/app/models/base';
import { MedicalActionDetailDialogComponent } from './medical-action-detail/medical-action-detail-dialog/medical-action-detail-dialog.component';

@Component({
    selector: 'app-medical-action',
    templateUrl: './medical-action.component.html',
    styleUrls: ['./medical-action.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class MedicalActionComponent implements OnInit {

    @Input()
    medicalActions: MedicalAction[];
    @Input()
    diseases: Disease[];

    @Output() onMedicalActionChanged = new EventEmitter<MedicalAction[]>();

    // search params
    // itemName = 'Medical Action';

    ref: DynamicDialogRef;

    spinnerDialogRef: any;
    showTable = false;

    constructor(public dialogService: DialogService, public messageService: MessageService,
        public confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        if (this.medicalActions && this.medicalActions.length > 0) {
            let idx = 0;
            for (const medicalAction of this.medicalActions) {
                medicalAction.key = idx;
                idx++;
            }
            this.showTable = true;
        }
    }

    /**
     * Add a new medical action with default values or no values
     */
    addMedicalAction(medicalAction?: MedicalAction) {
        if (medicalAction === undefined || medicalAction === null) {
            medicalAction = new MedicalAction();
        }
        this.ref = this.dialogService.open(MedicalActionDetailDialogComponent, {
            header: 'Edit Medical action',
            width: '70%',
            contentStyle: { 'overflow': 'auto' },
            baseZIndex: 10000,
            resizable: true,
            draggable: true,
            data: { medicalAction: medicalAction }
        });

        this.ref.onClose.subscribe((medicAction: MedicalAction) => {
            if (medicAction) {
                const indexToUpdate = this.medicalActions.findIndex(item => item.key === medicAction.key);
                if (indexToUpdate === -1) {
                    this.medicalActions.push(medicAction);
                } else {
                    this.medicalActions[indexToUpdate] = medicAction;
                    this.medicalActions = Object.assign([], this.medicalActions);
                }
                this.showTable = true;
                // emit change
                this.onMedicalActionChanged.emit(this.medicalActions);
            }
        });
    }

    /**
     * Removes the chosen element, if ok is pressed on the popup window.
     * @param medicalAction
     * @returns
     */
    deleteMedicalAction(medicalAction: MedicalAction) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete \'' + this.getActionName(medicalAction) + '\'?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.medicalActions = this.medicalActions.filter(val => val.key !== medicalAction.key);
                if (this.medicalActions.length === 0) {
                    this.showTable = false;
                }
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Medical action Deleted', life: 3000 });
            },
            reject: () => {
                this.confirmationService.close();
            }
        });
    }

    getActionName(medicalAction: MedicalAction) {
        if (medicalAction.procedure) {
            return Procedure.actionName;
        } else if (medicalAction.treatment) {
            return Treatment.actionName;
        } else if (medicalAction.radiationTherapy) {
            return RadiationTherapy.actionName;
        } else if (medicalAction.therapeuticRegimen) {
            return TherapeuticRegimen.actionName;
        }
        return '';
    }
    /**
     * Retrieve the correct MedicalAction id
     * @param medicalAction
     * @returns id
     */
    getId(medicalAction: MedicalAction) {
        if (medicalAction.procedure) {
            return medicalAction.procedure.code?.id;
        } else if (medicalAction.treatment) {
            return medicalAction.treatment.agent?.id;
        } else if (medicalAction.radiationTherapy) {
            return medicalAction.radiationTherapy.modality?.id;
        } else if (medicalAction.therapeuticRegimen) {
            return medicalAction.therapeuticRegimen.identifier?.id;
        }
        return '';
    }

    getTarget(medicalAction: MedicalAction) {
        let target = '';
        if (medicalAction && medicalAction.treatmentTarget) {
            target = `${medicalAction.treatmentTarget?.label} [${medicalAction.treatmentTarget?.id}]`;
        }
        return target;
    }

    getIntent(medicalAction: MedicalAction) {
        let intent = '';
        if (medicalAction && medicalAction.treatmentIntent) {
            intent = `${medicalAction.treatmentIntent?.label} [${medicalAction.treatmentIntent?.id}]`;
        }
        return intent;
    }

    /**
     * Get Procedure, Treatment, RadiationTherapy or TherapeuticRegimen icon
     * @param medicalAction
     * @returns icon name
     */
    getIcon(medicalAction: MedicalAction) {
        if (medicalAction) {
            if (medicalAction.procedure) {
                return 'medical_information';
            } else if (medicalAction.treatment) {
                return 'vaccines';
            } else if (medicalAction.radiationTherapy) {
                return 'radiology';
            } else if (medicalAction.therapeuticRegimen) {
                return 'medication';
            }
            return '';
        }
    }

}

