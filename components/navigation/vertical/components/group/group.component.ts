import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass, NgFor, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    forwardRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GmtreNavigationItem, GmtreNavigationService } from '@gmtre-core';
import { Subject, takeUntil } from 'rxjs';
import { GmtreVerticalNavigationComponent } from '../../vertical.component';
import { GmtreVerticalNavigationBasicItemComponent } from '../basic/basic.component';
import { GmtreVerticalNavigationCollapsableItemComponent } from '../collapsable/collapsable.component';
import { GmtreVerticalNavigationDividerItemComponent } from '../divider/divider.component';
import { GmtreVerticalNavigationSpacerItemComponent } from '../spacer/spacer.component';

@Component({
  selector: 'gmtre-vertical-navigation-group-item',
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    MatIconModule,
    NgFor,
    GmtreVerticalNavigationBasicItemComponent,
    GmtreVerticalNavigationCollapsableItemComponent,
    GmtreVerticalNavigationDividerItemComponent,
    forwardRef(() => GmtreVerticalNavigationGroupItemComponent),
    GmtreVerticalNavigationSpacerItemComponent,
  ],
})
export class GmtreVerticalNavigationGroupItemComponent
  implements OnInit, OnDestroy
{
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_autoCollapse: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() autoCollapse!: boolean;
  @Input() item!: GmtreNavigationItem;
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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
