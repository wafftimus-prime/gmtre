import { ChangeDetectorRef, Component, ContentChild, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, forwardRef } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { SILENT_EVENT } from '@noblefractals/shared/data';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

/**
 * Represents a custom text control component.
 */
@Component({
  selector: 'brisk-text-control',
  templateUrl: './text-control.component.html',
  styleUrls: ['./text-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BriskTextComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BriskTextComponent),
      multi: true,
    },
  ]

})
export class BriskTextComponent implements OnInit, DoCheck, OnDestroy {
  // -----------------------------------------------------------------------------------------------------
  // @ Public Variables
  // -----------------------------------------------------------------------------------------------------

  /**
   * The minimum allowed text value.
   * @type any
   */
  @Input() min$: BehaviorSubject<number>;

  /**
   * The maximum allowed text value.
   * @type any
   */
  @Input() max$: BehaviorSubject<number>;

  /**
   * The allowed types of the text field.
   * @type any
   */
  @Input() maxLength$: BehaviorSubject<number>;

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
   * The CSS class to apply to the label element.
   * @type string
   */
  @Input() labelClass: string;

  /**
   * Placeholder text for the input field.
   * @type string
   * @default "Enter text"
   */
  @Input() placeholder: string = "Enter text";

  /**
   * Additional text to provide hints or instructions.
   * @type string
   */
  @Input() hint: string;

  /**
   * The Angular `FormControl` or `AbstractControl` instance for managing the form state of the text control.
   * @type FormControl | AbstractControl
   */
  @Input() formControl: FormControl | AbstractControl;

  /**
   * An event emitted when a text value is selected. The selected value is emitted as an event payload.
   * @type EventEmitter<any>
   * CURRENTLY UNUSED
   */
  @Output() valueSelected = new EventEmitter<any>();

  /**
   * A reference to a template to be rendered when there needs to be additional suffix items added.
   * @type TemplateRef<any>
   */
  @ContentChild(TemplateRef, { static: false }) suffixRef: TemplateRef<any>;

  /**
   * A reference to a template to be rendered when there is an error associated with the text control.
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
    this.control.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(fn);
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
    if (item && item !== "") {
      const text = new Date(item).toISOString()
      this.control.patchValue(text, SILENT_EVENT)
      this.formControl.patchValue(text, SILENT_EVENT)
    }
    else {
      this.control.patchValue(null, SILENT_EVENT)
      this.formControl.patchValue(null, SILENT_EVENT)

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
