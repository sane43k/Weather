import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CityWeather, UserCity } from '../interfaces/city-interface';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { effect, inject, untracked } from '@angular/core';
import { WeatherService } from '../services/weather-service';
import { TogglersStore } from './togglers-store';
import { forkJoin } from 'rxjs';

interface UserState {
  id: number | null;
  email: string;
  role: 'user' | 'admin';
  city: UserCity;
  favoriteCities: CityWeather[];
}

const initialState: UserState = {
  id: null,
  email: '',
  role: 'user',
  city: { value: 2643743, label: 'London', lat: 51.5081, lon: -0.1278 },
  favoriteCities: [],
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withDevtools('userState'),
  withState(initialState),
  withMethods((store) => {
    const weatherService = inject(WeatherService);
    const togglersStore = inject(TogglersStore);

    const setUser = (currentUser: UserState): void => {
      patchState(store, {
        id: currentUser.id,
        email: currentUser.email,
        role: currentUser.role,
        city: currentUser.city,
        favoriteCities: currentUser.favoriteCities,
      });
    };
    const resetUser = (): void => {
      patchState(store, { ...initialState });
    };

    const updateCity = (city: UserCity): void => {
      patchState(store, { city });
    };

    const addFavoriteCity = (city: CityWeather): void => {
      patchState(store, {
        favoriteCities: [city, ...store.favoriteCities()],
      });
    };
    const removeFavoriteCity = (city: CityWeather): void => {
      patchState(store, {
        favoriteCities: store
          .favoriteCities()
          .filter((favCity) => favCity.id !== city.id),
      });
    };

    const loadCityWeatherByCoords = (): void => {
      const favoriteCities = store.favoriteCities();

      if (favoriteCities.length === 0) {
        patchState(store, { favoriteCities: [] });
        return;
      }

      const citiesWeatherRequests = favoriteCities.map((favCity) =>
        weatherService.getCityWeatherByCoords(
          favCity.coord.lat,
          favCity.coord.lon
        )
      );

      forkJoin(citiesWeatherRequests).subscribe((favoriteCities) =>
        patchState(store, { favoriteCities })
      );
    };

    effect(() => {
      const units = togglersStore.units();
      const language = togglersStore.language();

      untracked(() => loadCityWeatherByCoords());
    });

    return {
      setUser,
      resetUser,
      updateCity,
      addFavoriteCity,
      removeFavoriteCity,
    };
  })
);
