import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { UiKitBaseClass } from '@gmtre-devkit';
import { KeysPipe } from '@gmtre-pipes';
import { JsonViewerComponent } from '../../../../json-viewer';
import { SessionPermissionsInfoViewComponent } from '../permissions-info/permissions-info.component';

@Component({
  selector: 'debugger-session-permissions-container',
  templateUrl: './container.component.html',
  exportAs: 'debugger-session-permissions-container',
  standalone: true,
  imports: [
    CommonModule,
    JsonViewerComponent,
    SessionPermissionsInfoViewComponent,
    MatExpansionModule,
    KeysPipe,
    MatListModule,
  ],
})
export class SessionPermissionsContainerComponent
  extends UiKitBaseClass
  implements OnInit, OnDestroy
{
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
  downloadData() {}

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
}
