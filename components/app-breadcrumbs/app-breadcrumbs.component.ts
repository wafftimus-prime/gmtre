import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

export interface BreadcrumbOptions {
  id?: string;
  label?: string;
  path?: string;
  current?: boolean;
}

@Component({
  selector: 'shared-breadcrumbs',
  templateUrl: './app-breadcrumbs.component.html',
  styleUrls: ['./app-breadcrumbs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIcon
  ],
})
export class AppBreadcrumbsComponent {
  @Input() breadcrumbs: any[] = []
}
