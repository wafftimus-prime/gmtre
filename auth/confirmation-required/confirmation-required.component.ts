import { CommonModule, NgIf } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
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
import {
  UiKitBaseClass
} from '@gmtre-devkit';
import { getAppUserStorageKey } from '@gmtre-utils';
import { AlertController } from '@ionic/angular/standalone';
import { autoSignIn, confirmSignUp } from 'aws-amplify/auth';
import { Cache } from 'aws-amplify/utils';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'auth-confirmation-required',
  templateUrl: './confirmation-required.component.html',
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
export class AuthConfirmationRequiredComponent
  extends UiKitBaseClass
  implements OnInit
{
  @ViewChild('signUpNgForm') signUpNgForm!: NgForm;
  private storageKey;
  cachedEmail: any;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  alert: { type: GmtreAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  confirmationForm!: UntypedFormGroup;
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
    const { email } = await Cache.getItem(this.storageKey);

    this.confirmationForm = this._formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      confirmationCode: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ]),
      ],
    });

    if (email) {
      this.confirmationForm.get('email').setValue(email);
      this.confirmationForm.get('email').disable();
    }
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
  async confirmSignup() {
    const params = this.confirmationForm.getRawValue();
    this.setupEmailLowerCase();
    try {
      const confirmResponse = await confirmSignUp({
        username: params.email,
        confirmationCode: params.confirmationCode,
      });

      console.log(confirmResponse);
      if (confirmResponse.isSignUpComplete) {
        const signInOutput = await autoSignIn();
        if (signInOutput.isSignedIn) {
          this._router.navigate(['/']);
        }
      }
    } catch (error: any) {
      switch (error.name) {
        case 'AutoSignInException':
          this._router.navigate(['/auth', 'sign-in']);
          break;

        case 'ExpiredCodeException':
          console.log(
            'Expired Code, implementation to request new code suggested'
          );
          break;
        default:
          break;
      }
    }
  }

  private setupEmailLowerCase() {
    const emailControl = this.confirmationForm.get('email');
    emailControl?.setValue(emailControl.value.toLowerCase(), {
      emitEvent: false,
    });
  }
}
