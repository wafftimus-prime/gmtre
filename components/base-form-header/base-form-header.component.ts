import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'base-form-header',
  templateUrl: './base-form-header.component.html',
  styleUrls: ['./base-form-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatIconButton
  ]
})
export class BaseFormHeaderComponent {
  // -----------------------------------------------------------------------------------------------------
  // @ Public Variables
  // -----------------------------------------------------------------------------------------------------
  @Input() is_small!: boolean
  @Input() title: string
  @Input() subtitle: string
  @Input() step = 1
  @Input() steps = 1

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
