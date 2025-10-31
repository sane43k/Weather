import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '../../../../pipes/translate-pipe';
import { Logo } from '../../logo/logo';
import { Subject, takeUntil } from 'rxjs';
import { CustomInput } from '../../form-controls/custom-input/custom-input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth-service';
import { MOCK_NETWORK_LOGIN_DATA } from '../../../../constants/mock-data';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, TranslatePipe, Logo, CustomInput, RouterLink],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
})
export class SignupForm {
  signupForm: FormGroup;
  isStepInvalid = signal<boolean>(true);

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  constructor() {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.{9,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=\{};:,<.>])[A-Za-z0-9!@#$%^&*()_\-+=\{};:,<.>]+$/
            ),
          ],
        ],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );

    this.signupForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.checkValidation();
      });
  }

  checkValidation(): void {
    this.isStepInvalid.set(this.signupForm.invalid || false);
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;

    if (!password || !repeatPassword) return null;

    return password === repeatPassword ? null : { passwordMismatch: true };
  }

  getSocialNetworksInfo(): void {
    this.signupForm.patchValue({
      email: MOCK_NETWORK_LOGIN_DATA.email,
      password: MOCK_NETWORK_LOGIN_DATA.password,
      repeatPassword: MOCK_NETWORK_LOGIN_DATA.password,
    });
  }

  onSubmit(): void {
    const { email, password } = this.signupForm.value;

    const success = this.authService.signUp(email, password);
    if (!success) {
      alert('User with the same email already exists.');
      return;
    }

    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
