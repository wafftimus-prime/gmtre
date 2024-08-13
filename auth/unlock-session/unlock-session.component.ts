import { NgIf } from '@angular/common';
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
import { Router, RouterLink } from '@angular/router';
import {
  GmtreAlertComponent,
  GmtreAlertType,
} from '@gmtre-components';
import { gmtreAnimations } from '@gmtre-core';
import { UiKitBaseClass } from '@gmtre-devkit';

@Component({
  selector: 'auth-unlock-session',
  templateUrl: './unlock-session.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: gmtreAnimations,
  standalone: true,
  imports: [
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
export class AuthUnlockSessionComponent extends UiKitBaseClass implements OnInit {
  @ViewChild('unlockSessionNgForm') unlockSessionNgForm!: NgForm;

  alert: { type: GmtreAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  name!: string;
  showAlert: boolean = false;
  unlockSessionForm!: UntypedFormGroup
  private _email!: string;

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
  ) {
    super()
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.name = this.user?.name;
    this._email = this.user?.email;

    // Create the form
    this.unlockSessionForm = this._formBuilder.group({
      name: [
        {
          value: this.name,
          disabled: true,
        },
      ],
      password: ['', Validators.required],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Unlock
   */
  unlock(): void {
    // Return if the form is invalid
    if (this.unlockSessionForm.invalid) {
      return;
    }

    // Disable the form
    this.unlockSessionForm?.disable();

    // Hide the alert
    this.showAlert = false;

    // this._authService
    //   .unlockSession({
    //     email: this._email ?? '',
    //     password: this.unlockSessionForm?.get('password')?.value,
    //   })
    //   .subscribe(
    //     () => {
    //       // Set the redirect url.
    //       // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
    //       // to the correct page after a successful sign in. This way, that url can be set via
    //       // routing file and we don't have to touch here.
    //       const redirectURL =
    //         this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
    //         '/signed-in-redirect';

    //       // Navigate to the redirect url
    //       this._router.navigateByUrl(redirectURL);
    //     },
    //     (response) => {
    //       // Re-enable the form
    //       this.unlockSessionForm.enable();

    //       // Reset the form
    //       this.unlockSessionNgForm.resetForm({
    //         name: {
    //           value: this.name,
    //           disabled: true,
    //         },
    //       });

    //       // Set the alert
    //       this.alert = {
    //         type: 'error',
    //         message: 'Invalid password',
    //       };

    //       // Show the alert
    //       this.showAlert = true;
    //     }
    //   );
  }
}
