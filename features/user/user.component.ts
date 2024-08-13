import { BooleanInput } from '@angular/cdk/coercion';
import { CommonModule, JsonPipe, NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { UiKitBaseClass } from '@gmtre-devkit';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'user',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    MatButtonModule,
    MatMenuModule,
    NgIf,
    MatIconModule,
    NgClass,
    MatDividerModule,
    RouterModule,
  ],
})
export class UserComponent extends UiKitBaseClass implements OnInit, OnDestroy {

  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_showAvatar: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() showAvatar: boolean = true;

  /**
   * Constructor
   */
  constructor(private _router: Router) {
    super();
  }

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
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Update the user status
   *
   * @param status
   */
  updateUserStatus(status: string): void {
    console.log(
      'Pending Implementation to update user status through signal Store'
    );
    // Return if user is not available
    if (!this.user) {
      return;
    }

    // this._userStore.updateUserMaster({...this.user,status})
    // Update the user
    // this._userService
    //   .update({
    //     ...this.user,
    //     status,
    //   })
    //   .subscribe();
  }

  /**
   * Sign out
   */
  signOut(): void {
    console.log('Signing Out')
    this._router.navigate(['/auth/sign-out']);
  }
}
