import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private currentTheme = signal<'light' | 'dark' | 'system'>('system');

  theme = this.currentTheme.asReadonly();

  constructor() {
    this.monitorSystemTheme();
    this.setTheme(this.currentTheme());
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    if (isPlatformBrowser(this.platformId)) {
      this.currentTheme.set(theme);
      this.applyTheme(theme);
    }
  }

  private monitorSystemTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (this.currentTheme() === 'system') {
          this.applyTheme('system');
        }
      });
    }
  }

  private applyTheme(theme: 'light' | 'dark' | 'system'): void {
    const body = document.body;

    body.classList.remove('light-theme', 'dark-theme');

    if (theme === 'light') {
      body.classList.add('light-theme');
    } else if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      body.classList.add(prefersDark ? 'dark-theme' : 'light-theme');
    }
  }
}
