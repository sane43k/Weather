import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '../../../../pipes/translate-pipe';
import { Logo } from '../../logo/logo';
import { Subject, takeUntil } from 'rxjs';
import { CustomInput } from '../../form-controls/custom-input/custom-input';
import { Router, RouterLink } from '@angular/router';
import { MOCK_NETWORK_LOGIN_DATA } from '../../../../constants/mock-data';
import { AuthService } from '../../../../services/auth-service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, TranslatePipe, Logo, CustomInput, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  loginForm: FormGroup;
  isStepInvalid = signal<boolean>(true);

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  constructor() {
    this.loginForm = this.fb.group({
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
    });

    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.checkValidation();
      });
  }

  checkValidation(): void {
    this.isStepInvalid.set(this.loginForm.invalid || false);
  }

  getSocialNetworksInfo(): void {
    this.loginForm.patchValue({
      email: MOCK_NETWORK_LOGIN_DATA.email,
      password: MOCK_NETWORK_LOGIN_DATA.password,
    });
  }

  onSubmit(): void {
    const { email, password } = this.loginForm.value;

    const success = this.authService.logIn(email, password);
    if (!success) {
      alert('Invalid email or password');
      return;
    }

    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
