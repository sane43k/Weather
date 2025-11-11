import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../../ui-kit/logo/logo';
import { TranslatePipe } from '../../../pipes/translate-pipe';
import { LanguageToggle } from '../../ui-kit/togglers/language-toggle/language-toggle';
import { ThemeToggle } from '../../ui-kit/togglers/theme-toggle/theme-toggle';
import { Sidebar } from '../../ui-kit/sidebar/sidebar';
import { NavLoginBtn } from '../../ui-kit/nav-login-btn/nav-login-btn';
import { UnitsToggle } from '../../ui-kit/togglers/units-toggle/units-toggle';
import { SearchForm } from '../../ui-kit/forms/search-form/search-form';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    Logo,
    TranslatePipe,
    LanguageToggle,
    ThemeToggle,
    Sidebar,
    NavLoginBtn,
    UnitsToggle,
    SearchForm,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
