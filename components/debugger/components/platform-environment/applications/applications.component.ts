import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, OnDestroy, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RemoveUnderScorePipe, KeysPipe, TruncatePipe, JsonDataTypePipe } from '@gmtre-pipes';
import { PlatformContainerComponent } from '../container/container.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'debugger-platform-applications',
  templateUrl: './applications.component.html',
  exportAs: 'debugger-platform-applications',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, KeysPipe, TruncatePipe, RemoveUnderScorePipe, MatIconModule, JsonDataTypePipe],
})
export class PlatformApplicationsComponent implements OnInit, OnDestroy {
  container = inject(PlatformContainerComponent)
  selectedApp;
  // readonly dialog = inject(MatDialog)
  @HostBinding('class') class = 'flex flex-row';

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.selectedApp = this.container.apps[0];
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    // this._unsubscribeAll.next(null);
    // this._unsubscribeAll.complete();
    // Dispose the overlay
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
}
