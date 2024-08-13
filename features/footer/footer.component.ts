import {
  CommonModule,
  NgClass,
  NgFor,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { getDateTimeDiff } from '@gmtre-utils';
import { CountdownModule } from '../countdown';
import { UiKitBaseClass } from '@gmtre-devkit';
import { MatDialog } from '@angular/material/dialog';
import { DebuggerComponent } from '@gmtre-components';

@Component({
  selector: 'layout-footer',
  templateUrl: './footer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'layout-footer',
  standalone: true,
  imports: [
    CountdownModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
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
  ],
})
// extends ResponsiveService
export class FooterComponent
  extends UiKitBaseClass
  implements OnInit, OnDestroy
{
  readonly dialog = inject(MatDialog)

  @HostBinding('class') class =
    'relative flex flex-0 items-center justify-start w-full h-10 px-4 md:px-6 z-49 border-t bg-card dark:bg-transparent print:hidden';

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
  }

  timeCheck(expiration_ts) {
    const remTime = getDateTimeDiff('sec', new Date(expiration_ts), true) - 600;
    return remTime;
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
  async showDebuggerView(){
    const dialogRef = this.dialog.open(DebuggerComponent,{
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: this.isMobile ? 'mobile-dialog' : 'noradius-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async countdownEvent(event) {
    if (event.action === 'done') {
      // const promptResponse = await firstValueFrom(
      //   sessionExpiredPrompt(this.dialog, {})
      // );

      window.location.reload();
      // if (promptResponse.result.reload){
      // }
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
}
