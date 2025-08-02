import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../login/shared/account-service';
import { ValidationMessageComponent } from '../../shared/validation-message/validation-message.component';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  private formBuilder = inject(FormBuilder);

  changePasswordForm: FormGroup = this.createForm();

  constructor(private accountService: AccountService, private router: Router) {}

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.accountService
        .changePassword(
          this.changePasswordForm.value.currentPassword,
          this.changePasswordForm.value.newPassword
        )
        .subscribe({
          next: () => {
            this.router.navigate(['']);
          },
          error: (error) => {
            if (error.error?.customError) {
              alert(error.error?.errorMessage);
            }
          },
        });
    }
  }

  //#region Private Methods

  private passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmNewPassword = control.get('confirmNewPassword')?.value;

    return newPassword &&
      confirmNewPassword &&
      newPassword !== confirmNewPassword
      ? { passwordMismatch: true }
      : null;
  };

  private createForm(): FormGroup {
    return this.formBuilder.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmNewPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  //#endregion
}
