import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'shared-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ],
})
export class AppContainerComponent {
  @Input() cssClass = 'h-full';
  @HostBinding('class') hostClasses = 'w-full';
  // @Input() loaderId: string;
  // @Input() loaderText: string;
}
