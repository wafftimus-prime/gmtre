import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'debugger-platform-applications',
  templateUrl: './applications.component.html',
  exportAs: 'debugger-platform-applications',
  standalone: true,
  imports: [CommonModule],
})
export class PlatformApplicationsComponent implements OnInit, OnDestroy {
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
