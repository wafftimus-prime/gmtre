import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, forwardRef } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { isNullOrUndefined } from '@gmtre-utils';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'shared-autocomplete',
  templateUrl: './autocomplete-control.component.html',
  styleUrls: ['./autocomplete-control.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatOptionModule,
    CommonModule,




    // MatChipsModule,
    // PipesModule,
    // RouterModule,
    // AgGridAngular,
    // MatMenuModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedAutocompleteComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SharedAutocompleteComponent),
      multi: true,
    },
  ]
})
export class SharedAutocompleteComponent implements OnInit, OnDestroy {
  // -----------------------------------------------------------------------------------------------------
  // @ Public Variables
  // -----------------------------------------------------------------------------------------------------
  @Input() class: string
  @Input() placeholder: string
  @Input() hint: string
  @Input() label: string

  /**
   * Error Message for this control
   * @type string
   */
  @Input() errorMessage: string;

  @Input() labelClass: string
  @Input() filterFn = basicFilter;
  @Input() data: any[]
  /** Used when you need to display more than just a single value */
  @Input() displayFunction: any
  /** Required when the search item is an object and not a string */
  @Input() displayAttribute: string
  /** Required when the search item is an object and not a string */
  @Input() valueAttribute: string
  /** Used when you have a compound key for an object */
  @Input() valueFunction: any
  @Input() formControl: FormControl | AbstractControl

  @Output() valueSelected = new EventEmitter<any>()
  @ContentChild(TemplateRef, { static: false }) templateRef;
  @ContentChild(TemplateRef, { static: false }) errorRef;

  dataSet: any[];
  control: FormControl = new FormControl()

  opened: boolean = false;
  appearance: 'basic' | 'bar' = 'basic';

  // -----------------------------------------------------------------------------------------------------
  // @ Private Variables
  // -----------------------------------------------------------------------------------------------------
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _cdr: ChangeDetectorRef,
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Pass along Required Validator
    if (this.formControl.hasValidator(Validators.required)) this.control?.addValidators(Validators.required)

    const value = this.formControl.value
    this._searchObserver()


    if (value) {
      const v = this.valueAttribute ? !isNullOrUndefined(value[this.valueAttribute]) ? value[this.valueAttribute] : value : value

      const data = this.data?.find(d => this.valueAttribute ? d[this.valueAttribute] === v : d === v)

      this.selectItem(data, false)
    }

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

  selectItem(item: any, emit?: boolean) {
    if (emit) this.valueSelected.emit(item ? this.valueAttribute ? item[this.valueAttribute] : item : null)

    this._cdr.markForCheck();
  }

  /**
 * On keydown of the search input
 *
 * @param event
 */
  onKeydown(event: KeyboardEvent): void {
    // Listen for escape to close the search
    // if the appearance is 'bar'
    if (this.appearance === 'bar') {
      // Escape
      if (event.code === 'Escape') {
        // Close the search
        this.close();
      }
    }
  }

  /**
   * Close the search
   * * Used in 'bar'
   */
  close(): void {
    // Return if it's already closed
    if (!this.opened) {
      return;
    }

    // Clear the search input
    this.control?.setValue('');

    // Close the search
    this.opened = false;
  }

  // propagates value changes to parent form control
  registerOnChange(fn: any): void {
    this.control?.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(fn);
  }

  // marks parent form control as touched
  registerOnTouched(fn: any): void {
    this.control?.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(fn);
  }

  // disabled nested address form when parent form control is disabled
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control?.disable() : this.control?.enable();
  }
  // writes value to nested address form when value is set to parent form control
  writeValue(item: any): void {
    const data = this.data.find((d, dIx, _data) =>
      item ? this.valueFunction ?
        this.valueFunction(item, _data) :
        this.valueAttribute ?
          d[this.valueAttribute] === item :
          d === item :
        null
    )

    let value
    if (isNullOrUndefined(item)) value = null
    else value = this.displayFunction
      ? this.displayFunction(data)
      : this.displayAttribute
        ? data?.[this.displayAttribute]
        : data

    this.control?.patchValue(value, { emitEvent: false });
  }

  // propagates validation errors from nested address form to parent form control
  validate(control: AbstractControl): ValidationErrors | null {
    return this.control?.valid ? null : { address: true };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  private _searchObserver() {
    this.control?.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((changes) => {
          if (!changes) this.dataSet = [];
          return changes;
        })
      )
      .subscribe((changes) => {
        this.dataSet = this.data.filter(i => this.filterFn(i, changes));
      });

  }

}


export function basicFilter(item: string, value: string) {
  return item?.toLowerCase().includes(value?.toLowerCase());
}
