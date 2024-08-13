import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  IsActiveMatchOptions,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  GmtreNavigationItem,
  GmtreNavigationService,
} from '@gmtre-core';
import { GmtreUtilsService } from '@gmtre-services';
import { Subject, takeUntil } from 'rxjs';
import { GmtreVerticalNavigationComponent } from '../../vertical.component';

@Component({
  selector: 'gmtre-vertical-navigation-basic-item',
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    RouterLink,
    RouterLinkActive,
    MatTooltipModule,
    NgTemplateOutlet,
    MatIconModule,
  ],
})
export class GmtreVerticalNavigationBasicItemComponent
  implements OnInit, OnDestroy
{
  @Input()
  item!: GmtreNavigationItem;
  @Input()
  name!: string;

  isActiveMatchOptions: IsActiveMatchOptions;
  private _gmtreVerticalNavigationComponent!: GmtreVerticalNavigationComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _gmtreNavigationService: GmtreNavigationService,
    private _gmtreUtilsService: GmtreUtilsService
  ) {
    // Set the equivalent of {exact: false} as default for active match options.
    // We are not assigning the item.isActiveMatchOptions directly to the
    // [routerLinkActiveOptions] because if it's "undefined" initially, the router
    // will throw an error and stop working.
    this.isActiveMatchOptions = this._gmtreUtilsService.subsetMatchOptions;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the "isActiveMatchOptions" either from item's
    // "isActiveMatchOptions" or the equivalent form of
    // item's "exactMatch" option
    this.isActiveMatchOptions =
      this.item.isActiveMatchOptions ?? this.item.exactMatch
        ? this._gmtreUtilsService.exactMatchOptions
        : this._gmtreUtilsService.subsetMatchOptions;

    // Get the parent navigation component
    this._gmtreVerticalNavigationComponent =
      this._gmtreNavigationService.getComponent(this.name);

    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Subscribe to onRefreshed on the navigation component
    this._gmtreVerticalNavigationComponent.onRefreshed
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
