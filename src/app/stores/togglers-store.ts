import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

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
  withMethods((store) => ({
    updateLanguage(language: Language): void {
      patchState(store, { language });
    },
    updateTheme(theme: Theme): void {
      patchState(store, { theme });
    },
  }))
);
