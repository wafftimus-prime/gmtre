import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import {
  GmtreFullscreenComponent,
  GmtreLoadingBarComponent,
  GmtreVerticalNavigationComponent,
} from '@gmtre-components';
import { Navigation, GmtreNavigationService } from '@gmtre-core';
import {
  AppsComponent,
  MessagesComponent,
  NotificationsComponent,
  QuickChatComponent,
  SearchComponent,
  ShortcutsComponent,
  UserComponent,
} from '@gmtre-features';
import {UiKitBaseClass} from '@gmtre-devkit';
import {

  GmtreMediaWatcherService
} from '@gmtre-services';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'thin-layout',
  templateUrl: './thin.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    GmtreLoadingBarComponent,
    GmtreVerticalNavigationComponent,
    MatButtonModule,
    MatIconModule,
    GmtreFullscreenComponent,
    SearchComponent,
    ShortcutsComponent,
    MessagesComponent,
    NotificationsComponent,
    UserComponent,
    AppsComponent,
    NgIf,
    RouterOutlet,
    QuickChatComponent,
  ],
})
export class ThinLayoutComponent extends UiKitBaseClass implements OnInit, OnDestroy {
  isScreenSmall: boolean | undefined;
  navigation!: Navigation;
  _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _gmtreMediaWatcherService: GmtreMediaWatcherService,
    private _gmtreNavigationService: GmtreNavigationService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super()
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    // this._navigationService.navigation$
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((navigation: Navigation) => {
    //     this.navigation = navigation;
    //     this._changeDetectorRef.detectChanges(); // Manually trigger change detection
    //   });


    // Subscribe to navigation data
    this._gmtreNavigationService.navigation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigation: Navigation) => {
        this.navigation = navigation;
        this._changeDetectorRef.detectChanges(); // Manually trigger change detection
      });

    // Subscribe to media changes
    this._gmtreMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }: any) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
        this._changeDetectorRef.detectChanges(); // Manually trigger change detection
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
   * Toggle navigation
   *
   * @param name
   */
  toggleNavigation(name: string): void {
    // Get the navigation
    const navigation =
      this._gmtreNavigationService.getComponent<GmtreVerticalNavigationComponent>(
        name
      );

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }
}
