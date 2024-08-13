import { CommonModule, NgIf } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import {
  GmtreAlertComponent,
  GmtreAlertType,
} from '@gmtre-components';
import { gmtreAnimations } from '@gmtre-core';
import { UiKitBaseClass } from '@gmtre-devkit';
import {
  getAppUserStorageKey,
  lowerCaseValidator,
  numberValidator,
  specialCharacterValidator,
  upperCaseValidator,
} from '@gmtre-utils';
import { AlertController } from '@ionic/angular/standalone';
import { signUp } from 'aws-amplify/auth';
import { Cache } from 'aws-amplify/utils';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: gmtreAnimations,
  standalone: true,
  imports: [
    CommonModule,

    RouterLink,
    NgIf,
    GmtreAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
})
export class AuthSignUpComponent extends UiKitBaseClass implements OnInit {
  @ViewChild('signUpNgForm') signUpNgForm!: NgForm;
  private storageKey;
  cachedEmail: any;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  alert: { type: GmtreAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signUpForm!: UntypedFormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _ac: AlertController,
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
    this.signUpForm = this._formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
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
      // company: [''],
      agreements: ['', Validators.requiredTrue],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  async showMobileAlert(message: any) {
    const alert = await this._ac.create({
      message,
      buttons: ['Okay'],
    });

    await alert.present();
  }

  /**
   * Sign up
   */
  async signUp() {
    // Do nothing if the form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.setupEmailLowerCase();
    const params = this.signUpForm.getRawValue();
    Cache.setItem(this.storageKey, { email: params.email }, { priority: 1 });
    this.loading$.next(true);

    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: params.email,
        password: params.password,
        options: {
          userAttributes: {
            email: params.email,
            name: params.name,
          },
          // optional
          autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
      });
      this.loading$.next(false);
      this.signUpForm.enable();

      if (nextStep.signUpStep == 'CONFIRM_SIGN_UP') {
        // export function encryptData(data: string, key: string): SjclCipherEncrypted {
        //   return encrypt(key, data);
        // }

        // export function decryptData(cipher: string, key: string): string {
        //   return decrypt(key, cipher);
        // }

        this.signUpNgForm.resetForm();
        this._router.navigate(['/auth', 'confirmation-required']);
      }

      console.log('userId:', userId);
      console.log('isSignUpComplete:', isSignUpComplete);
      console.log('nextStep:', nextStep);
    } catch (error: any) {
      this.signUpForm.enable();
      this.signUpNgForm.resetForm();

      this.alert = {
        type: 'error',
        message: error.message,
      };

      this.showMobileAlert(error.message);
      this.loading$.next(false);
    }
  }

  private setupEmailLowerCase() {
    const emailControl = this.signUpForm.get('email');
    emailControl?.setValue(emailControl.value.toLowerCase(), {
      emitEvent: false,
    });
  }
}
