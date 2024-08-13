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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  GmtreAlertComponent,
  GmtreAlertType,
} from '@gmtre-components';
import { OAuthProvider, gmtreAnimations } from '@gmtre-core';
import { UiKitBaseClass } from '@gmtre-devkit';
import { NoRightClickDirective } from '@gmtre-directives';
import { signIn } from 'aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: gmtreAnimations,
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    GmtreAlertComponent,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    NoRightClickDirective,
    MatProgressSpinnerModule,
  ],
})
export class AuthSignInComponent extends UiKitBaseClass implements OnInit {
  @ViewChild('signInNgForm') signInNgForm!: NgForm;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  alert: { type: GmtreAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signInForm!: UntypedFormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
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
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      rememberMe: [''],
    });
  }

  /**
   * Sign in
   */
  async signIn(provider?: OAuthProvider) {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    this.setupEmailLowerCase();

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign in
    const params = this.signInForm.getRawValue();
    this.loading$.next(true);
    try {
      switch (provider) {
        case 'Apple':
          break;
        case 'Google':
          break;
        case 'Facebook':
          break;

        default:
          const singinResponse = await signIn({
            username: params.email,
            password: params.password,
          });

          console.log(singinResponse);
          if (singinResponse?.isSignedIn) {
            this.loading$.next(false);

            // Set the redirect url.
            // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
            // to the correct page after a successful sign in. This way, that url can be set via
            // routing file and we don't have to touch here.
            const redirectURL =
              this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
              '/signed-in-redirect';

            // Navigate to the redirect url
            this._router.navigateByUrl(redirectURL);

            // this.router.navigate(['/']);
          }
          break;
      }
    } catch (error: any) {
      this.alert = {
        type: 'error',
        message: error.message,
      };

      this.signInForm.enable();

      // Show the alert
      this.showAlert = true;

      this.signInNgForm.resetForm();

      this.loading$.next(false);
    }

    // this._authService.signIn(this.signInForm.getRawValue()).subscribe(
    //   () => {

    //   },
    //   (response) => {
    //     // Re-enable the form
    //     this.signInForm.enable();

    //     // Reset the form
    //     this.signInNgForm.resetForm();

    //     // Set the alert
    //     this.alert = {
    //       type: 'error',
    //       message: 'Wrong email or password',
    //     };

    //     // Show the alert
    //     this.showAlert = true;
    //   }
    // );
  }

  private setupEmailLowerCase() {
    const emailControl = this.signInForm.get('email');
    emailControl?.setValue(emailControl.value.toLowerCase(), {
      emitEvent: false,
    });
  }
}
