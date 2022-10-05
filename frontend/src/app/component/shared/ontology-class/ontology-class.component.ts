import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { Validators, FormBuilder, ControlValueAccessor, AbstractControl, NgControl } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MAT_FORM_FIELD } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { OntologyClass } from 'src/app/models/base';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ontology-class-input',
    templateUrl: './ontology-class.component.html',
    styleUrls: ['./ontology-class.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: OntologyClassComponent }],
    // tslint:disable-next-line:no-host-metadata-property
    host: {
        '[class.floating]': 'shouldLabelFloat',
        '[id]': 'id',
      },
})
export class OntologyClassComponent implements ControlValueAccessor, MatFormFieldControl<OntologyClass>, OnInit, OnDestroy {
    static nextId = 0;
    // tslint:disable-next-line:no-input-rename
    @Input('aria-describedby') userAriaDescribedBy: string;

    @Output()
    ontologyObjectEvent = new EventEmitter<OntologyClass>();
    @Input()
    ontologyObject: OntologyClass;
    // title of the OntologyClass Object
    @Input()
    title: string;

    @ViewChild('label') labelInput: HTMLInputElement;
    @ViewChild('ontid') idInput: HTMLInputElement;
    parts = this._formBuilder.group({
        label: ['', [Validators.required, Validators.minLength(100)]],
        ontid: ['', [Validators.required, Validators.minLength(100)]]
    });

    stateChanges = new Subject<void>();
    focused = false;
    touched = false;
    controlType = 'ontology-input';
    id = `ontology-input-${OntologyClassComponent.nextId++}`;

    private _placeholder: string;
    private _required = false;
    private _disabled = false;

    onChange = (_: any) => { };
    onTouched = () => { };

    get empty() {
        const {
            value: { label, ontid },
        } = this.parts;

        return !label && !ontid;
    }

    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }

    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.parts.disable() : this.parts.enable();
        this.stateChanges.next();
    }

    @Input()
    get value(): OntologyClass | null {
        if (this.parts.valid) {
            const {
                value: { label, ontid },
            } = this.parts;
            // tslint:disable-next-line:no-non-null-assertion
            return new OntologyClass(ontid!, label!);
        }
        return null;
    }
    set value(obj: OntologyClass | null) {
        const { label, id } = obj || new OntologyClass('', '');
        const ontid = id;
        this.parts.setValue({ label, ontid });
        this.stateChanges.next();
    }

    get errorState(): boolean {
        return this.parts.invalid && this.touched;
    }

    constructor(
        private _formBuilder: FormBuilder,
        private _focusMonitor: FocusMonitor,
        private _elementRef: ElementRef<HTMLElement>,
        @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
        @Optional() @Self() public ngControl: NgControl,
    ) {
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    onFocusIn(event: FocusEvent) {
        if (!this.focused) {
            this.focused = true;
            this.stateChanges.next();
        }
    }

    onFocusOut(event: FocusEvent) {
        if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
            this.touched = true;
            this.focused = false;
            this.onTouched();
            this.stateChanges.next();
        }
    }

    autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
        if (!control.errors && nextElement) {
            this._focusMonitor.focusVia(nextElement, 'program');
        }
    }

    autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
        if (control.value.length < 1) {
            this._focusMonitor.focusVia(prevElement, 'program');
        }
    }

    setDescribedByIds(ids: string[]) {
        // tslint:disable-next-line:no-non-null-assertion
        const controlElement = this._elementRef.nativeElement.querySelector(
            '.ontology-input-container',
        )!;
        controlElement.setAttribute('aria-describedby', ids.join(' '));
    }

    onContainerClick() {
        if (this.parts.controls.label.valid) {
            this._focusMonitor.focusVia(this.labelInput, 'program');
        } else if (this.parts.controls.ontid.valid) {
            this._focusMonitor.focusVia(this.idInput, 'program');
        }
    }

    writeValue(obj: OntologyClass | null): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
        this.autoFocusNext(control, nextElement);
        this.onChange(this.value);
    }

    // labelControl = new UntypedFormControl('', [Validators.required]);
    // labelSubscription: Subscription;
    // idControl = new UntypedFormControl('', [Validators.required]);
    // idSubscription: Subscription;

    // label = "";
    // id = "";

    ngOnInit(): void {
        // if (this.ontologyObject) {
        //     this.label = this.ontologyObject.label;
        //     this.labelControl.setValue(this.label);
        //     this.id = this.ontologyObject.id;
        //     this.idControl.setValue(this.id);
        // } else {
        //     this.ontologyObject = { id: this.id, label: this.label };
        // }

        // if (this.labelSubscription) {
        //     this.labelSubscription.unsubscribe();
        // }
        // this.labelSubscription = this.labelControl.valueChanges.subscribe(value => {
        //     if (value && value.length > 0) {
        //         this.label = value;
        //         this.ontologyObject.label = this.label;
        //         this.ontologyObjectEvent.emit(this.ontologyObject);
        //     }
        // });

        // if (this.idSubscription) {
        //     this.idSubscription.unsubscribe();
        // }
        // this.idSubscription = this.idControl.valueChanges.subscribe(value => {
        //     if (value && value.length > 0) {
        //         this.id = value;
        //         this.ontologyObject.id = this.id;
        //         this.ontologyObjectEvent.emit(this.ontologyObject);
        //     }
        // });
    }

}
