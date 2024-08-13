import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  GmtreNavigationItem,
  GmtreNavigationService,
} from '@gmtre-core';
import { Subject, takeUntil } from 'rxjs';
import { GmtreHorizontalNavigationComponent } from '../../horizontal.component';
import { GmtreHorizontalNavigationBasicItemComponent } from '../basic/basic.component';
import { GmtreHorizontalNavigationDividerItemComponent } from '../divider/divider.component';

@Component({
  selector: 'gmtre-horizontal-navigation-branch-item',
  templateUrl: './branch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    MatMenuModule,
    NgTemplateOutlet,
    NgFor,
    GmtreHorizontalNavigationBasicItemComponent,
    forwardRef(() => GmtreHorizontalNavigationBranchItemComponent),
    GmtreHorizontalNavigationDividerItemComponent,
    MatTooltipModule,
    MatIconModule,
  ],
})
export class GmtreHorizontalNavigationBranchItemComponent
  implements OnInit, OnDestroy
{
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_child: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() child: boolean = false;
  @Input()
  item!: GmtreNavigationItem;
  @Input()
  name!: string;
  @ViewChild('matMenu', { static: true })
  matMenu!: MatMenu;

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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Trigger the change detection
   */
  triggerChangeDetection(): void {
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

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
