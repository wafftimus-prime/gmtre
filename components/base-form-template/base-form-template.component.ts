import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseFormFooterComponent } from '../base-form-footer/base-form-footer.component';

@Component({
  selector: 'base-form-template',
  templateUrl: './base-form-template.component.html',
  styleUrls: ['./base-form-template.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    BaseFormFooterComponent,
    MatIcon,
    MatProgressSpinnerModule
  ]
})
export class BaseFormTemplateComponent {
  // -----------------------------------------------------------------------------------------------------
  // @ Public Variables
  // -----------------------------------------------------------------------------------------------------
  @Input() is_small!: boolean
  @Input() form: FormGroup
  @Input() title: string
  @Input() subtitle: string
  @Input() EditMode = true
  @Input() ForceSteps = false
  @Input() DisableReset = false
  @Input() AllowReset = true
  @Input() FormReady = false;
  @Input() hide_toolbar = false;
  @Input() Step = 1
  @Input() steps = 1
  @Input() continueDisabled: boolean = false


  /**
   * An event emitted when a form needs to be go to the next step.
   * @type EventEmitter<any>
   */
  @Output() continue = new EventEmitter<any>();

  /**
   * An event emitted when a form needs to be go back a step.
   * @type EventEmitter<any>
   */
  @Output() goBack = new EventEmitter<any>();

  /**
   * An event emitted when a form needs to be reset.
   * @type EventEmitter<any>
   */
  @Output() resetForm = new EventEmitter<any>();

  /**
   * An event emitted when a form needs to be submitted.
   * @type EventEmitter<any>
   */
  @Output() submitForm = new EventEmitter<any>();

  /**
   * An event emitted when a form needs to be closed.
   * @type EventEmitter<any>
   */
  @Output() closeForm = new EventEmitter<any>();

  // -----------------------------------------------------------------------------------------------------
  // @ Private Variables
  // -----------------------------------------------------------------------------------------------------

  /**
   * Constructor
   */
  constructor(
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Value Accessors
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

}
