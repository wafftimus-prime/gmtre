import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

interface Breadcrumbs {
  label: string;
  link: string;
}

@Component({
  selector: 'gmtre-common-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class GmtreCommonHeaderComponent {
  @Input() title!: string;
  @Input() showTitle = false;
  @Input() breadcrumbs: Breadcrumbs[] = [];
}
