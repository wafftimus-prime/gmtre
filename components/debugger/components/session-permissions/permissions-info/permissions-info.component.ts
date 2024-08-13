import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import {
  Component,
  HostBinding,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  JsonDataTypePipe,
  KeysPipe,
  RemoveUnderScorePipe,
  TruncatePipe,
} from '@gmtre-pipes';
import { JsonViewerComponent } from '../../../../json-viewer';
import { SessionPermissionsContainerComponent } from '../container/container.component';

@Component({
  selector: 'debugger-session-permissions-info-view',
  templateUrl: './permissions-info.component.html',
  exportAs: 'debugger-system-support-network-info',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    JsonViewerComponent,
    CdkAccordionModule,
    KeysPipe,
    TruncatePipe,
    RemoveUnderScorePipe,
    MatIconModule,
    JsonDataTypePipe,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
})
export class SessionPermissionsInfoViewComponent
  implements OnInit, OnDestroy
{
  container = inject(SessionPermissionsContainerComponent);
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;

  @HostBinding('class') class = 'flex flex-col w-full';
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
