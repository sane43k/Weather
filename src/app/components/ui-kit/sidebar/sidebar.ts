import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../pipes/translate-pipe';
import { ThemeToggle } from '../togglers/theme-toggle/theme-toggle';
import { LanguageToggle } from '../togglers/language-toggle/language-toggle';
import { Logo } from '../logo/logo';
import { NavLoginBtn } from '../nav-login-btn/nav-login-btn';
import { UnitsToggle } from '../togglers/units-toggle/units-toggle';
import { CitySelectForm } from '../forms/city-select-form/city-select-form';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    TranslatePipe,
    LanguageToggle,
    ThemeToggle,
    Logo,
    NavLoginBtn,
    UnitsToggle,
    CitySelectForm,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  isOpened = signal<boolean>(false);

  openSidebar(): void {
    this.isOpened.set(true);
  }

  closeSidebar(): void {
    this.isOpened.set(false);
  }
}
