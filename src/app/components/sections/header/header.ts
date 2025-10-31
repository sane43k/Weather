import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../../ui-kit/logo/logo';
import { TranslatePipe } from '../../../pipes/translate-pipe';
import { LanguageToggle } from '../../ui-kit/togglers/language-toggle/language-toggle';
import { ThemeToggle } from '../../ui-kit/togglers/theme-toggle/theme-toggle';
import { TemperatureToggle } from '../../ui-kit/togglers/temperature-toggle/temperature-toggle';
import { CustomInput } from '../../ui-kit/form-controls/custom-input/custom-input';
import { Sidebar } from '../../ui-kit/sidebar/sidebar';
import { NavLoginBtn } from '../../ui-kit/nav-login-btn/nav-login-btn';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    Logo,
    TranslatePipe,
    LanguageToggle,
    ThemeToggle,
    TemperatureToggle,
    CustomInput,
    Sidebar,
    NavLoginBtn,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
