import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'base-form-footer',
  templateUrl: './base-form-footer.component.html',
  styleUrls: ['./base-form-footer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconButton,
    MatIcon,
    MatButton,
  ]
})
export class BaseFormFooterComponent {
  // -----------------------------------------------------------------------------------------------------
  // @ Public Variables
  // -----------------------------------------------------------------------------------------------------
  @Input() is_small!: boolean
  @Input() edit_mode = true
  @Input() force_steps = false
  @Input() disable_reset = false
  @Input() form_ready = false;
  @Input() hide_toolbar = false;
  @Input() submit_text = "Submit";
  @Input() step = 1
  @Input() steps = 1
  @Input() continue_disabled = false


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

  // -----------------------------------------------------------------------------------------------------
  // @ Private Variables
  // -----------------------------------------------------------------------------------------------------

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
