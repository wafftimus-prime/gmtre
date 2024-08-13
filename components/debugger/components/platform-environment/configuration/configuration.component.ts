import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UiKitBaseClass } from '@gmtre-devkit';
import { RemoveUnderScorePipe, KeysPipe, TruncatePipe } from '@gmtre-pipes';
import { PlatformContainerComponent } from '../container/container.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'debugger-platform-configuration',
  templateUrl: './configuration.component.html',
  exportAs: 'debugger-platform-configuration',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, KeysPipe, TruncatePipe, RemoveUnderScorePipe],
})
export class PlatformConfigurationComponent implements OnInit, OnDestroy {
  container = inject(PlatformContainerComponent)
  // readonly dialog = inject(MatDialog)
  // @HostBinding('class') class =
  //   'relative flex flex-0 items-center justify-start w-full h-10 px-4 md:px-6 z-49 border-t bg-card dark:bg-transparent print:hidden';

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {}

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
