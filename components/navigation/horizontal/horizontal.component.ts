import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  GmtreNavigationService,
  gmtreAnimations,
} from '@gmtre-core';
import { GmtreNavigationItem } from '@gmtre-core';
import { GmtreUtilsService } from '@gmtre-services';
import { ReplaySubject, Subject } from 'rxjs';
import { GmtreHorizontalNavigationBasicItemComponent } from './components/basic/basic.component';
import { GmtreHorizontalNavigationBranchItemComponent } from './components/branch/branch.component';
import { GmtreHorizontalNavigationSpacerItemComponent } from './components/spacer/spacer.component';

@Component({
  selector: 'gmtre-horizontal-navigation',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
  animations: gmtreAnimations,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'gmtreHorizontalNavigation',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    GmtreHorizontalNavigationBasicItemComponent,
    GmtreHorizontalNavigationBranchItemComponent,
    GmtreHorizontalNavigationSpacerItemComponent,
  ],
})
export class GmtreHorizontalNavigationComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() name: string = this._gmtreUtilsService.randomId();
  @Input() navigation!: GmtreNavigationItem[];

  onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _gmtreNavigationService: GmtreNavigationService,
    private _gmtreUtilsService: GmtreUtilsService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Navigation
    if ('navigation' in changes) {
      // Mark for check
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Make sure the name input is not an empty string
    if (this.name === '') {
      this.name = this._gmtreUtilsService.randomId();
    }

    // Register the navigation component
    this._gmtreNavigationService.registerComponent(this.name, this);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Deregister the navigation component from the registry
    this._gmtreNavigationService.deregisterComponent(this.name);

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Refresh the component to apply the changes
   */
  refresh(): void {
    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Execute the observable
    this.onRefreshed.next(true);
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
