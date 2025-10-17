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

    const setLang = (lang: Language) => {
      translationService.setLanguage(lang);
      patchState(store, { language: lang });
    };
    const setTheme = (theme: Theme) => {
      themeService.setTheme(theme);
      patchState(store, { theme });
    };

    return { setLang, setTheme };
  })
);
