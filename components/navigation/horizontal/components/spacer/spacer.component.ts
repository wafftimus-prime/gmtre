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
import { GmtreHorizontalNavigationComponent } from '../../../horizontal/horizontal.component';

@Component({
  selector: 'gmtre-horizontal-navigation-spacer-item',
  templateUrl: './spacer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass],
})
export class GmtreHorizontalNavigationSpacerItemComponent
  implements OnInit, OnDestroy
{
  @Input()
  item!: GmtreNavigationItem;
  @Input()
  name!: string;

  private _gmtreHorizontalNavigationComponent!: GmtreHorizontalNavigationComponent;
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
    this._gmtreHorizontalNavigationComponent =
      this._gmtreNavigationService.getComponent(this.name);

    // Subscribe to onRefreshed on the navigation component
    this._gmtreHorizontalNavigationComponent.onRefreshed
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
