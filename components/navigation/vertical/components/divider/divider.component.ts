import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  GmtreNavigationItem,
  GmtreNavigationService,
} from '@gmtre-core';
import { Subject, takeUntil } from 'rxjs';
import { GmtreVerticalNavigationComponent } from '../../vertical.component';

@Component({
  selector: 'gmtre-vertical-navigation-divider-item',
  templateUrl: './divider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass],
})
export class GmtreVerticalNavigationDividerItemComponent
  implements OnInit, OnDestroy
{
  @Input()
  item!: GmtreNavigationItem;
  @Input()
  name!: string;

  private _gmtreVerticalNavigationComponent!: GmtreVerticalNavigationComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _gmtreNavigationService: GmtreNavigationService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the parent navigation component
    this._gmtreVerticalNavigationComponent =
      this._gmtreNavigationService.getComponent(this.name);

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
