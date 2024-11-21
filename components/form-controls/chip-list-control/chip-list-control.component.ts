import { ChangeDetectorRef, Component, ContentChild, Input, OnDestroy, OnInit, TemplateRef, forwardRef } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { Subject, takeUntil } from 'rxjs';

/**
 * Represents a custom chip list control component.
 */
@Component({
  selector: 'brisk-chip-list-control',
  templateUrl: './chip-list-control.component.html',
  styleUrls: ['./chip-list-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BriskChipListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BriskChipListComponent),
      multi: true,
    },
  ]
})
export class BriskChipListComponent implements OnInit, OnDestroy {
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
   * The CSS class to apply to the label element.
   * @type string
   */
  @Input() labelClass: string;

  /**
   * Placeholder text for the input field.
   * @type string
   * @default "Enter here"
   */
  @Input() placeholder: string = "Enter here...";

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
   * A reference to a template to be rendered when there is an error associated with the date control.
   * This template can be used to customize the display of the error message.
   * @type TemplateRef<any>
   */
  @ContentChild(TemplateRef, { static: false }) errorRef: TemplateRef<any>;

  tagCtrl = new FormControl('');

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
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this._cdr.markForCheck()
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

  add(item: string): void {
    const value = this.formControl.value || []

    if (item && !value.includes(item)) {
      this.formControl?.setValue([...value, item])
    }

    this._cdr.markForCheck()
  }

  remove(item: string): void {
    const array = cloneDeep(this.formControl.value)
    const index = this.formControl.value.indexOf(item);

    if (index >= 0) {
      array.splice(index, 1)
      this.formControl?.setValue(array)
    }

    this._cdr.markForCheck()
  }


  // propagates value changes to parent form control when nested address form changes
  registerOnChange(fn: any): void {
    this.tagCtrl.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(fn);
  }

  // marks parent form control as touched when nested address form changes
  registerOnTouched(fn: any): void {
    this.tagCtrl.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(fn);
  }

  // disabled nested address form when parent form control is disabled
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.tagCtrl.disable() : this.tagCtrl.enable();
  }

  // writes value to nested address form when value is set to parent form control
  writeValue(value: any): void {
    // this.tagCtrl.patchValue(this.formControl.value, SILENT_EVENT);
  }

  // propagates validation errors from nested address form to parent form control
  validate(control: AbstractControl): ValidationErrors | null {
    return this.tagCtrl.valid ? null : { address: true };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
}
