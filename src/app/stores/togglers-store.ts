import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { TranslationService } from './../services/translation-service';
import { ThemeService } from './../services/theme-service';

export type Language = 'en' | 'ru';
export type Theme = 'light' | 'dark' | 'system';
export type Temperature = string;

interface TogglersState {
  language: Language;
  theme: Theme;
  temperature: Temperature;
}

const initialState: TogglersState = {
  language: 'en',
  theme: 'system',
  temperature: '',
};

export const TogglersStore = signalStore(
  { providedIn: 'root' },
  withDevtools('togglersState'),
  withState(initialState),
  withMethods((store) => {
    const translationService = inject(TranslationService);
    const themeService = inject(ThemeService);

    const setLang = (lang: Language): void => {
      patchState(store, { language: lang });
      translationService.loadTranslations(lang);
    };
    const setTheme = (theme: Theme): void => {
      patchState(store, { theme });
      themeService.applyTheme(theme);
    };

    translationService.loadTranslations(store.language());

    themeService.applyTheme(store.theme());
    themeService.monitorSystemTheme(() => {
      if (store.theme() === 'system') {
        themeService.applyTheme('system');
      }
    });

    return { setLang, setTheme };
  })
);
