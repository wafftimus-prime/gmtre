import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, OnDestroy, OnInit } from '@angular/core';
import { SystemSupportContainerComponent } from '../container/container.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RemoveUnderScorePipe, KeysPipe, TruncatePipe, JsonDataTypePipe } from '@gmtre-pipes';

@Component({
  selector: 'debugger-system-support-user-info',
  templateUrl: './user-info.component.html',
  exportAs: 'debugger-system-support-user-info',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, KeysPipe, TruncatePipe, RemoveUnderScorePipe, MatIconModule, JsonDataTypePipe],
})
export class SystemSupportUserInfoComponent implements OnInit, OnDestroy {
  container = inject(SystemSupportContainerComponent)

  @HostBinding('class') class = 'flex flex-row';
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
