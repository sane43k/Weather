import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type Language = 'en' | 'ru';
export type Theme = 'light' | 'dark' | 'system';
export type Units = 'standard' | 'metric' | 'imperial';

interface TogglersState {
  language: Language;
  theme: Theme;
  units: Units;
}

const initialState: TogglersState = {
  language: 'en',
  theme: 'system',
  units: 'metric',
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
    updateUnits(units: Units): void {
      patchState(store, { units });
    },
  }))
);
