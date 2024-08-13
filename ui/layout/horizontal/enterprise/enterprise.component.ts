import { CommonModule, NgIf } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import {
  GmtreFullscreenComponent,
  GmtreHorizontalNavigationComponent,
  GmtreLoadingBarComponent,
  GmtreVerticalNavigationComponent,
} from '@gmtre-components';
import { Navigation, GmtreNavigationService } from '@gmtre-core';
import {
  AppsComponent,
  FooterComponent,
  MessagesComponent,
  NotificationsComponent,
  QuickChatComponent,
  SearchComponent,
  ShortcutsComponent,
  UserComponent,
} from '@gmtre-features';
import { GmtreMediaWatcherService } from '@gmtre-services';
import { UiKitBaseClass } from '@gmtre-devkit';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'enterprise-layout',
  templateUrl: './enterprise.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    GmtreLoadingBarComponent,
    AppsComponent,
    NgIf,
    GmtreVerticalNavigationComponent,
    MatButtonModule,
    MatIconModule,
    GmtreFullscreenComponent,
    SearchComponent,
    ShortcutsComponent,
    MessagesComponent,
    NotificationsComponent,
    UserComponent,
    GmtreHorizontalNavigationComponent,
    RouterOutlet,
    QuickChatComponent,
  ],
})
export class EnterpriseLayoutComponent
  extends UiKitBaseClass
  implements OnInit, OnDestroy
{
  isScreenSmall!: boolean;
  navigation!: Navigation;

  /**
   * Constructor
   */
  constructor(
    private _gmtreMediaWatcherService: GmtreMediaWatcherService,
    private _gmtreNavigationService: GmtreNavigationService
  ) {
    super();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to navigation data
    this._gmtreNavigationService.navigation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigation: Navigation) => {
        this.navigation = navigation;
      });

    // Subscribe to media changes
    this._gmtreMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
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
