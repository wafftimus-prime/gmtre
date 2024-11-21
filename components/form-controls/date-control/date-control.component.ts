import { ChangeDetectorRef, Component, ContentChild, DoCheck, Input, OnDestroy, OnInit, TemplateRef, forwardRef } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import moment from 'moment';
import { BehaviorSubject, Subject, map, takeUntil } from 'rxjs';

/**
 * Represents a custom date control component. Saves Dates as ISO Date Strings
 */
@Component({
  selector: 'brisk-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BriskDateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BriskDateComponent),
      multi: true,
    },
  ]

})
export class BriskDateComponent implements OnInit, DoCheck, OnDestroy {
  // -----------------------------------------------------------------------------------------------------
  // @ Public Variables
  // -----------------------------------------------------------------------------------------------------

  /**
   * The minimum allowed date value.
   * @type any
   */
  @Input() minDate$: BehaviorSubject<string>;

  /**
   * The maximum allowed date value.
   * @type any
   */
  @Input() maxDate$: BehaviorSubject<string>;


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
   * Placeholder text for the input field.
   * @type string
   * @default "Select Date"
   */
  @Input() placeholder: string = "Select Date";

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
   * A reference to a template to be rendered when there needs to be additional suffix items added.
   * @type TemplateRef<any>
   */
  @ContentChild(TemplateRef, { static: false }) suffixRef: TemplateRef<any>;

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

  // propagates value changes to parent form control
  registerOnChange(fn: any): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        map(date => moment(date).toISOString())
      )
      .subscribe(fn);
  }

  // marks parent form control as touched
  registerOnTouched(fn: any): void {
    this.control.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(fn);
  }

  // disabled nested address form when parent form control is disabled
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  // writes value to nested address form when value is set to parent form control
  writeValue(item: any): void {
    if (item) this.control.setValue(item)
    else {
      this.control.setValue(null, { emitEvent: false })
    }
  }

  // propagates validation errors from nested address form to parent form control
  validate(control: AbstractControl): ValidationErrors | null {
    return this.control.valid ? null : { address: true };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
}
