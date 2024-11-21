import { ChangeDetectorRef, Component, ContentChild, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, forwardRef } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

/**
 * Represents a custom date control component. Saves Dates as ISO Date Strings
 */
@Component({
  selector: 'google-address-control',
  templateUrl: './google-address-control.component.html',
  styleUrls: ['./google-address-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BriskGoogleAddressComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BriskGoogleAddressComponent),
      multi: true,
    },
  ]

})
export class BriskGoogleAddressComponent implements OnInit, DoCheck, OnDestroy {
  // -----------------------------------------------------------------------------------------------------
  // @ Public Variables
  // -----------------------------------------------------------------------------------------------------
  /**
   * CSS class to apply to the component.
   * @type string
   */
  @Input() class: string;

  /**
   * The label text for the input field.
   * @type string
   */
  @Input() label: string;

  /**
   * Error Message for this control
   * @type string
   */
  @Input() errorMessage: string;

  /**
   * The CSS class to apply to the label element.
   * @type string
   */
  @Input() labelClass: string;

  /**
   * Additional text to provide hints or instructions.
   * @type string
   */
  @Input() hint: string;

  /**
   * The Angular `FormControl` or `AbstractControl` instance for managing the form state of the date control.
   * @type FormControl | AbstractControl
   */
  @Input() formControl: FormControl | AbstractControl;

  /**
 * An event emitted when a date value is selected. The selected value is emitted as an event payload.
 * @type EventEmitter<any>
 */
  @Output() valueSelected = new EventEmitter<any>();


  /**
   * An event emitted when an address is removed. The control is reset.
   * @type EventEmitter<any>
   */
  @Output() resetControl = new EventEmitter<any>();

  /**
   * A reference to a template to be rendered when there is an error associated with the date control.
   * This template can be used to customize the display of the error message.
   * @type TemplateRef<any>
   */
  @ContentChild(TemplateRef, { static: false }) errorRef: TemplateRef<any>;

  control: FormControl = new FormControl()


  // -----------------------------------------------------------------------------------------------------
  // @ Private Variables
  // -----------------------------------------------------------------------------------------------------
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _cdr: ChangeDetectorRef
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Value Accessors
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Pass along Required Validator
    if (this.formControl.hasValidator(Validators.required)) this.control.addValidators(Validators.required)

    if (this.formControl.value) this.control.setValue(this.formControl.value)
    this._cdr.markForCheck();
  }

  /**
   * Do check
  */
  ngDoCheck(): void {
    this._cdr.markForCheck();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------








  registerOnChange(fn: any): void {
    this.control.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.control.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  // Bypassed via (valueSelected)
  writeValue(item: any): void {
    return
  }

  // propagates validation errors from nested address form to parent form control
  validate(control: AbstractControl): ValidationErrors | null {
    return this.control.valid ? null : { address: true };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
}
