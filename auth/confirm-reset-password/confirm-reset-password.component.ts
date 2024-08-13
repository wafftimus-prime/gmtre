import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import {
  GmtreAlertComponent,
  GmtreAlertType,
} from '@gmtre-components';
import { gmtreAnimations, GmtreValidators } from '@gmtre-core';
import { UiKitBaseClass, PlatformStore, GmtrePlatformConfigService } from '@gmtre-devkit';
import { ResponsiveService } from '@gmtre-services';
import { getAppUserStorageKey, lowerCaseValidator, numberValidator, specialCharacterValidator, upperCaseValidator } from '@gmtre-utils';
import { confirmResetPassword, ConfirmResetPasswordInput } from 'aws-amplify/auth';
import { Cache } from 'aws-amplify/utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'auth-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: gmtreAnimations,
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    GmtreAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
})
export class AuthConfirmResetPasswordComponent
  extends UiKitBaseClass
  implements OnInit
{
  @ViewChild('confirmResetPasswordNgForm') confirmResetPasswordNgForm!: NgForm;
  private storageKey;
  cachedEmail: any;

  alert: { type: GmtreAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  confirmResetPasswordForm!: UntypedFormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _formBuilder: UntypedFormBuilder
  ) {
    super();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  async ngOnInit(){
    this.storageKey = await getAppUserStorageKey();

    // Create the form
    this.confirmResetPasswordForm = this._formBuilder.group(
      {
        username: ['', [Validators.required, Validators.email]],
        confirmationCode: ['', [Validators.required]],
        newPassword: [null,
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.required,
            upperCaseValidator(),
            lowerCaseValidator(),
            numberValidator(),
            specialCharacterValidator(),
          ]),
        ],
        newPasswordConfirm: ['', Validators.required],
      },
      {
        validators: GmtreValidators.mustMatch('newPassword', 'newPasswordConfirm'),
      }
    );

    await this.configureCachedEmail()
  }

  async configureCachedEmail(){
    const { email } = await Cache.getItem(this.storageKey);
    if (email) {
      this.confirmResetPasswordForm.get('username').setValue(email);
      this.confirmResetPasswordForm.get('username').disable();
    }
  }

  /**
   * Confirm Reset Password
   */
  confirmResetPassword(): void {
    // Return if the form is invalid
    if (this.confirmResetPasswordForm.invalid) {
      return;
    }

    this.setupEmailLowerCase()
    // Disable the form
    this.confirmResetPasswordForm.disable();

    // Hide the alert
    this.showAlert = false;

    const params = this.confirmResetPasswordForm.getRawValue()

    // Send the request to the server
    this.handleConfirmResetPassword(params)
  }

  async handleConfirmResetPassword({
    username,
    confirmationCode,
    newPassword
  }: ConfirmResetPasswordInput) {
    try {
      const res = await confirmResetPassword({ username, confirmationCode, newPassword });
      this.alert = {
        type: 'success',
        message: 'Your password has been reset.',
      };

      setTimeout(()=>{
        this._router.navigate(['/']);
      },500)

    } catch (error) {
      this.alert = {
        type: 'error',
        message: error.message
      };

      // Re-enable the form
      this.confirmResetPasswordForm.enable();

      // Reset the form
      this.confirmResetPasswordNgForm.resetForm();
      await this.configureCachedEmail()

      // Show the alert
      this.showAlert = true;
    }
  }

  private setupEmailLowerCase() {
    const emailControl = this.confirmResetPasswordForm.get('username')
    emailControl?.setValue(emailControl.value.toLowerCase(), { emitEvent: false })
  }
}
