import { Component } from '@angular/core';
import { SignupForm } from '../../components/ui-kit/forms/signup-form/signup-form';

@Component({
  selector: 'app-signup-page',
  imports: [SignupForm],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.scss',
})
export class SignupPage {}
