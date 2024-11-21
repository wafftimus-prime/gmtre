import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';

export interface CtaSectionOptions {
  title?: string
  subtitle?: string
  button_text?: string
  other_button_text?: string
}

@Component({
  selector: 'cta-section',
  templateUrl: './cta-section.component.html',
  styleUrls: ['./cta-section.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButton
  ],
})
export class CtaSectionComponent {
  @Input() config!: CtaSectionOptions

  @Output() ButtonClicked = new EventEmitter()
  @Output() OtherButtonClicked = new EventEmitter()
}
