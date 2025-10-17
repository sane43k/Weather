import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../../services/theme-service';
import { TogglersStore } from '../../../../stores/togglers-store';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  private togglersStore = inject(TogglersStore);
  // private themeService = inject(ThemeService);

  theme = this.togglersStore.theme;
  // theme = this.themeService.theme;

  toggleTheme(): void {
    const newTheme =
      this.theme() === 'light'
        ? 'dark'
        : this.theme() === 'dark'
        ? 'system'
        : 'light';
    this.togglersStore.setTheme(newTheme);
    // this.themeService.setTheme(newTheme);
  }
}
