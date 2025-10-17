import { Component, signal } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate-pipe';
import { ThemeToggle } from '../togglers/theme-toggle/theme-toggle';
import { LanguageToggle } from '../togglers/language-toggle/language-toggle';
import { TemperatureToggle } from '../togglers/temperature-toggle/temperature-toggle';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-sidebar',
  imports: [
    TranslatePipe,
    LanguageToggle,
    ThemeToggle,
    TemperatureToggle,
    Logo,
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
