import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeviceLayout, DeviceType, PlatformStore, ScreenSize } from '@gmtre-devkit';
import { Subject } from 'rxjs';
import { AppBreadcrumbsComponent, BreadcrumbOptions } from '../app-breadcrumbs/app-breadcrumbs.component';

export interface HeadingStats {
  rawCount: number;
  filteredCount: number;
  value: number;
  visible: boolean;
}

export interface HeadingOptions {
  title: string;
  subtitle: string;
  stats: HeadingStats;
  loaderId?: string;
  breadcrumbs: BreadcrumbOptions[];
  searchable: boolean;
  actionButtons: ActionButton[];
}

export interface ActionButton {
  type: 'button' | 'group';
  label: string;
  actionType: string;
  class: string;
  icon: string;
  iconPosition: 'prefix' | 'suffix'
}

@Component({
  selector: 'shared-app-heading',
  templateUrl: './app-heading.component.html',
  styleUrls: ['./app-heading.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AppBreadcrumbsComponent,
    MatIconModule,
    MatFormField,
    MatButton,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatMenu,
    MatPrefix,
    MatMenuTrigger,
    MatMenuItem,
    MatTooltipModule
  ],
})
export class AppHeadingComponent {
  @Input() options: HeadingOptions;
  @Output() OnSearch: EventEmitter<any> = new EventEmitter();
  @Output() OnAction: EventEmitter<any> = new EventEmitter();
  searchInputControl: FormControl = new FormControl();

  public platform = inject(PlatformStore)
  public screenSize: ScreenSize | any = this.platform.getPlatformClientInstance()['screenSize'];
  public deviceType: DeviceType | any = this.platform.getPlatformClientInstance()['deviceType'];
  public deviceLayout: DeviceLayout | any = this.platform.getPlatformClientInstance()['deviceLayout'];

  get is_small(): boolean {
    return ['xsmall', 'small'].includes(this.screenSize);
  }

}
