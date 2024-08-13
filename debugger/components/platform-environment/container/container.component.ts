import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiKitBaseClass } from '@gmtre-devkit';
import { PlatformApplicationsComponent } from '../applications/applications.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PlatformConfigurationComponent } from '../configuration/configuration.component';
import { KeysPipe } from '@gmtre-pipes';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'debugger-platform-container',
  templateUrl: './container.component.html',
  exportAs: 'debugger-platform-container',
  standalone: true,
  imports: [
    CommonModule,
    PlatformConfigurationComponent,
    PlatformApplicationsComponent,
    MatExpansionModule,
    KeysPipe,
    MatListModule,
  ],
})
export class PlatformContainerComponent
  extends UiKitBaseClass
  implements OnInit, OnDestroy
{
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
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
