import { Component, effect, inject, OnInit } from '@angular/core';
import { TogglersStore } from '../../../../stores/togglers-store';
import { ThemeService } from '../../../../services/theme-service';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle implements OnInit {
  private togglersStore = inject(TogglersStore);
  private themeService = inject(ThemeService);

  theme = this.togglersStore.theme;

  constructor() {
    effect(() => {
      this.themeService.applyTheme(this.theme());
    });
  }

  ngOnInit(): void {
    this.themeService.monitorSystemTheme(() => {
      if (this.theme() === 'system') {
        this.themeService.applyTheme('system');
      }
    });
  }

  toggleTheme(): void {
    const newTheme =
      this.theme() === 'light'
        ? 'dark'
        : this.theme() === 'dark'
        ? 'system'
        : 'light';
    this.togglersStore.updateTheme(newTheme);
  }
}
