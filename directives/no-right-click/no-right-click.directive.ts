import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[noRightClick]',
  exportAs: 'noRightClick',
  standalone: true,
})
export class NoRightClickDirective {
  constructor() {}

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();  // This prevents the context menu from showing
  }
}