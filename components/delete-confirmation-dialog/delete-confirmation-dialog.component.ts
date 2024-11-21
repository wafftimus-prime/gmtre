import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserModel } from '@gmtre-core';
import { PlatformStore, UserStore } from '@gmtre-devkit';

@Component({
  selector: 'delete-confirmation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TextFieldModule,
  ],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss',
})
export class DeleteConfirmationDialogComponent implements OnInit {
  base_form!: UntypedFormGroup;

  readonly platform = inject(PlatformStore);
  readonly user_store = inject(UserStore);
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: UntypedFormBuilder,
  ) {
  }

  get user() {
    return this.user_store.getUserProfile()
  }

  get is_small(): boolean {
    return ['xsmall', 'small'].includes(this.platform.getClientScreenSize()['screenSize']);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.base_form = this._formBuilder.group({
      name: [null, [Validators.required, this.sameName()]],
    });
  }

  errorMessage(form: FormGroup, control: string): string | null {
    const form_control: FormControl = form.get(control) as FormControl;
    if (form_control.hasError('required')) return 'This field is required';
    else switch (control) {
      case 'Name': {
        if (form_control.hasError('sameName')) return this.user?.name ? "The name we have saved does not match what you entered" : ""
        else return null
      }
      default: return null
    }
  }

  sameName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return (this.user?.name || "DELETE") !== control.value
        ? { sameName: { value: control.value } }
        : null;
    };
  }

}
