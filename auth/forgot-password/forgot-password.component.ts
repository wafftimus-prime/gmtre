import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import {
  GmtreAlertComponent,
  GmtreAlertType,
} from '@gmtre-components';
import { gmtreAnimations } from '@gmtre-core';
import { UiKitBaseClass } from '@gmtre-devkit';
import { getAppUserStorageKey } from '@gmtre-utils';
import { resetPassword, ResetPasswordOutput } from 'aws-amplify/auth';
import { Cache } from 'aws-amplify/utils';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
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
    MatProgressSpinnerModule,
    RouterLink,
  ],
})
export class AuthForgotPasswordComponent
  extends UiKitBaseClass
  implements OnInit
{
  @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm!: NgForm;
  private storageKey;
  cachedEmail: any;
  alert: { type: GmtreAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  forgotPasswordForm!: UntypedFormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: Router
  ) {
    super();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  async ngOnInit() {
    this.storageKey = await getAppUserStorageKey();

    // Create the form
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Send the reset link
   */
  sendResetLink(): void {
    // Return if the form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const params = this.forgotPasswordForm.getRawValue();
    Cache.setItem(this.storageKey, { email: params.email }, { priority: 1 });

    // Disable the form
    this.forgotPasswordForm.disable();

    // Hide the alert
    this.showAlert = false;

    this.handleResetPassword(this.forgotPasswordForm.get('email')?.value);
  }

  async handleResetPassword(username: string) {
    try {
      const output = await resetPassword({ username });
      console.log(output);
      this.handleResetPasswordNextSteps(output);
    } catch (error) {
      console.log(error);
      // Re-enable the form
      this.forgotPasswordForm.enable();

      // Reset the form
      this.forgotPasswordNgForm.resetForm();

      // Show the alert
      this.showAlert = true;
    }
  }

  handleResetPasswordNextSteps(output: ResetPasswordOutput) {
    // Re-enable the form
    this.forgotPasswordForm.enable();

    // Reset the form
    this.forgotPasswordNgForm.resetForm();
    this._router.navigate(['/auth', 'confirm-reset-password']);

    // Show the alert
    this.showAlert = true;

    const { nextStep } = output;

    // this.alert = {
    //   type: 'error',
    //   message:
    //     'Email does not found! Are you sure you are already a member?',
    // };

    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        this.alert = {
          type: 'success',
          message:
            "Password reset sent! You'll receive an email if you are registered on our system.",
        };
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        );
        // Collect the confirmation code from the user and pass to confirmResetPassword.
        break;
      case 'DONE':
        console.log('Successfully reset password.');
        break;
    }
  }
}
