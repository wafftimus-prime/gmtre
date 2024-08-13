import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import {
  GmtreAlertComponent,
  GmtreAlertType,
} from '@gmtre-components';
import { gmtreAnimations, GmtreValidators } from '@gmtre-core';
import { UiKitBaseClass } from '@gmtre-devkit';
import {
  lowerCaseValidator,
  numberValidator,
  specialCharacterValidator,
  upperCaseValidator,
} from '@gmtre-utils';
import { finalize } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
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
export class AuthResetPasswordComponent
  extends UiKitBaseClass
  implements OnInit
{
  @ViewChild('resetPasswordNgForm') resetPasswordNgForm!: NgForm;
  alert: { type: GmtreAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  resetPasswordForm!: UntypedFormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
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
  ngOnInit(): void {
    // Create the form
    this.resetPasswordForm = this._formBuilder.group(
      {
        password: [
          null,
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
        passwordConfirm: ['', Validators.required],
      },
      {
        validators: GmtreValidators.mustMatch('password', 'passwordConfirm'),
      }
    );
  }

  /**
   * Reset password
   */
  resetPassword(): void {
    // Return if the form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    // Disable the form
    this.resetPasswordForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Send the request to the server
    this._authService
      .resetPassword(this.resetPasswordForm.get('password')?.value)
      .pipe(
        finalize(() => {
          // Re-enable the form
          this.resetPasswordForm.enable();

          // Reset the form
          this.resetPasswordNgForm.resetForm();

          // Show the alert
          this.showAlert = true;
        })
      )
      .subscribe(
        (response) => {
          // Set the alert
          this.alert = {
            type: 'success',
            message: 'Your password has been reset.',
          };
        },
        (response) => {
          // Set the alert
          this.alert = {
            type: 'error',
            message: 'Something went wrong, please try again.',
          };
        }
      );
  }
}
