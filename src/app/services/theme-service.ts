import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Theme } from '../stores/togglers-store';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  applyTheme(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) return;

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

  monitorSystemTheme(toggleSystemTheme: () => void): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => toggleSystemTheme());
  }
}
