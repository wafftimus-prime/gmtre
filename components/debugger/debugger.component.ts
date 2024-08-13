import {
  CommonModule,
  NgClass,
  NgFor,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { UiKitBaseClass } from '@gmtre-devkit';
import {RemoveUnderScorePipe, KeysPipe, TruncatePipe } from '@gmtre-pipes';
import { PlatformContainerComponent } from './components/platform-environment/container/container.component';
import { SystemSupportContainerComponent } from './components/system-support/container/container.component';
import { SessionPermissionsContainerComponent } from './components/session-permissions/container/container.component';

@Component({
  selector: 'core-system-debugger',
  templateUrl: './debugger.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'core-system-debugger',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    NgIf,
    MatTooltipModule,
    NgFor,
    NgClass,
    NgTemplateOutlet,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDialogModule,
    PlatformContainerComponent,
    SystemSupportContainerComponent,
    SessionPermissionsContainerComponent,
    KeysPipe,
    TruncatePipe,
    RemoveUnderScorePipe,
    MatExpansionModule,
  ],
})
export class DebuggerComponent
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

  downloadUserInfo() {
    console.log('Need to implement Download Data');
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
